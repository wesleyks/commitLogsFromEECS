from django.db import models
from professors.models import Professor
from datetime import datetime
# Create your models here.
class Commit(models.Model):
	professor = models.ForeignKey(Professor)
	message = models.TextField()
	timestamp = models.DateTimeField(db_index=True, default=datetime.now)
	def __unicode__(self):
		return str(self.professor) + ': ' + self.message;