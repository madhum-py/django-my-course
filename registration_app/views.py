from django.shortcuts import render, redirect
from .models import StudentRegistration  # Ensure the model is imported
from django.http import HttpResponse, JsonResponse

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import StudentRegistration  
import traceback

@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            batch = request.POST.get("batch", "").strip()
            name = request.POST.get("name", "").strip()
            whatsapp = request.POST.get("whatsapp", "").strip()
            email = request.POST.get("email", "").strip()

            # Basic Validation
            if not batch or not name or not whatsapp:
                return JsonResponse({"success": False, "message": "All fields except email are required."}, status=400)

            # WhatsApp Number Validation (Example: Min Length)
            if len(whatsapp) < 10:
                return JsonResponse({"success": False, "message": "WhatsApp number must be at least 10 digits long."}, status=400)

            # Check if the user has already registered for this batch
            if StudentRegistration.objects.filter(batch=batch, whatsapp=whatsapp).exists():
                return JsonResponse({"success": False, "message": "You are already registered for this batch."}, status=400)

            # Save to Database
            StudentRegistration.objects.create(
                batch=batch,
                name=name,
                whatsapp=whatsapp,
                email=email
            )

            return JsonResponse({"success": True, "message": "Registration successful!"})

        except Exception as e:
            print("Error in register view:", traceback.format_exc())  
            return JsonResponse({"success": False, "message": "Something went wrong. Please try again."}, status=500)

    return JsonResponse({"success": False, "message": "Invalid request"}, status=400)


def index(request):
    if request.method == "POST":
        form = StudentRegistration(request.POST)
        if form.is_valid():
            form.save()
            return render(request, "confirmation.html")  # Show success message
    else:
        form = StudentRegistration()

    return render(request, "index.html", {"form": form})
