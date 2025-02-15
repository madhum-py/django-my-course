from django.shortcuts import render, redirect
from .models import StudentRegistration  # Ensure the model is imported
from django.http import HttpResponse, JsonResponse

def register(request):
    if request.method == "POST":
        try:
            batch = request.POST.get("batch", "").strip()
            name = request.POST.get("name", "").strip()
            whatsapp = request.POST.get("whatsapp", "").strip()
            email = request.POST.get("email", "").strip()

            # Ensure required fields are provided
            if not batch or not name or not whatsapp:
                return JsonResponse({"success": False, "message": "Missing required fields"}, status=400)

            # Save to database
            StudentRegistration.objects.create(
                batch=batch,
                name=name,
                whatsapp=whatsapp,
                email=email
            )

            return JsonResponse({"success": True, "message": "Registration successful"})

        except Exception as e:
            print("Error in register view:", e)  # Print error in server logs
            return JsonResponse({"success": False, "message": "Server error"}, status=500)

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
