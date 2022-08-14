from django.db import models
import os

from django.utils.translation import gettext_lazy as _


# Create your models here.
# class Sheet(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=255)
#     status = models.IntegerField(default=1)
#     upload_date = models.DateTimeField(auto_now_add=True)
#     doc_types = (
#         ('RS', 'ReadSheet'),
#         ('MS', 'MasterSheet'),
#         ('IS', 'InterpretationSheet'),
#         ('WS', 'WriteSheet'),
#         ('AS', 'AAOutput'),
#     )
#     type = models.CharField(max_length=2, choices=doc_types)

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

