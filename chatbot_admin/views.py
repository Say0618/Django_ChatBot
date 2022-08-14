from django.shortcuts import render, redirect

# Create your views here.
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.conf import settings
from django.http import JsonResponse
import datetime
from django.core import serializers

# import zipfile
from zipfile import ZipFile

# import StringIO
from io import BytesIO
try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO
import os
from django.conf import settings

from django.contrib.auth.models import User
from .models import MasterSheet
from .models import ReadSheet
from .models import InterpretationSheet
from .models import Images_Bot
from .models import Database_Excel

from .forms import MasterSheetForm
from .forms import ReadSheetForm
from .forms import InterpretationSheetForm
from .forms import Images_BotForm
from .forms import Database_ExcelForm



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
    print('user active and superuser is ......', user)
    print('user active and superuser is ......')
    if user is not None and user.is_active:
        login(request, user)
        if user.is_superuser == 1:
            return redirect(settings.LOGIN_REDIRECT_URL)
        else:
            return render(request, 'nomarl_user/nomal_user.html')
            
    else:
        return render(request, 'registration/login.html', {'msg': 'failed'})    

def logout_attempt(request):
    logout(request)
    return redirect(settings.LOGOUT_REDIRECT_URL)

@login_required
def settings(request):
    return render(request, 'settings.html')

@login_required
def users(request):
    user_list = User.objects.exclude(is_superuser=1)
    # user_list = User.objects.all()
    # print('userlist is.....', user_list)
    return render(request, 'users.html', {
        'user_list': user_list
    })
@login_required

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

@csrf_protect
def addUser(request):
    if is_ajax(request) and request.method == "POST":
        username = request.POST['username']
        pwd = request.POST['pwd']
        
        search_user = User.objects.filter(username=username).count()
        if search_user > 0 :
            return JsonResponse({
                'msg': 'user already exists'
            })

        newUser = User.objects.create(username=username)
        newUser.set_password(pwd)
        newUser.save()

        count = User.objects.all().count() - 1

        user_list = serializers.serialize('json', [newUser])
        return JsonResponse({
            'msg': 'success',
            'user_list': user_list,
            'count': count
        })

@csrf_protect
def operateUser(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        type = request.POST['type']

        if type == 'delete':

            User.objects.filter(pk=id).delete()

            return JsonResponse({
                'msg': 'deleted'
            })
        
        if type == 'de-activate':
            user = User.objects.filter(pk=id).get()
            user.is_active = 0
            user.save()

            return JsonResponse({
                'msg': 'de-activated'
            })

        if type == 'activate':
            user = User.objects.filter(pk=id).get()
            user.is_active = 1
            user.save()

            return JsonResponse({
                'msg': 'activated'
            })

@csrf_protect
def editUser(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        username = request.POST['username']
        pwd = request.POST['pwd']

        user = User.objects.filter(pk=id).get()
        user.username = username
        user.set_password(pwd)
        user.save()

        return JsonResponse({
                'msg': 'edited'
            })


@login_required
def master_sheet(request):
    sheets = MasterSheet.objects.all()
    # master_sheets = serializers.serialize('json', query_set)
    return render(request, 'input/master_sheet.html', {
        'sheets': sheets
    })
    

def uploadMasterSheet(request):
    if request.method == "POST":
        form = MasterSheetForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            form.save()
            sheet = MasterSheet.objects.last()
            sheet.name = file
            sheet.save()
            return redirect('master_sheet')
        else:
            return redirect('master_sheet')

def operateMasterSheet(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        type = request.POST['type']

        if type == 'delete':
            mm = MasterSheet.objects.filter(pk=id).get()
            mm.file.close()
            mm.file.delete()
            MasterSheet.objects.filter(pk=id).delete()

            return JsonResponse({
                'msg': 'deleted'
            })
        
        if type == 'de-activate':
            sheet = MasterSheet.objects.filter(pk=id).get()
            sheet.status = 0
            sheet.save()

            return JsonResponse({
                'msg': 'de-activated'
            })

        if type == 'activate':
            sheet = MasterSheet.objects.filter(pk=id).get()
            sheet.status = 1
            sheet.save()

            return JsonResponse({
                'msg': 'activated'
            })

def masterSheetDownload(request):
    if request.method == "POST":
        ids = request.POST['ids']
        ids = ids.split(',')

        print(ids)
        if len(ids) > 0:

            files = MasterSheet.objects.filter(id__in=ids)

            paths = []
            for file in files:
                prefix = os.getcwd() + '\\media\\master_sheets\\'
                path = prefix + file.filename()
                paths.append(path)
            
            print('path is ...', paths)
            
            zip_filename = "master.zip"

            in_memory = BytesIO()
            zip = ZipFile(in_memory, "a")

            for path in paths:
                fname = os.path.split(path)[1]
                zip.write(path, fname)

            zip.close()
            
            resp = HttpResponse(content_type = "application/x-zip-compressed")
            resp['Content-Disposition'] = 'attachment; filename=%s' % zip_filename

            in_memory.seek(0)    
            resp.write(in_memory.read())

            return resp

@login_required
def read_sheet(request):
    sheets = ReadSheet.objects.all()
    return render(request, 'input/read_sheet.html', {
        'sheets': sheets
    })

def uploadReadSheet(request):
    if request.method == "POST":
        form = ReadSheetForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            form.save()
            sheet = MasterSheet.objects.last()
            sheet.name = file
            sheet.save()
            return redirect('read_sheet')
        else:
            return redirect('read_sheet')

@login_required
def interpretation_sheet(request):
    sheets = InterpretationSheet.objects.all()
    return render(request, 'input/interpretation_sheet.html', {
        'sheets': sheets
    })

@login_required
def images(request):
    sheets = Images_Bot.objects.all()
    return render(request, 'attachments/images.html', {
        'sheets': sheets
    })

@login_required
def database(request):
    sheets = Database_Excel.objects.all()
    return render(request, 'attachments/database.html', {
        'sheets': sheets
    })

@login_required
def videos(request):
    return render(request, 'attachments/videos.html')

@login_required
def write_sheet(request):
    return render(request, 'output/write_sheet.html')

@login_required
def aa_output(request):
    return render(request, 'output/aa_output.html')
