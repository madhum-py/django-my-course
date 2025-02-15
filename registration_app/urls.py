from django.urls import path
from . import views
app_name = "registration_app"

urlpatterns = [
    path('', views.index, name='index'),  # Home page
    path('register/', views.register, name='register'),  # Register URL
]