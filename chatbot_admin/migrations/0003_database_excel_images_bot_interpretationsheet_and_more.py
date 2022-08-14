# Generated by Django 4.1 on 2022-08-14 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot_admin', '0002_mastersheet'),
    ]

    operations = [
        migrations.CreateModel(
            name='Database_Excel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('status', models.IntegerField(default=1)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(upload_to='master_sheets')),
            ],
        ),
        migrations.CreateModel(
            name='Images_Bot',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('status', models.IntegerField(default=1)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(upload_to='master_sheets')),
            ],
        ),
        migrations.CreateModel(
            name='InterpretationSheet',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('status', models.IntegerField(default=1)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(upload_to='master_sheets')),
            ],
        ),
        migrations.CreateModel(
            name='ReadSheet',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('status', models.IntegerField(default=1)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(upload_to='master_sheets')),
            ],
        )
    ]