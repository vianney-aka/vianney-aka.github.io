# 🚀 Guide de Déploiement GitHub Pages

Guide complet pour déployer votre portfolio sur GitHub Pages en quelques minutes.

---

## 📋 Prérequis

- [x] Compte GitHub créé
- [x] Git installé sur votre machine
- [x] Toutes les images dans le dossier `assets/`
- [x] Formspree configuré (optionnel)

---

## 🎯 Étape 1 : Créer le Repository GitHub

### Option A : Via l'interface GitHub

1. Aller sur [github.com](https://github.com)
2. Cliquer sur le **+** en haut à droite
3. Sélectionner **New repository**
4. **Nom du repository** : `votre-username.github.io`
   - ⚠️ **IMPORTANT** : Remplacer `votre-username` par votre nom d'utilisateur GitHub exact
   - Exemple : Si votre username est `vianney-aka`, le repo doit s'appeler `vianney-aka.github.io`
5. **Description** : "Portfolio professionnel - Développeur Full Stack"
6. Sélectionner **Public**
7. **NE PAS** cocher "Add a README file"
8. Cliquer sur **Create repository**

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create votre-username.github.io --public --description "Portfolio professionnel"
```

---

## 🎯 Étape 2 : Pousser le Code

### Ouvrir le terminal dans le dossier du projet

```bash
# Naviguer vers le dossier
cd d:/2025_FREELANCE/portfolio/CascadeProjects/windsurf-project
```

### Initialiser Git (si pas déjà fait)

```bash
# Initialiser le repository
git init

# Configurer votre identité (si première fois)
git config --global user.name "Votre Nom"
git config --global user.email "votre-email@example.com"
```

### Ajouter et commiter les fichiers

```bash
# Ajouter tous les fichiers
git add .

# Vérifier les fichiers ajoutés
git status

# Créer le commit initial
git commit -m "Initial commit: Portfolio Vianney AKA"
```

### Connecter au repository GitHub

```bash
# Ajouter le remote (REMPLACER votre-username)
git remote add origin https://github.com/votre-username/votre-username.github.io.git

# Vérifier le remote
git remote -v
```

### Pousser vers GitHub

```bash
# Renommer la branche en main (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

**Note** : Si demandé, entrez vos identifiants GitHub ou utilisez un Personal Access Token.

---

## 🎯 Étape 3 : Activer GitHub Pages

### Via l'interface GitHub

1. Aller sur votre repository : `https://github.com/votre-username/votre-username.github.io`
2. Cliquer sur **Settings** (⚙️ Paramètres)
3. Dans le menu latéral gauche, cliquer sur **Pages**
4. Sous **Source** :
   - **Branch** : Sélectionner `main`
   - **Folder** : Sélectionner `/ (root)`
5. Cliquer sur **Save**
6. Une bannière verte apparaîtra : "Your site is ready to be published at..."

### Attendre le déploiement

- ⏱️ **Temps d'attente** : 2-5 minutes
- 🔄 Rafraîchir la page Settings > Pages pour voir le statut
- ✅ Quand prêt : "Your site is published at https://votre-username.github.io"

---

## 🎯 Étape 4 : Vérifications Post-Déploiement

### Tester le site

```bash
# Ouvrir dans le navigateur
https://votre-username.github.io
```

### Checklist de vérification

- [ ] **Page d'accueil** s'affiche correctement
- [ ] **Navigation** fonctionne (tous les liens)
- [ ] **Images** s'affichent (vérifier console pour erreurs)
- [ ] **Responsive** fonctionne sur mobile
- [ ] **Formulaire** de contact fonctionne
- [ ] **Animations** sont fluides
- [ ] **Performance** Lighthouse > 90

### Outils de test

1. **Lighthouse** (Chrome DevTools)
   - F12 > Onglet Lighthouse
   - Tester Performance, Accessibility, SEO

2. **Responsive Design**
   - F12 > Toggle device toolbar (Ctrl+Shift+M)
   - Tester iPhone, iPad, Desktop

3. **Console Errors**
   - F12 > Console
   - Vérifier qu'il n'y a pas d'erreurs rouges

---

## 🔧 Étape 5 : Configuration Avancée (Optionnel)

### Ajouter un domaine personnalisé

Si vous avez acheté un domaine (ex: `vianney-aka.com`) :

#### 1. Configurer les DNS chez votre registrar

Ajouter ces enregistrements DNS :

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: votre-username.github.io
```

#### 2. Configurer GitHub Pages

1. Settings > Pages
2. **Custom domain** : Entrer `votre-domaine.com`
3. Cocher **Enforce HTTPS**
4. Attendre la propagation DNS (24-48h max)

### Activer HTTPS (automatique)

- GitHub Pages active automatiquement HTTPS
- Si custom domain : attendre validation du certificat SSL

---

## 🔄 Mises à Jour du Site

### Workflow de mise à jour

```bash
# 1. Modifier les fichiers localement
# Éditer index.html, styles.css, etc.

# 2. Vérifier les changements
git status

# 3. Ajouter les modifications
git add .

# 4. Commiter avec message descriptif
git commit -m "Update: ajout nouveau projet SpeedKDO"

# 5. Pousser vers GitHub
git push origin main

# 6. Attendre 2-3 minutes
# Le site sera automatiquement mis à jour
```

### Exemples de commits

```bash
# Ajouter un projet
git commit -m "Add: nouveau projet TotalEnergies"

# Corriger un bug
git commit -m "Fix: correction responsive mobile menu"

# Mettre à jour le contenu
git commit -m "Update: nouvelles compétences Angular"

# Optimiser
git commit -m "Optimize: compression images -40%"
```

---

## 🐛 Dépannage

### Problème : Le site ne s'affiche pas

**Solutions** :
1. Vérifier que le repo s'appelle exactement `username.github.io`
2. Vérifier que GitHub Pages est activé (Settings > Pages)
3. Attendre 5-10 minutes après le premier push
4. Vider le cache du navigateur (Ctrl+Shift+R)
5. Vérifier qu'il n'y a pas d'erreurs dans Actions (onglet Actions)

### Problème : Images ne s'affichent pas

**Solutions** :
1. Vérifier les chemins : `assets/profile.jpg` (sensible à la casse)
2. S'assurer que les images sont dans le dossier `assets/`
3. Vérifier que les images sont bien poussées sur GitHub
4. Ouvrir la console (F12) pour voir les erreurs 404

```bash
# Vérifier que les images sont trackées
git ls-files assets/

# Si vide, ajouter les images
git add assets/
git commit -m "Add: portfolio images"
git push origin main
```

### Problème : Formulaire ne fonctionne pas

**Solutions** :
1. Configurer Formspree :
   - Créer compte sur [formspree.io](https://formspree.io)
   - Créer un formulaire
   - Copier l'ID
   - Remplacer dans `index.html` :
   ```html
   <form action="https://formspree.io/f/VOTRE_ID" method="POST">
   ```

2. Tester d'abord en local
3. Vérifier la console pour erreurs CORS

### Problème : CSS/JS ne se charge pas

**Solutions** :
1. Vérifier les chemins dans `index.html`
2. S'assurer que les fichiers sont à la racine
3. Vider le cache : Ctrl+Shift+R
4. Vérifier la console pour erreurs 404

### Problème : Erreur 404 sur GitHub Pages

**Solutions** :
1. Créer un fichier `.nojekyll` à la racine :
   ```bash
   touch .nojekyll
   git add .nojekyll
   git commit -m "Add: .nojekyll for GitHub Pages"
   git push origin main
   ```

---

## 📊 Monitoring et Analytics

### Google Analytics (Optionnel)

1. Créer une propriété sur [analytics.google.com](https://analytics.google.com)
2. Copier le Measurement ID (ex: G-XXXXXXXXXX)
3. Ajouter dans `index.html` avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Search Console

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter la propriété : `https://votre-username.github.io`
3. Vérifier via balise HTML ou DNS
4. Soumettre le sitemap (créer un `sitemap.xml`)

---

## 🎓 Commandes Git Utiles

```bash
# Voir l'historique des commits
git log --oneline

# Voir les modifications non commitées
git diff

# Annuler les modifications locales
git checkout -- fichier.html

# Créer une branche pour tester
git checkout -b test-feature

# Revenir à main
git checkout main

# Fusionner une branche
git merge test-feature

# Voir les branches
git branch -a

# Supprimer une branche locale
git branch -d test-feature
```

---

## 📚 Ressources Supplémentaires

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Guide Git](https://git-scm.com/book/fr/v2)
- [Formspree Documentation](https://help.formspree.io/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## ✅ Checklist Finale

Avant de partager votre portfolio :

- [ ] Site accessible sur `https://username.github.io`
- [ ] Toutes les sections visibles et fonctionnelles
- [ ] Images optimisées et affichées
- [ ] Formulaire de contact testé
- [ ] Responsive vérifié (mobile/tablet/desktop)
- [ ] Performance Lighthouse > 90
- [ ] Liens sociaux mis à jour (LinkedIn, GitHub)
- [ ] Email de contact correct
- [ ] Meta tags SEO complétés
- [ ] Favicon visible dans l'onglet
- [ ] Pas d'erreurs dans la console

---

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne et accessible au monde entier !

**Prochaines étapes** :
1. Partager le lien sur LinkedIn
2. Ajouter le lien dans votre CV
3. Partager sur les réseaux sociaux
4. Mettre à jour régulièrement avec nouveaux projets

---

**Besoin d'aide ?**
- 📧 Email : contact@vianney-aka.com
- 💬 GitHub Issues : Créer une issue sur le repo

**Made with ❤️ in Côte d'Ivoire**
