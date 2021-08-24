from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models

# Register your models here.


@admin.register(models.Post)
class Photoadmin(admin.ModelAdmin):
    """Admin for photos."""


# @admin.register(models.User)
# class CustomUserAdmin(UserAdmin):
#     """Custom user admin."""


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    """Admin for Likes."""


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    """Admin for Comments."""
