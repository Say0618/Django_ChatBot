from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


from . import views

urlpatterns = [
    path('', views.index, name='userIndex'),
    path('login', views.login_attempt, name='user_login_attempt'),
    path('logout', views.logout_attempt, name='user_logout_attempt'),
    path('terms_conditions', views.terms_conditions, name='terms_conditions'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)