from django.shortcuts import render
from professors.models import Professor

def index(request):
	professor_list = Professor.objects.all()
	context = {'professor_list': professor_list}
	return render(request, 'commitLogsFromEECS/index.html', context)