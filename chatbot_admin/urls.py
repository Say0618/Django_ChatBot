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

    path('settings', views.settings, name='settings'),

    path('input/master_sheet', views.master_sheet, name='master_sheet'),
    path('upload/mastersheet', views.uploadMasterSheet, name='uploadMasterSheet'),
    path('input/master_sheet/operate', views.operateMasterSheet, name='operateMasterSheet'),          
    path('input/master_sheet/download', views.masterSheetDownload, name='masterSheetDownload'),

    path('input/read_sheet', views.read_sheet, name='read_sheet'),
    path('upload/readsheet', views.uploadReadSheet, name='uploadReadSheet'),
    path('input/read_sheet/operate', views.operateReadSheet, name='operateReadSheet'),          
    path('input/read_sheet/download', views.readSheetDownload, name='readSheetDownload'), 

    path('input/interpretation_sheet', views.interpretation_sheet, name='interpretation_sheet'),
    path('upload/interpretationsheet', views.uploadInterpretationSheet, name='uploadInterpretationSheet'),
    path('input/interpretation_sheet/operate', views.operateInterpretationSheet, name='operateInterpretationSheet'),          
    path('input/interpretation_sheet/download', views.interpretationSheetDownload, name='interpretationSheetDownload'),

    path('attachments/images', views.images, name='images'),
    path('upload/images', views.uploadImages, name='uploadImages'),
    path('input/images/operate', views.operateImages, name='operateImages'),          
    path('input/images/download', views.imagesDownload, name='imagesDownload'),

    path('attachments/database', views.database, name='database'),
    path('upload/database', views.uploadDatabase, name='uploadDatabase'),
    path('input/database/operate', views.operateDatabase, name='operateDatabase'),          
    path('input/database/download', views.databaseDownload, name='databaseDownload'),

    path('output/write_sheet', views.write_sheet, name='write_sheet'),
    path('output/aa_output', views.aa_output, name='aa_output'),
    path('attachments/videos', views.videos, name='videos'),
]