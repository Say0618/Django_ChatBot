from django.shortcuts import render

# Create your views here.
# from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.conf import settings

@login_required
def index(request):
    print('fdefdfdfdfdf', request.user.is_authenticated)
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return render(request, 'registration/login.html')

# @csrf_protect
# def login(request):
#     username = request.GET['username']
#     password = request.GET['password']

#     user = authenticate(request, username=username, password=password)
#     print("----------------------------user is -------------------------------",password)
#     if user is not None:
#         login(request, user)
#         return redirect(settings.LOGIN_REDIRECT_URL)
#     else:
#         return render(request, 'registration/login.html')    