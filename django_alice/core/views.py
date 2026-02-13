from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Pet Manager 🐾</h1><p>Admin is at /admin</p>")

def about(request):
    return HttpResponse("<h1>About</h1><p>This is the about page</p>")