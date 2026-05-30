from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import UploadedDocument
from .serializers import UploadedDocumentSerializer
from .services.pdf_processor import process_pdf
from .services.embeddings import store_in_chroma
from .services.rag_pipeline import ask_question


# -----------------------------------
# HOME API
# -----------------------------------
def home(request):
    return JsonResponse({
        "message": "AI PDF Chatbot Backend Running Successfully"
    })


# -----------------------------------
# REGISTER API
# -----------------------------------
@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "User registered successfully"
        })

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# -----------------------------------
# LOGIN API
# -----------------------------------
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

    return Response({
        "error": "Invalid credentials"
    }, status=401)


# -----------------------------------
# UPLOAD PDF API - WITH DOCUMENT_ID
# -----------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_document(request):
    serializer = UploadedDocumentSerializer(
        data=request.data
    )

    if serializer.is_valid():
        # Save PDF to database
        document = serializer.save(
            user=request.user
        )

        # Get PDF file path
        pdf_path = document.file.path

        # Process PDF into chunks
        chunks = process_pdf(pdf_path)

        # Store embeddings in ChromaDB with document_id
        store_in_chroma(
            chunks,
            request.user.id,
            document.id  # CRITICAL: Pass document ID
        )

        return Response({
            "message": "PDF uploaded and processed successfully",
            "filename": document.file.name,
            "total_chunks": len(chunks),
            "document_id": document.id
        })

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# -----------------------------------
# GET UPLOADED DOCUMENTS API
# -----------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_uploaded_documents(request):
    documents = UploadedDocument.objects.filter(
        user=request.user
    ).order_by('-uploaded_at')
    
    data = []
    for doc in documents:
        data.append({
            "id": doc.id,
            "filename": doc.file.name.split('/')[-1],
            "uploaded_at": doc.uploaded_at,
        })
    
    return Response(data)


# -----------------------------------
# CHAT API - WITH MULTI-PDF SUPPORT
# -----------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_with_pdf(request):
    question = request.data.get('question')
    pdf_ids = request.data.get('pdf_ids', [])  # Get selected PDF IDs

    if not question:
        return Response({
            "error": "Question is required"
        }, status=400)

    # Pass selected PDF IDs to RAG pipeline
    answer = ask_question(
        question,
        request.user.id,
        pdf_ids=pdf_ids  # Pass PDF IDs for filtering
    )

    from .models import ChatHistory

    ChatHistory.objects.create(
        user=request.user,
        question=question,
        answer=answer
    )

    return Response({
        "question": question,
        "answer": answer
    })


# -----------------------------------
# GET CHAT HISTORY API
# -----------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_history(request):
    from .models import ChatHistory

    chats = ChatHistory.objects.filter(
        user=request.user
    ).order_by('-created_at')

    data = []

    for chat in chats:
        data.append({
            "id": chat.id,
            "question": chat.question,
            "answer": chat.answer,
            "created_at": chat.created_at
        })

    return Response(data)