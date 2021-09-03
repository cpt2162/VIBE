from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from social.models import Post, User, Like
from social.serializers import UserSerializer, PostSerializer, LikeSerializer
from rest_framework import permissions, generics, status, viewsets
from social.permissions import IsOwnerOrReadOnly


class UserViewSet(viewsets.ModelViewSet):
    """
    Lists all users or create a new user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
    #
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)
    #
    # def post(self, request, *args, **kwargs):
    #     return self.create(request, *args, **kwargs)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrive, update or delete a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
#
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)


# class PostList(generics.ListCreateAPIView):
#     """
#     List all photo posts or create a new one
#     """
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
#
#     def post(self, request):
#         serializer = PostSerializer(data=request.data)
#         # data.encode("base64")
#         if serializer.is_valid():
#             serializer.save()
#             res_msg = {'Success_Message': 'Created', 'Success_Code': 201}
#             return Response(res_msg)
#
#         return Response({'Success_Message': 'Created', 'Success_Code': 201})

# class PostList(APIView):
#     parser_classes = (MultiPartParser, FormParser)
#
#     def get(self, request, *args, **kwargs):
#         posts = Post.objects.all()
#         serializer = PostSerializer(posts, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, *args, **kwargs):
#         posts_serializer = PostSerializer(data=request.data)
#         if posts_serializer.is_valid():
#             posts_serializer.save()
#             return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', posts_serializer.errors)
#             return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # def get_queryset(self):
    #     return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a photo instance
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.AllowAny]
