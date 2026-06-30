from django.urls import path

from .views import (
    home,
    register_user,
    login_user,
    upload_document,
    chat_with_pdf,
    get_chat_history,
    get_uploaded_documents  # NEW IMPORT
)

urlpatterns = [
    path('', home),
    path('register/', register_user),
    path('login/', login_user),
    path('upload/', upload_document),
    path('documents/', get_uploaded_documents),  
    path('chat/', chat_with_pdf),
    path('chat-history/', get_chat_history),
]