from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_attempt, name='login_attempt'),
    path('logout', views.logout_attempt, name='logout_attempt'),
    path('users', views.users, name='users'),
    path('user/add', views.addUser, name='addUser'),
    path('user/edit', views.editUser, name='editUser'),
    path('user/operateUser', views.operateUser, name='operateUser'),
    # path('user/activate', views.activateUser, name='activateUser'),
    # path('user/deactivate', views.deActivateUser, name='deActivateUser'),
    path('settings', views.settings, name='settings'),
    path('input/master_sheet', views.master_sheet, name='master_sheet'),
    path('input/master_sheet/operate', views.operateMasterSheet, name='operateMasterSheet'),          
    path('input/master_sheet/download', views.masterSheetDownload, name='masterSheetDownload'),          
    path('input/read_sheet', views.read_sheet, name='read_sheet'),
    path('input/interpretation_sheet', views.interpretation_sheet, name='interpretation_sheet'),
    path('output/write_sheet', views.write_sheet, name='write_sheet'),
    path('output/aa_output', views.aa_output, name='aa_output'),
    path('attachments/images', views.images, name='images'),
    path('attachments/videos', views.videos, name='videos'),
    path('attachments/database', views.database, name='database'),
    path('upload/mastersheet', views.uploadMasterSheet, name='uploadMasterSheet'),
]