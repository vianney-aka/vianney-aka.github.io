from django.contrib import admin
from .models import Project,About,Skill,Technical_skills,Certification,Service,Title

# Register your models here.
admin.site.register(Project)
admin.site.register(About)
admin.site.register(Title)
admin.site.register(Skill)
admin.site.register(Technical_skills)
admin.site.register(Certification)
admin.site.register(Service)
