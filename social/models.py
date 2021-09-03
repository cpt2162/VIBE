import datetime

from django.db import models
from django.utils import timezone
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.forms import ImageField
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit
from django.conf import settings
from vibe import settings

#
# class User(User):
#     """custom user model."""
#     name = models.CharField(max_length=32)
#     bio = models.TextField(default="Lame until you add something.")
#
#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
#
#     def __str__(self):
#         return self.username
#


class Post(models.Model):
    """A photo posted by the user"""
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts", null=True)
    title = models.CharField(max_length=40, default="*Untitled*")
    artist = models.CharField(max_length=20, default="*Unknown*")
    caption = models.TextField()
    photo = models.ImageField(upload_to="posts/")
    queues = models.PositiveIntegerField(default=0, editable=False)
    liked_users = models.ManyToManyField(User, editable=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} on {self.date_created}"

    def save(self, *args, **kwargs):
        self.date_created = timezone.now()
        super().save(*args, **kwargs)

    class Meta:
        """Metadata"""

        ordering = ["-date_created"]


class Like(models.Model):
    """A 'like' on a post"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    song = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")

    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} like {self.song.owner}'s post"

    class Meta:
        """Metadata"""

        unique_together = (("user", "song"),)
        ordering = ["-date_created"]


class Comment(models.Model):
    """A 'comment' on a post"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    photo = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")

    content = models.TextField(max_length=2000)

    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        """Metadata"""

        ordering = ["-date_created"]


