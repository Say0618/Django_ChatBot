from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


from . import views

urlpatterns = [
    path('', views.index, name='userIndex'),
    path('login', views.login_attempt, name='user_login_attempt'),
    path('logout', views.logout_attempt, name='user_logout_attempt'),
]