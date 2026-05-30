from django.db import models
from django.contrib.auth.models import User


class UploadedDocument(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(
        max_length=255
    )

    file = models.FileField(
        upload_to='pdfs/'
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


class Conversation(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    document = models.ForeignKey(
        UploadedDocument,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Conversation {self.id}"


class Message(models.Model):

    SENDER_CHOICES = (
        ('user', 'User'),
        ('bot', 'Bot'),
    )

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )

    sender = models.CharField(
        max_length=10,
        choices=SENDER_CHOICES
    )

    content = models.TextField()

    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.sender}: {self.content[:30]}"


class ChatHistory(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    question = models.TextField()

    answer = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )