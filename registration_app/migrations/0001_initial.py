# Generated by Django 5.1.6 on 2025-02-12 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StudentRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('whatsapp_number', models.CharField(max_length=15)),
                ('batch', models.CharField(max_length=100)),
                ('registration_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
