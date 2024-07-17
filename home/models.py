from django.db import models
from django import forms
from django.utils.translation import gettext as _

# Create your models here.
class Project(models.Model):
    title = models.CharField(_("Titre du projet"),max_length=100)
    description = models.TextField(_("Description"))
    image = models.ImageField(_("Image"),upload_to='images/')
    url = models.URLField(_("Lien du site"),blank=True)
    date = models.DateField(_("Date de réalisation"))

    def __str__(self):
        return self.title


class About(models.Model):
    firstname = models.CharField(_("Prénoms"),max_length=200)
    lastname = models.CharField(_("Nom"),max_length=100)
    location = models.CharField(_("Localisation"), max_length=200)
    status = models.CharField(_("Disponibilité"), max_length=100)
    presentation = models.TextField(_("Présentation"))
    skill_year = models.IntegerField(_("Année d'expérience"),)
    image = models.ImageField(_("Image"),upload_to='images/profile/')
    url = models.URLField(_("Site Internet"),blank=True)
    url_facebook = models.URLField(_("Lien Facebook"),blank=True)
    url_linkedin = models.URLField(_("Lien Linkedin"),blank=True)
    url_instagram = models.URLField(_("Lien Instagram"),blank=True)
    url_x = models.URLField(_("Lien X"),blank=True)
    url_github = models.URLField(_("Lien Github"),blank=True)


    def __str__(self):
        return self.title        

class Title(models.Model):
    title = models.CharField(_("Compétences"), max_length=150)

class Skill(models.Model):
    title = models.CharField(_("Titre"),max_length=150)
    adress = models.CharField(_("Adresse"),max_length=150)
    description = models.TextField(_("Descprition du poste"))
    date_debut = models.DateField(_("Date de début"),auto_now_add=True)  # Utilisation de auto_now_add pour la date de début
    date_fin = models.DateField(_("Date de fin"),auto_now=True)
    
    class Meta:
        verbose_name = _("Skill")
        verbose_name_plural = _("Skills")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Skill_detail", kwargs={"pk": self.pk})

class Technical_skills(models.Model):
    title = models.CharField(_(""), max_length=100)
    image = models.ImageField(upload_to='images/skills/')

    class Meta:
        verbose_name = _("Technical_skills")
        verbose_name_plural = _("Technical_skillss")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Technical_skills_detail", kwargs={"pk": self.pk})

class Certification(models.Model):
    title =models.CharField(_(""), max_length=100)
    image = models.ImageField(upload_to='images/certificate/')
    

    class Meta:
        verbose_name = _("Certification")
        verbose_name_plural = _("Certifications")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Certification_detail", kwargs={"pk": self.pk})


class Service(models.Model):
    title = models.CharField(_("Titre"), max_length=150)
    description = models.TextField(_("Description"))
    

    class Meta:
        verbose_name = _("Service")
        verbose_name_plural = _("Services")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Service_detail", kwargs={"pk": self.pk})


  
class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone_number = models.CharField(max_length=10, blank=True, null=True)  # Champ pour le numéro de téléphone
    message = forms.CharField(widget=forms.Textarea)

