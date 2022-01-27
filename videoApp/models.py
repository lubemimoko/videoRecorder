from django.db import models
    
# Create your models here.

class Video(models.Model):
    file = models.FileField(upload_to ="video/")
    datetime = models.DateTimeField(auto_now_add= True, editable=False)

    
    def delete(self):
        self.file.delete()
        super(Video, self).delete()



































































