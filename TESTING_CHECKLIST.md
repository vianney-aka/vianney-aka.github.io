# ✅ Checklist de Test - Portfolio

Guide complet pour tester votre portfolio avant et après déploiement.

---

## 🧪 Tests en Local (Avant Déploiement)

### 1. Ouvrir le Portfolio

```bash
# Ouvrir index.html dans le navigateur
# Double-cliquer sur index.html
# Ou utiliser un serveur local (recommandé)
```

**Serveur local recommandé** :
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (si http-server installé)
npx http-server

# VS Code : Extension "Live Server"
```

Puis ouvrir : `http://localhost:8000`

---

### 2. Tests Visuels

#### ✅ Hero Section
- [ ] Le nom s'affiche correctement
- [ ] Le titre professionnel est visible
- [ ] La description est lisible
- [ ] Les 2 boutons CTA sont visibles
- [ ] Les statistiques s'affichent (5+, 300+, 200+)
- [ ] L'animation de chargement fonctionne
- [ ] La photo de profil s'affiche (ou placeholder)

#### ✅ Navigation
- [ ] Le logo est visible
- [ ] Tous les liens de menu sont présents
- [ ] Le toggle theme (🌙) est visible
- [ ] La navigation est sticky au scroll
- [ ] Les liens fonctionnent (smooth scroll)
- [ ] Le lien actif est surligné

#### ✅ Section Projets
- [ ] Les 4 projets s'affichent
- [ ] Les images de projets sont visibles
- [ ] Les badges (Featured, TotalEnergies, Finaliste) sont visibles
- [ ] Les tags technos s'affichent
- [ ] Les métriques sont visibles
- [ ] Les liens externes fonctionnent (↗)

#### ✅ Filtres de Projets
- [ ] Tous les boutons de filtre sont visibles
- [ ] Le filtre "Tous" est actif par défaut
- [ ] Cliquer sur "Laravel" filtre correctement
- [ ] Cliquer sur "Moodle" filtre correctement
- [ ] Cliquer sur "Python" filtre correctement
- [ ] Revenir à "Tous" affiche tous les projets

#### ✅ Section Compétences
- [ ] Les 4 catégories s'affichent
- [ ] Les icônes emoji sont visibles
- [ ] Les barres de progression sont visibles
- [ ] Les pourcentages sont corrects
- [ ] Les certifications s'affichent en bas
- [ ] Les badges d'impact sont visibles

#### ✅ Section Parcours
- [ ] La timeline est visible
- [ ] Les 4 expériences s'affichent
- [ ] Les dates sont correctes
- [ ] Les titres de poste sont visibles
- [ ] Les noms d'entreprises sont corrects
- [ ] Les listes de réalisations sont lisibles

#### ✅ Section Contact
- [ ] Les informations de contact sont visibles
- [ ] L'email est cliquable (mailto:)
- [ ] Les téléphones sont cliquables (tel:)
- [ ] Les icônes sociales sont visibles
- [ ] Le formulaire s'affiche correctement
- [ ] Tous les champs sont présents

#### ✅ Footer
- [ ] Le nom/branding est visible
- [ ] Les liens de navigation fonctionnent
- [ ] Les informations de contact sont correctes
- [ ] Le copyright 2025 est présent
- [ ] "Made with ❤️ in Côte d'Ivoire" est visible

---

### 3. Tests Fonctionnels

#### ✅ Navigation
```
Test 1 : Cliquer sur "Projets"
→ Doit scroller vers la section projets

Test 2 : Cliquer sur "Compétences"
→ Doit scroller vers la section compétences

Test 3 : Cliquer sur "Contact"
→ Doit scroller vers la section contact

Test 4 : Scroller vers le bas
→ La navigation doit devenir sticky
→ Le lien actif doit changer selon la section visible
```

#### ✅ Menu Mobile
```
Test 1 : Redimensionner fenêtre < 768px
→ Le hamburger menu doit apparaître

Test 2 : Cliquer sur le hamburger
→ Le menu doit s'ouvrir

Test 3 : Cliquer sur un lien
→ Le menu doit se fermer
→ Doit scroller vers la section
```

#### ✅ Theme Toggle
```
Test 1 : Cliquer sur 🌙
→ Le thème doit passer en clair
→ L'icône doit changer en ☀️

Test 2 : Cliquer sur ☀️
→ Le thème doit revenir en sombre
→ L'icône doit redevenir 🌙
```

#### ✅ Filtres de Projets
```
Test 1 : Cliquer sur "Laravel"
→ Seuls les projets Laravel doivent être visibles
→ Le bouton "Laravel" doit être actif

Test 2 : Cliquer sur "Moodle"
→ Seul le projet Impact'Lab doit être visible

Test 3 : Cliquer sur "Tous"
→ Tous les projets doivent réapparaître
```

#### ✅ Formulaire de Contact
```
Test 1 : Soumettre formulaire vide
→ Doit afficher erreurs de validation

Test 2 : Entrer email invalide
→ Doit afficher erreur email

Test 3 : Remplir tous les champs correctement
→ Doit soumettre (si Formspree configuré)
→ Doit afficher message de succès
```

