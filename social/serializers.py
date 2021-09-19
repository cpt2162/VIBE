from django.utils import timezone

from rest_framework import serializers

from accounts.serializers import UserSerializer
from social.models import User, Post, Like



class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

#
# class UserSerializer(serializers.ModelSerializer):
#     posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
#     likes = serializers.PrimaryKeyRelatedField(many=True, queryset=Like.objects.all())
#
#     class Meta:
#         model = User
#         fields = ('username', 'bio', 'posts', 'likes')
#

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('user', 'song', 'date_created')


class PostSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField(source='owner.username')
    # owner = serializers.SerializerMethodField('_user')
    # photo = Base64ImageField(
    #     max_length=None, use_url=True,
    # )
    #
    # def _user(self, obj):
    #     request = self.context.get('request', None)
    #     if request:
    #         return request.user
    # queues = serializers.PrimaryKeyRelatedField(many=True, queryset=Like.objects.all())
    date_created = serializers.DateTimeField(format="%d-%m-%Y", default=timezone.now())
    liked_users = UserSerializer(read_only=True, many=True)
    # owner = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('owner', 'id', 'caption', 'title', 'artist', 'photo', 'queues', 'liked_users', 'date_created', 'date_updated')


