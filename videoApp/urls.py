from django.urls import path
from . import views

urlpatterns =[
    path('', views.index, name="home"),
    path('upload/', views.upload, name="upload"),
    path('recordings/', views.recordings, name="recordings"),
    path('removeRecording/<int:id>', views.removeRecording, name="remove")
]
