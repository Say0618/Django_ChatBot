from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login_attempt', views.login_attempt, name='login_attempt'),
]