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
    path('output/delete_write_sheet', views.deleteWriteSheet, name='deleteWriteSheet'),

    path('output/aa_output_sheet', views.aa_output_sheet, name='aa_output_sheet'),
    path('output/export_aa_output_sheet', views.exportAAOutputSheet, name='exportAAOutputSheet'),
    path('output/delete_aa_output_sheet', views.deleteAAOutputSheet, name='deleteAAOutputSheet'),

    path('attachments/videos', views.videos, name='videos'),

    path('chatbot', views.chatbot, name='chatbot'),
    path('chatbot/start', views.chatbot_start, name='chatbot_start'),
    path('chatbot/get_database', views.chatbot_getDatabase, name='chatbot_getDatabase'),
    path('chatbot/get_next_query', views.getNextQuery, name='getNextQuery'),
    path('chatbot/get_feedbacks', views.get_Feedback, name='getFeedback'),
    path('chatbot/write_output', views.writeOutput, name='writeOutput'),
    
    path('settings', views.settings, name='settings'),
    path('settings/terms_save', views.terms_save, name='terms_save'),
    path('settings/cookie_save', views.cookie_save, name='cookie_save'),
    path('settings/title_save', views.title_save, name='title_save'),
    path('settings/welcome_save', views.welcome_save, name='welcome_save'),
    path('settings/logo/upload', views.logoUpload, name='logoUpload'),
    path('settings/login/upload', views.loginUpload, name='loginUpload'),
    path('settings/favicon/upload', views.faviconUpload, name='faviconUpload')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)