from django import forms 

from .models import MasterSheet
from .models import ReadSheet
from .models import InterpretationSheet
from .models import Images_Bot
from .models import Database_Excel
from .models import Settings_Image
from .models import TestSheet

class MasterSheetForm(forms.ModelForm):
    class Meta:
        model = MasterSheet
        fields = ['file']

class ReadSheetForm(forms.ModelForm):
    class Meta:
        model = ReadSheet
        fields = ['file']

class InterpretationSheetForm(forms.ModelForm):
    class Meta:
        model = InterpretationSheet
        fields = ['file']

class Images_BotForm(forms.ModelForm):
    class Meta:
        model = Images_Bot
        fields = ['file']

class Database_ExcelForm(forms.ModelForm):
    class Meta:
        model = Database_Excel
        fields = ['file']

class SettingsForm(forms.ModelForm):
    class Meta:
        model = Settings_Image
        fields = ['file']

class TestSheetForm(forms.ModelForm):
    class Meta:
        model = TestSheet
        fields = ['file']