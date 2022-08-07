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
    if user is not None:
        login(request, user)
        return redirect(settings.LOGIN_REDIRECT_URL)
    else:
        return render(request, 'registration/login.html')    

def logout_attempt(request):
    logout(request)
    return redirect(settings.LOGOUT_REDIRECT_URL)

@login_required
def settings(request):
    return render(request, 'settings.html')

@login_required
def users(request):
    return render(request, 'users.html')

@login_required
def read_sheet(request):
    return render(request, 'input/read_sheet.html')

@login_required
def master_sheet(request):
    return render(request, 'input/master_sheet.html')

@login_required
def interpretation_sheet(request):
    return render(request, 'input/interpretation_sheet.html')

@login_required
def write_sheet(request):
    return render(request, 'output/write_sheet.html')

@login_required
def aa_output(request):
    return render(request, 'output/aa_output.html')

@login_required
def images(request):
    return render(request, 'attachments/images.html')

@login_required
def videos(request):
    return render(request, 'attachments/videos.html')

@login_required
def database(request):
    return render(request, 'attachments/database.html')