#### ✅ Liens Externes
```
Test 1 : Cliquer sur lien GitHub
→ Doit ouvrir dans nouvel onglet

Test 2 : Cliquer sur lien LinkedIn
→ Doit ouvrir dans nouvel onglet

Test 3 : Cliquer sur lien projet (↗)
→ Doit ouvrir le projet dans nouvel onglet
```

---

### 4. Tests Responsive

#### ✅ Desktop (> 1024px)
- [ ] Layout en 2 colonnes (hero)
- [ ] Projets en grille 3 colonnes
- [ ] Navigation horizontale complète
- [ ] Toutes les sections bien espacées
- [ ] Pas de débordement horizontal

#### ✅ Tablet (768px - 1024px)
- [ ] Layout adapté
- [ ] Projets en grille 2 colonnes
- [ ] Navigation toujours horizontale
- [ ] Textes lisibles
- [ ] Espacements corrects

#### ✅ Mobile (< 768px)
- [ ] Layout en 1 colonne
- [ ] Hamburger menu visible
- [ ] Projets en 1 colonne
- [ ] Compétences en 1 colonne
- [ ] Timeline verticale
- [ ] Textes lisibles (pas trop petits)
- [ ] Boutons facilement cliquables
- [ ] Pas de zoom nécessaire

**Tester sur** :
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad (768px)
- iPad Pro (1024px)

---

### 5. Tests Performance

#### ✅ Vitesse de Chargement
```
Test 1 : Ouvrir DevTools (F12)
→ Onglet Network
→ Rafraîchir la page (Ctrl+R)
→ Vérifier temps de chargement total < 3s
```

#### ✅ Taille des Ressources
```
Test 1 : Dans Network
→ Vérifier taille totale < 3 MB
→ Vérifier chaque image < 500 KB
→ Vérifier CSS < 50 KB
→ Vérifier JS < 50 KB
```

#### ✅ Console Errors
```
Test 1 : Ouvrir Console (F12)
→ Rafraîchir la page
→ Vérifier qu'il n'y a pas d'erreurs rouges
→ Les warnings jaunes sont OK
```

---

### 6. Tests Accessibilité

#### ✅ Navigation Clavier
```
Test 1 : Appuyer sur Tab
→ Doit naviguer entre les éléments interactifs
→ Le focus doit être visible

Test 2 : Appuyer sur Enter sur un lien
→ Doit activer le lien

Test 3 : Appuyer sur Esc (menu ouvert)
→ Doit fermer le menu mobile
```

#### ✅ Contraste
```
Test 1 : Vérifier que tous les textes sont lisibles
→ Texte clair sur fond sombre
→ Pas de gris trop clair

Test 2 : Utiliser outil de contraste
→ Chrome DevTools > Lighthouse > Accessibility
```

#### ✅ Alt Texts
```
Test 1 : Désactiver les images
→ Chrome DevTools > Settings > Disable images
→ Vérifier que les alt texts sont descriptifs
```

---

## 🌐 Tests Après Déploiement

### 1. Vérification URL

```
Test 1 : Ouvrir https://votre-username.github.io
→ Le site doit s'afficher

Test 2 : Vérifier HTTPS
→ Cadenas vert dans la barre d'adresse

Test 3 : Tester sur différents navigateurs
→ Chrome
→ Firefox
→ Safari
→ Edge
```

---

### 2. Tests Images

#### ✅ Toutes les Images
```
Test 1 : Ouvrir DevTools > Console
→ Vérifier qu'il n'y a pas d'erreurs 404 pour les images

Test 2 : Vérifier visuellement
→ Photo de profil visible
→ 4 images de projets visibles
→ Favicon visible dans l'onglet
```

---

### 3. Tests Formulaire

#### ✅ Formspree
```
Test 1 : Remplir et soumettre le formulaire
→ Doit envoyer l'email
→ Doit afficher message de succès

Test 2 : Vérifier réception
→ Vérifier que l'email est reçu sur Formspree
```

---

### 4. Tests SEO

#### ✅ Meta Tags
```
Test 1 : Voir le code source (Ctrl+U)
→ Vérifier balise <title>
→ Vérifier meta description
→ Vérifier Open Graph tags

Test 2 : Partager sur Facebook/LinkedIn
→ Vérifier que la preview est correcte
```

#### ✅ Google Search Console
```
Test 1 : Soumettre le site
→ search.google.com/search-console
→ Ajouter la propriété
→ Vérifier la propriété
```

---

### 5. Tests Performance (Lighthouse)

#### ✅ Audit Lighthouse
```
Test 1 : Ouvrir DevTools (F12)
→ Onglet Lighthouse
→ Sélectionner toutes les catégories
→ Cliquer "Generate report"

Objectifs :
→ Performance : 90+
→ Accessibility : 95+
→ Best Practices : 95+
→ SEO : 100
```

