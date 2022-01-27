from django.shortcuts import render, redirect
from django.http import JsonResponse
from videoApp.utils import file_uploaded
from videoApp.models import Video


# Create your views here.
def index(request):
    return render(request, "videoApp/index.html")


def recordings(request):
    recordings = Video.objects.all()
    context = {"recordings":recordings, "number":len(recordings)}
    return render(request, "videoApp/recordings.html", context)


def upload(request):
    
    filename =  file_uploaded(request.POST.get("file"), request.POST.get("name"))
     
    if request.POST:
        Video.objects.create(file=filename)
        return JsonResponse({"message":"File was uploaded successfully"})
            
    else:
        return JsonResponse({"message":"Ajax Request Error"})

def removeRecording(request, id):
    Video.objects.filter(id=id)[0].delete()

    return redirect("recordings")