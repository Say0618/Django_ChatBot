from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_attempt, name='login_attempt'),
    path('logout', views.logout_attempt, name='logout_attempt'),
]