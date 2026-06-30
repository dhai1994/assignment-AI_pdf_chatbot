from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings

embedding_model = OllamaEmbeddings(
    model="deepseek-coder:6.7b"
)


def store_in_chroma(chunks, user_id, document_id):
    """
    Store PDF chunks with document_id metadata for multi-PDF filtering
    """
    # IMPORTANT: Add metadata to EVERY chunk
    for i, chunk in enumerate(chunks):
        if not hasattr(chunk, 'metadata'):
            chunk.metadata = {}
        
        # Add required metadata
        chunk.metadata.update({
            "user_id": str(user_id),
            "document_id": str(document_id),
            "chunk_index": i
        })
    
    # Store in ChromaDB with collection per user
    vector_db = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=f"chroma_db/user_{user_id}",
        collection_name=f"user_{user_id}_docs"
    )
    
    print(f"✅ Stored {len(chunks)} chunks for document {document_id}")
    return vector_db


def get_chroma_vectorstore(user_id):
    """
    Get existing Chroma vectorstore for a user
    """
    vector_db = Chroma(
        embedding_function=embedding_model,
        persist_directory=f"chroma_db/user_{user_id}",
        collection_name=f"user_{user_id}_docs"
    )
    
    return vector_db