from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from social.views import PostViewSet, UserViewSet, LikeViewSet
from rest_framework import routers

# urlpatterns = [
#     path('posts/', views.PostList),
#     path('posts/<int:pk>/', views.PostDetail.as_view()),
#     path('users/', views.UserList.as_view()),
#     path('users/<int:pk>/', views.UserDetail.as_view()),
# ]
#
# urlpatterns = format_suffix_patterns(urlpatterns)

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')
 # router.register('users', UserViewSet, 'users')
router.register('likes', LikeViewSet, 'likes')

urlpatterns = router.urls