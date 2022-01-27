from django.contrib import admin
from .models import *
# Register your models here.
class AudioAdmin(admin.ModelAdmin):
    list_display = ("file",)


admin.site.register(Video, AudioAdmin)
