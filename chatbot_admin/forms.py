from django import forms 

from .models import MasterSheet

class MasterSheetForm(forms.ModelForm):
    class Meta:
        model = MasterSheet
        fields = ['file']