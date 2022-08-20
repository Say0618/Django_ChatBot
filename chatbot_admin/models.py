from django.db import models
import os

from django.utils.translation import gettext_lazy as _

# class Attachment(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=255)
#     status = models.IntegerField(default=1)
#     upload_date = models.DateTimeField(auto_now_add=True)

#     att_types = (
#         ('IM', 'Image'),
#         ('DB', 'Database'),
#         ('VD', 'Video')
#     )
#     type = models.CharField(max_length=2, choices=att_types)

class MasterSheet(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.IntegerField(default=1)
    upload_date = models.DateTimeField(auto_now_add=True)

    file = models.FileField(upload_to='master_sheets')

    def filename(self):
        return os.path.basename(self.file.name)

class ReadSheet(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.IntegerField(default=1)
    upload_date = models.DateTimeField(auto_now_add=True)

    file = models.FileField(upload_to='read_sheets')

    def filename(self):
        return os.path.basename(self.file.name)

class InterpretationSheet(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.IntegerField(default=1)
    upload_date = models.DateTimeField(auto_now_add=True)

    file = models.FileField(upload_to='interpretation_sheets')

    def filename(self):
        return os.path.basename(self.file.name)

class Images_Bot(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.IntegerField(default=1)
    upload_date = models.DateTimeField(auto_now_add=True)

    file = models.FileField(upload_to='attachments/images')

    def filename(self):
        return os.path.basename(self.file.name)

class Database_Excel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.IntegerField(default=1)
    upload_date = models.DateTimeField(auto_now_add=True)

    file = models.FileField(upload_to='attachments/database')

    def filename(self):
        return os.path.basename(self.file.name)

class Settings(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    type = models.CharField(max_length=255)

class Settings_Image(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='settings')
    type = models.CharField(max_length=255)

    def filename(self):
        return os.path.basename(self.file.name)


