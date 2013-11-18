from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from commits.models import Commit
import json
# Create your views here.
def jsonPageAfter(request):
	page = request.GET.get('page')

	commitList = Commit.objects.all().order_by('-timestamp')
	paginator = Paginator(commitList, 25)

	try: 
		commits = [{'name': i.professor.name, 
					'avatar': i.professor.avatar_thumbnail.url,
					'message': i.message,
					'timestamp': i.timestamp.isoformat()} for i in paginator.page(page)]
	except EmptyPage:
		commits = []

	return HttpResponse(json.dumps(commits), content_type='application/json')