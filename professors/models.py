from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

# Create your models here.
class Professor(models.Model):
	name = models.CharField(max_length=64)
	avatar_thumbnail = ProcessedImageField(upload_to='avatars/',
		processors=[ResizeToFill(100, 100)],
		format='JPEG',
		options={'quality': 80})
	def __unicode__(self):
		return self.name