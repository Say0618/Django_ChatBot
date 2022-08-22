from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import datetime
from django.core import serializers
import json

from django.contrib.auth.models import User
import os
import mimetypes
from django.conf import settings as conf_settings
import openpyxl
from os.path import exists

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request, 'main.html')
    else:
        return render(request, 'userLogin.html')

def login_attempt(request):
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(request, username=username, password=password)

    if user is not None and user.is_active:
        login(request, user)
        return render(request, 'main.html')
    else:
        return render(request, 'userLogin.html')

def logout_attempt(request):
    logout(request)
    return render(request, 'userLogin.html')