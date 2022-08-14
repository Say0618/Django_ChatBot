from django.shortcuts import render, redirect

# Create your views here.
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import datetime
from django.core import serializers

# import zipfile
from zipfile import ZipFile
import json

# import StringIO
from io import BytesIO
# try:
#     from StringIO import StringIO
# except ImportError:
#     from io import StringIO
import os
import mimetypes
from django.conf import settings as conf_settings
import openpyxl
from os.path import exists

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
            sheet = ReadSheet.objects.last()
            sheet.name = file
            sheet.save()
            return redirect('read_sheet')
        else:
            return redirect('read_sheet')

def operateReadSheet(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        type = request.POST['type']

        if type == 'delete':
            mm = ReadSheet.objects.filter(pk=id).get()
            mm.file.close()
            mm.file.delete()
            ReadSheet.objects.filter(pk=id).delete()

            return JsonResponse({
                'msg': 'deleted'
            })
        
        if type == 'de-activate':
            sheet = ReadSheet.objects.filter(pk=id).get()
            sheet.status = 0
            sheet.save()

            return JsonResponse({
                'msg': 'de-activated'
            })

        if type == 'activate':
            sheet = ReadSheet.objects.filter(pk=id).get()
            sheet.status = 1
            sheet.save()

            return JsonResponse({
                'msg': 'activated'
            })

def readSheetDownload(request):
    if request.method == "POST":
        ids = request.POST['ids']
        ids = ids.split(',')

        print(ids)
        if len(ids) > 0:

            files = ReadSheet.objects.filter(id__in=ids)

            paths = []
            for file in files:
                prefix = os.getcwd() + '\\media\\read_sheets\\'
                path = prefix + file.filename()
                paths.append(path)
            
            print('path is ...', paths)
            
            zip_filename = "read.zip"

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
def interpretation_sheet(request):
    sheets = InterpretationSheet.objects.all()
    return render(request, 'input/interpretation_sheet.html', {
        'sheets': sheets
    })

def uploadInterpretationSheet(request):
    if request.method == "POST":
        form = InterpretationSheetForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            form.save()
            sheet = InterpretationSheet.objects.last()
            sheet.name = file
            sheet.save()
            return redirect('interpretation_sheet')
        else:
            return redirect('interpretation_sheet')

def operateInterpretationSheet(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        type = request.POST['type']

        if type == 'delete':
            mm = InterpretationSheet.objects.filter(pk=id).get()
            mm.file.close()
            mm.file.delete()
            InterpretationSheet.objects.filter(pk=id).delete()

            return JsonResponse({
                'msg': 'deleted'
            })
        
        if type == 'de-activate':
            sheet = InterpretationSheet.objects.filter(pk=id).get()
            sheet.status = 0
            sheet.save()

            return JsonResponse({
                'msg': 'de-activated'
            })

        if type == 'activate':
            sheet = InterpretationSheet.objects.filter(pk=id).get()
            sheet.status = 1
            sheet.save()

            return JsonResponse({
                'msg': 'activated'
            })

def interpretationSheetDownload(request):
    if request.method == "POST":
        ids = request.POST['ids']
        ids = ids.split(',')

        print(ids)
        if len(ids) > 0:

            files = InterpretationSheet.objects.filter(id__in=ids)

            paths = []
            for file in files:
                prefix = os.getcwd() + '\\media\\interpretation_sheets\\'
                path = prefix + file.filename()
                paths.append(path)
            
            print('path is ...', paths)
            
            zip_filename = "interpretation.zip"

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
def images(request):
    sheets = Images_Bot.objects.all()
    return render(request, 'attachments/images.html', {
        'sheets': sheets
    })

def uploadImages(request):
    if request.method == "POST":
        form = Images_BotForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            form.save()
            sheet = Images_Bot.objects.last()
            sheet.name = file
            sheet.save()
            return redirect('images')
        else:
            return redirect('images')

def operateImages(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        type = request.POST['type']

        if type == 'delete':
            mm = Images_Bot.objects.filter(pk=id).get()
            mm.file.close()
            mm.file.delete()
            Images_Bot.objects.filter(pk=id).delete()

            return JsonResponse({
                'msg': 'deleted'
            })
        
        if type == 'de-activate':
            sheet = Images_Bot.objects.filter(pk=id).get()
            sheet.status = 0
            sheet.save()

            return JsonResponse({
                'msg': 'de-activated'
            })

        if type == 'activate':
            sheet = Images_Bot.objects.filter(pk=id).get()
            sheet.status = 1
            sheet.save()

            return JsonResponse({
                'msg': 'activated'
            })

def imagesDownload(request):
    if request.method == "POST":
        ids = request.POST['ids']
        ids = ids.split(',')

        print(ids)
        if len(ids) > 0:

            files = Images_Bot.objects.filter(id__in=ids)

            paths = []
            for file in files:
                prefix = os.getcwd() + '\\media\\attachments\\images\\'
                path = prefix + file.filename()
                paths.append(path)
            
            print('path is ...', paths)
            
            zip_filename = "images.zip"

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
def database(request):
    sheets = Database_Excel.objects.all()
    return render(request, 'attachments/database.html', {
        'sheets': sheets
    })

def uploadDatabase(request):
    if request.method == "POST":
        form = Database_ExcelForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            form.save()
            sheet = Database_Excel.objects.last()
            sheet.name = file
            sheet.save()
            return redirect('database')
        else:
            return redirect('database')

def operateDatabase(request):
    if is_ajax(request) and request.method == "POST":
        id = request.POST['id']
        type = request.POST['type']

        if type == 'delete':
            mm = Database_Excel.objects.filter(pk=id).get()
            mm.file.close()
            mm.file.delete()
            Database_Excel.objects.filter(pk=id).delete()

            return JsonResponse({
                'msg': 'deleted'
            })
        
        if type == 'de-activate':
            sheet = Database_Excel.objects.filter(pk=id).get()
            sheet.status = 0
            sheet.save()

            return JsonResponse({
                'msg': 'de-activated'
            })

        if type == 'activate':
            sheet = Database_Excel.objects.filter(pk=id).get()
            sheet.status = 1
            sheet.save()

            return JsonResponse({
                'msg': 'activated'
            })

def databaseDownload(request):
    if request.method == "POST":
        ids = request.POST['ids']
        ids = ids.split(',')

        print(ids)
        if len(ids) > 0:

            files = Database_Excel.objects.filter(id__in=ids)

            paths = []
            for file in files:
                prefix = os.getcwd() + '\\media\\attachments\\database\\'
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
def write_sheet(request):
    read_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/Media/write_sheets/Write.xlsx"
    print('read_path is .........',read_path)
    if os.path.exists(read_path):
        wb = openpyxl.load_workbook(read_path)
        ws = wb.active

        rows_cnt = ws.max_row
        cols_cnt = ws.max_column
        
        total_result = []
        for r in range(1, rows_cnt + 1):
            record = []
            for i in range(1, cols_cnt + 1):
                record.append(ws.cell(row=r, column=i).value)
            total_result.append(record)

        thead = total_result[0]
        total_result.pop(0)

        # print('total_result is ................',total_result)

        return render(request, 'output/write_sheet.html', {
            'thead': thead,
            'dataset': total_result
        })
    else:
        return render(request, 'output/write_sheet.html')

def exportWriteSheet(request):
    if request.method == 'POST':
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        file_path = BASE_DIR + '\\Media\\write_sheets\\write.xlsx'
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        else:
            return render(request, 'output/write_sheet.html')

@login_required
def aa_output_sheet(request):
    read_path = read_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "\\Media\\aa_outputs\\aaOutputSheet.xlsx"
    
    if os.path.exists(read_path):
        wb = openpyxl.load_workbook(read_path)
        ws = wb.active

        rows_cnt = ws.max_row
        cols_cnt = ws.max_column

        total_result = []
        for r in range(1, rows_cnt + 1):
            record = []
            for i in range(1, cols_cnt + 1):
                record.append(ws.cell(row=r, column=i).value)
            total_result.append(record)

        thead = total_result[0]
        total_result.pop(0)

        return render(request, 'output/aa_output.html', {
            'thead': thead,
            'dataset': total_result
        })
    else:
        return render(request, 'output/aa_output.html')
        


def exportAAOutputSheet(request):
    if request.method == 'POST':
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        file_path = BASE_DIR + '\\Media\\aa_outputs\\aaOutputSheet.xlsx'
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        else:
            return render(request, 'output/aa_output.html')

    return 0

@login_required
def videos(request):
    return render(request, 'attachments/videos.html')


@login_required
def chatbot(request):
    return render(request, 'chatbot.html')