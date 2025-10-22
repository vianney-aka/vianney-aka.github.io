# ⚡ Quick Start - Portfolio Vianney AKA

Guide de démarrage rapide pour mettre votre portfolio en ligne en **15 minutes**.

---

## 🎯 Étapes Rapides

### 1️⃣ Préparer les Images (5 min)

Ajouter ces fichiers dans le dossier `assets/` :

```
assets/
├── profile.jpg              (votre photo professionnelle)
├── project-impactlab.jpg    (screenshot Impact'Lab)
├── project-prosper.jpg      (screenshot Prosper Cashew)
├── project-speedkdo.jpg     (screenshot SpeedKDO)
├── project-drone.jpg        (photo du drone)
└── favicon.png              (icône du site)
```

**Pas d'images ?** Utilisez temporairement :
- [Unsplash](https://unsplash.com) pour photos professionnelles
- [Lorem Picsum](https://picsum.photos/800/600) pour placeholders

---

### 2️⃣ Personnaliser les Infos (3 min)

Ouvrir `index.html` et modifier :

**Ligne 80-85** : Nom et titre
```html
<h1 class="hero-title">Votre Nom</h1>
<h2 class="hero-subtitle">Votre Titre</h2>
```

**Ligne 450** : Email et téléphone
```html
<a href="mailto:votre-email@example.com">votre-email@example.com</a>
<a href="tel:+225XXXXXXXX">+225 XX XX XX XX XX</a>
```

**Ligne 480** : Liens sociaux
```html
<a href="https://github.com/votre-username">GitHub</a>
<a href="https://linkedin.com/in/votre-username">LinkedIn</a>
```

---

### 3️⃣ Déployer sur GitHub (7 min)

#### A. Créer le repository

1. Aller sur [github.com/new](https://github.com/new)
2. Nom : `votre-username.github.io` (⚠️ exactement votre username GitHub)
3. Public ✓
4. Create repository

#### B. Pousser le code

Ouvrir le terminal dans le dossier du projet :

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit: Portfolio"

# Connecter à GitHub (remplacer USERNAME)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# Pousser
git branch -M main
git push -u origin main
```

#### C. Activer GitHub Pages

1. Aller sur le repo GitHub
2. Settings > Pages
3. Source : `main` / `/ (root)`
4. Save

✅ **Votre site sera en ligne dans 2-3 minutes !**

URL : `https://votre-username.github.io`

---

## 🎨 Personnalisation Optionnelle

### Changer les couleurs

`assets/styles.css` lignes 5-12 :
```css
--primary: #0066FF;      /* Votre couleur principale */
--secondary: #00C853;    /* Votre couleur secondaire */
```

### Configurer le formulaire de contact

1. Créer compte sur [formspree.io](https://formspree.io)
2. Créer un formulaire
3. Copier l'ID
4. Dans `index.html` ligne 460 :
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```

---

## ✅ Checklist Minimale

Avant de partager votre portfolio :

- [ ] Images ajoutées dans `assets/`
- [ ] Nom et titre modifiés
- [ ] Email et téléphone corrects
- [ ] Liens GitHub et LinkedIn mis à jour
- [ ] Site déployé et accessible
- [ ] Testé sur mobile

---

## 🚀 Prochaines Étapes

1. **Ajouter vos vrais projets** → Voir `CUSTOMIZATION.md`
2. **Optimiser les images** → Utiliser [TinyPNG](https://tinypng.com)
3. **Configurer Analytics** → Google Analytics
4. **Partager** → LinkedIn, CV, réseaux sociaux

---

## 📚 Documentation Complète

- **README.md** → Vue d'ensemble du projet
- **DEPLOYMENT.md** → Guide détaillé de déploiement
- **CUSTOMIZATION.md** → Personnalisation avancée
- **assets/README.md** → Guide des images

---

## 🆘 Besoin d'Aide ?

### Problèmes courants

**Le site ne s'affiche pas ?**
- Vérifier que le repo s'appelle `username.github.io`
- Attendre 5-10 minutes
- Vider le cache (Ctrl+Shift+R)

**Images ne s'affichent pas ?**
- Vérifier les chemins : `assets/profile.jpg`
- S'assurer que les images sont poussées sur GitHub

**Formulaire ne fonctionne pas ?**
- Configurer Formspree (voir ci-dessus)

### Support

📧 Email : contact@vianney-aka.com
🐙 GitHub : [github.com/vianney-aka](https://github.com/vianney-aka)

---

## 🎉 Félicitations !

Votre portfolio professionnel est maintenant en ligne !

**Partagez-le** :
- ✅ LinkedIn : Ajouter dans "Site web"
- ✅ CV : Ajouter le lien
- ✅ Email signature : Inclure l'URL
- ✅ Réseaux sociaux : Partager

---

**Made with ❤️ in Côte d'Ivoire**

*Temps total : ~15 minutes*
