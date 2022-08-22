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

from chatbot_admin.models import *

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request, 'main.html')
    else:

        welcome = ''
        logo = 'settings/'
        background = 'settings/'

        if Settings.objects.filter(type='welcome').count() > 0:
            welcome = Settings.objects.filter(type='welcome').get().content
        
        if Settings_Image.objects.filter(type='logo').count() > 0:
            logo = logo + Settings_Image.objects.filter(type='logo').get().filename()
        
        if Settings_Image.objects.filter(type='login').count() > 0:
            background = background + Settings_Image.objects.filter(type='login').get().filename()

        return render(request, 'userLogin.html',{
            'welcome': welcome,
            'logo': logo,
            'background': background
        })

def login_attempt(request):
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(request, username=username, password=password)

    if user is not None and user.is_active:
        login(request, user)
        return redirect('userIndex')
    else:
        welcome = ''
        logo = 'settings/'
        background = 'settings/'

        if Settings.objects.filter(type='welcome').count() > 0:
            welcome = Settings.objects.filter(type='welcome').get().content
        
        if Settings_Image.objects.filter(type='logo').count() > 0:
            logo = logo + Settings_Image.objects.filter(type='logo').get().filename()
        
        if Settings_Image.objects.filter(type='login').count() > 0:
            background = background + Settings_Image.objects.filter(type='login').get().filename()

        return render(request, 'userLogin.html',{
            'welcome': welcome,
            'logo': logo,
            'background': background
        })

def logout_attempt(request):
    logout(request)
    return redirect('userIndex')
    
@login_required
def terms_conditions(request):
    terms = ''

    if Settings.objects.filter(type='terms').count() > 0:
        terms = Settings.objects.filter(type='terms').get().content

    return render(request, 'terms_and_conditions.html', {
        'terms': terms
    })