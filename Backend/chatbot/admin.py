from django.contrib import admin

from .models import (
    UploadedDocument,
    Conversation,
    Message
)

admin.site.register(UploadedDocument)
admin.site.register(Conversation)
admin.site.register(Message)