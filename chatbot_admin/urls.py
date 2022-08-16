from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


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
    path('output/export_write_sheet', views.exportWriteSheet, name='exportWriteSheet'),

    path('output/aa_output_sheet', views.aa_output_sheet, name='aa_output_sheet'),
    path('output/export_aa_output_sheet', views.exportAAOutputSheet, name='exportAAOutputSheet'),

    path('attachments/videos', views.videos, name='videos'),

    path('chatbot', views.chatbot, name='chatbot'),
    path('chatbot/start', views.chatbot_start, name='chatbot_start'),
    path('terms_conditions', views.terms_conditions, name='terms_conditions')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)