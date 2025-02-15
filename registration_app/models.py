from django.db import models

class StudentRegistration(models.Model):
    batch = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    whatsapp = models.CharField(max_length=15)  # This was missing
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.batch}"
