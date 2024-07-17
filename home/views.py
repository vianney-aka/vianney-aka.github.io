from django.shortcuts import render

# Create your views here.

from .models import Project,About,Title,Skill,Technical_skills,Certification,Service


def home(request):
    projects = Project.objects.all()
    abouts = About.objects.all()
    titles = Title.objects.all()
    skills = Skill.objects.all()
    Technical_skill = Technical_skills.objects.all()
    Services = Service.objects.all()

    return render(request, 'home/index.html', {'projects': projects, 'abouts':abouts, 'titles':titles, 'skills':skills,'Technical_skill':Technical_skill,'Services':Services})