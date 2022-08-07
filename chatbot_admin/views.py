from django.shortcuts import render, redirect

# Create your views here.
# from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.conf import settings

@login_required
def index(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return render(request, 'registration/login.html')

@csrf_protect
def login_attempt(request):
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(request, username=username, password=password)
    print("----------------------------user is -------------------------------",user)
    if user is not None:
        login(request, user)
        return redirect(settings.LOGIN_REDIRECT_URL)
    else:
        return render(request, 'registration/login.html')    

def logout_attempt(request):
    logout(request)
    return redirect(settings.LOGOUT_REDIRECT_URL)