#### ✅ PageSpeed Insights
```
Test 1 : Aller sur pagespeed.web.dev
→ Entrer l'URL du site
→ Analyser
→ Vérifier scores Mobile et Desktop
```

---

### 6. Tests Multi-Navigateurs

#### ✅ Navigateurs Desktop
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (si Mac)
- [ ] Edge (dernière version)

#### ✅ Navigateurs Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

**Tester** :
- Affichage correct
- Navigation fonctionne
- Formulaire fonctionne
- Animations fluides

---

### 7. Tests Réseaux Sociaux

#### ✅ Facebook
```
Test 1 : Aller sur facebook.com
→ Créer un post avec l'URL du site
→ Vérifier la preview (image, titre, description)
```

#### ✅ LinkedIn
```
Test 1 : Aller sur linkedin.com
→ Créer un post avec l'URL du site
→ Vérifier la preview
```

#### ✅ Twitter
```
Test 1 : Aller sur twitter.com
→ Créer un tweet avec l'URL du site
→ Vérifier la Twitter Card
```

---

## 🐛 Problèmes Courants et Solutions

### ❌ Images ne s'affichent pas

**Diagnostic** :
```
1. Ouvrir Console (F12)
2. Chercher erreurs 404
3. Vérifier les chemins
```

**Solutions** :
```bash
# Vérifier que les images sont dans assets/
ls assets/

# Vérifier les noms de fichiers (sensible à la casse)
# Doit être : assets/profile.jpg
# Pas : Assets/Profile.JPG

# Pousser les images si manquantes
git add assets/
git commit -m "Add portfolio images"
git push origin main
```

---

### ❌ Formulaire ne fonctionne pas

**Diagnostic** :
```
1. Vérifier l'ID Formspree dans index.html
2. Tester en local d'abord
3. Vérifier la console pour erreurs
```

**Solutions** :
```html
<!-- Vérifier dans index.html -->
<form action="https://formspree.io/f/VOTRE_ID" method="POST">

<!-- L'ID doit être correct -->
```

---

### ❌ Site ne se met pas à jour

**Solutions** :
```bash
# 1. Vérifier que le push a fonctionné
git status

# 2. Vider le cache du navigateur
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# 3. Attendre 2-3 minutes
# GitHub Pages peut prendre du temps

# 4. Vérifier Actions sur GitHub
# Aller sur le repo > Actions
# Vérifier qu'il n'y a pas d'erreurs
```

---

### ❌ Lighthouse score bas

**Solutions Performance** :
```
1. Compresser toutes les images (TinyPNG)
2. Vérifier taille totale page < 3 MB
3. Lazy loading déjà implémenté
4. Minifier CSS/JS (optionnel)
```

**Solutions Accessibility** :
```
1. Vérifier contraste des couleurs
2. Ajouter alt texts manquants
3. Vérifier navigation clavier
```

---

## 📊 Checklist Finale Avant Partage

### ✅ Contenu
- [ ] Toutes les informations personnelles sont correctes
- [ ] Tous les projets sont à jour
- [ ] Les compétences reflètent votre expertise
- [ ] Le parcours professionnel est complet
- [ ] Les liens sociaux fonctionnent

### ✅ Technique
- [ ] Toutes les images s'affichent
- [ ] Pas d'erreurs dans la console
- [ ] Formulaire de contact fonctionne
- [ ] Responsive sur mobile/tablet/desktop
- [ ] Performance Lighthouse > 90

### ✅ SEO
- [ ] Meta tags complétés
- [ ] Open Graph configuré
- [ ] Favicon visible
- [ ] Sitemap créé (optionnel)
- [ ] Google Search Console configuré (optionnel)

### ✅ Accessibilité
- [ ] Navigation clavier fonctionne
- [ ] Contraste WCAG AA
- [ ] Alt texts sur toutes les images
- [ ] ARIA labels appropriés

### ✅ Multi-navigateurs
- [ ] Testé sur Chrome
- [ ] Testé sur Firefox
- [ ] Testé sur Safari (si possible)
- [ ] Testé sur mobile

---

## 🎉 Prêt à Partager !

Une fois tous les tests passés :

1. **LinkedIn** : Ajouter dans "Site web" du profil
2. **CV** : Ajouter l'URL
3. **Email signature** : Inclure le lien
4. **Réseaux sociaux** : Partager avec un post

---

**Exemple de post LinkedIn** :
```
🚀 Nouveau Portfolio en Ligne !

Je suis ravi de partager mon portfolio professionnel :
https://votre-username.github.io

Découvrez mes projets en e-learning et développement web,
notamment avec l'UNESCO et TotalEnergies Foundation.

💼 Développeur Full Stack | 🎓 Architecte E-Learning | 🌍 Impact Social

#DeveloppementWeb #ELearning #Portfolio #TechForGood
```

---

**Besoin d'aide pour les tests ?**
📧 contact@vianney-aka.com

**Made with ❤️ in Côte d'Ivoire**
