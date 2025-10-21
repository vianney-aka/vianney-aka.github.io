# Assets Directory

Ce dossier contient toutes les ressources visuelles du portfolio.

## 📋 Liste des fichiers requis

### Images de profil
- **profile.jpg** (500x500px, < 200KB)
  - Photo professionnelle de Vianney AKA
  - Format : JPG ou PNG
  - Fond neutre ou flou
  - Éclairage professionnel

### Images de projets
1. **project-impactlab.jpg** (800x600px, < 300KB)
   - Screenshot de la plateforme Impact'Lab UNESCO
   - Capture d'écran du dashboard ou page d'accueil

2. **project-prosper.jpg** (800x600px, < 300KB)
   - Screenshot du LMS Prosper Cashew
   - Interface de formation ou tableau de bord

3. **project-speedkdo.jpg** (800x600px, < 300KB)
   - Screenshot de SpeedKDO
   - Page d'accueil ou fonctionnalité principale

4. **project-drone.jpg** (800x600px, < 300KB)
   - Photo du drone ou interface de contrôle
   - Peut être une photo du hackathon

### Logos
- **logo-unesco.png** (200x200px, < 50KB)
  - Logo officiel UNESCO Impact'Lab
  - Format PNG avec transparence

### Favicon
- **favicon.png** (32x32px, < 10KB)
  - Icône du site (initiales VA ou logo personnel)
  - Format PNG ou ICO

### Open Graph Image (optionnel)
- **og-image.jpg** (1200x630px, < 500KB)
  - Image pour partage sur réseaux sociaux
  - Contient : nom, titre, photo

## 🎨 Outils de création

### Pour les screenshots
- **Windows** : Win + Shift + S
- **Mac** : Cmd + Shift + 4
- **Chrome DevTools** : Capture screenshot responsive

### Pour l'optimisation
- [TinyPNG](https://tinypng.com) - Compression PNG/JPG
- [Squoosh](https://squoosh.app) - Compression avancée
- [Remove.bg](https://remove.bg) - Retirer fond d'image

### Pour le design
- [Canva](https://canva.com) - Créer og-image et favicon
- [Figma](https://figma.com) - Design professionnel
- [Photopea](https://photopea.com) - Éditeur en ligne gratuit

## 📐 Spécifications techniques

### Format recommandé
- **Photos** : JPG (meilleure compression)
- **Logos/Icônes** : PNG (transparence)
- **Qualité** : 80-85% pour JPG

### Résolution
- **Desktop** : 72-96 DPI
- **Print** : 300 DPI (non nécessaire ici)

### Nommage
- Utiliser des tirets : `project-name.jpg`
- Pas d'espaces ni caractères spéciaux
- Tout en minuscules

## 🚀 Ajout rapide

### Méthode 1 : Via GitHub
1. Aller sur le repo GitHub
2. Cliquer sur le dossier `assets`
3. Cliquer sur "Add file" > "Upload files"
4. Glisser-déposer les images
5. Commit les changements

### Méthode 2 : Via Git
```bash
# Copier les images dans le dossier assets
cp /chemin/vers/images/* assets/

# Ajouter et commit
git add assets/
git commit -m "Add portfolio images"
git push origin main
```

## 🎯 Images placeholder

En attendant les vraies images, vous pouvez utiliser :

- [Unsplash](https://unsplash.com) - Photos professionnelles gratuites
- [Pexels](https://pexels.com) - Banque d'images libres
- [Lorem Picsum](https://picsum.photos) - Images placeholder
- [UI Faces](https://uifaces.co) - Photos de profil

### Exemple de placeholder
```html
<!-- Temporaire -->
<img src="https://picsum.photos/800/600" alt="Project">

<!-- À remplacer par -->
<img src="assets/project-impactlab.jpg" alt="Impact'Lab UNESCO">
```

## ✅ Checklist avant déploiement

- [ ] Toutes les images sont optimisées (< taille max)
- [ ] Les noms de fichiers correspondent au HTML
- [ ] Les images sont en 72-96 DPI
- [ ] Format correct (JPG pour photos, PNG pour logos)
- [ ] Alt text descriptif dans le HTML
- [ ] Images testées sur mobile et desktop
- [ ] Pas d'images copyrightées sans autorisation

## 📝 Notes importantes

- **Copyright** : Utiliser uniquement des images dont vous avez les droits
- **Confidentialité** : Flouter informations sensibles dans les screenshots
- **Qualité** : Privilégier la qualité professionnelle
- **Cohérence** : Garder un style visuel uniforme

---

**Besoin d'aide ?** Contactez-moi : contact@vianney-aka.com
