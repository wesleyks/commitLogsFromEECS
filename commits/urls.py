from django.conf.urls import patterns, url

from commits import views

urlpatterns = patterns('',
	url(r'^jsonPageAfter/', views.jsonPageAfter),
	url(r'^jsonNewSince/', views.jsonNewSince)
)