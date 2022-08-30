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

def url_auth_middleware(get_response):

    def middleware(request):
        response = get_response(request)
        # if not request.user.is_anonymous:
        #     print(request.user)
        #     if not request.user.is_superuser:
        #         get_url = request.path
        #         pattern = '/home/'
        #         if pattern not in get_url:
        #             return redirect('userIndex')

        return response
    
    return middleware