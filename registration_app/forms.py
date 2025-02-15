from django import forms
from .models import StudentRegistration

class StudentRegistrationForm(forms.ModelForm):
    class Meta:
        model = StudentRegistration
        fields = ['name', 'email', 'whatsapp_number', 'batch']
