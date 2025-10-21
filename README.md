# Portfolio - Vianney AKA

Portfolio moderne et performant pour développeur Full Stack spécialisé en e-learning et projets à impact social.

🌐 **Live Demo:** [vianney-aka.github.io](https://vianney-aka.github.io)

---

## 🎯 Caractéristiques

- ✅ **100% Vanilla** - HTML/CSS/JS pur, sans framework lourd
- ⚡ **Performance optimisée** - Score Lighthouse 90+
- 📱 **Responsive** - Mobile-first design
- 🎨 **Design moderne** - Interface tech avec touch d'humanité
- ♿ **Accessible** - WCAG AA compliant
- 🚀 **GitHub Pages ready** - Déploiement en 1 clic

---

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design system moderne avec variables CSS
- **JavaScript ES6+** - Interactions et animations
- **Google Fonts** - Inter & Poppins
- **Formspree** - Gestion des formulaires de contact

---

## 📂 Structure du Projet

```
windsurf-project/
├── index.html          # Page principale
├── styles.css          # Styles complets
├── script.js           # Logique JavaScript
├── README.md           # Documentation
├── .gitignore          # Fichiers à ignorer
└── assets/             # Ressources
    ├── profile.jpg
    ├── project-impactlab.jpg
    ├── project-prosper.jpg
    ├── project-speedkdo.jpg
    ├── project-drone.jpg
    ├── logo-unesco.png
    └── favicon.png
```

---

## 🚀 Déploiement GitHub Pages

### Prérequis

- Compte GitHub
- Git installé localement

### Étapes de déploiement

#### 1. Créer le repository

```bash
# Créer un nouveau repository nommé EXACTEMENT : votre-username.github.io
# Exemple : vianney-aka.github.io
```

#### 2. Cloner et pousser le code

```bash
# Initialiser Git dans le dossier du projet
cd windsurf-project
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - Portfolio Vianney AKA"

# Ajouter le remote (remplacer USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

#### 3. Activer GitHub Pages

1. Aller sur votre repository GitHub
2. Cliquer sur **Settings** (Paramètres)
3. Dans le menu latéral, cliquer sur **Pages**
4. Sous **Source**, sélectionner :
   - Branch: `main`
   - Folder: `/ (root)`
5. Cliquer sur **Save**
6. Attendre 2-3 minutes

✅ Votre site sera disponible sur : `https://USERNAME.github.io`

---

## 📝 Checklist Pré-Déploiement

Avant de déployer, vérifiez :

- [ ] **Images optimisées** - Compresser toutes les images (< 500KB chacune)
- [ ] **Formspree configuré** - Remplacer `YOUR_FORM_ID` dans `index.html`
- [ ] **Liens fonctionnels** - Tester tous les liens internes/externes
- [ ] **Meta tags** - Vérifier titre, description, Open Graph
- [ ] **Favicon** - Ajouter favicon.png dans `/assets`
- [ ] **Responsive** - Tester sur mobile/tablet/desktop
- [ ] **Performance** - Tester avec Lighthouse
- [ ] **Accessibilité** - Vérifier contraste et navigation clavier

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditer les variables CSS dans `styles.css` :

```css
:root {
  --primary: #0066FF;      /* Bleu principal */
  --secondary: #00C853;    /* Vert impact */
  --dark: #0A0E27;         /* Fond sombre */
  --accent: #FF6B6B;       /* Accent rouge */
}
```

### Ajouter un projet

Dans `index.html`, dupliquer un bloc `.project-card` :

```html
<article class="project-card" data-category="laravel">
  <div class="project-image">
    <img src="assets/nouveau-projet.jpg" alt="Nouveau Projet" loading="lazy">
    <a href="https://lien-projet.com" target="_blank" class="project-link">↗</a>
  </div>
  <div class="project-content">
    <h3>Nom du Projet<span class="badge">Badge</span></h3>
    <p>Description du projet...</p>
    <div class="tags">
      <span>Tech1</span><span>Tech2</span>
    </div>
  </div>
</article>
```

### Configurer Formspree

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire
4. Dans `index.html`, remplacer :

```html
<form action="https://formspree.io/f/VOTRE_ID_ICI" method="POST">
```

---

## 🖼️ Optimisation des Images

### Outils recommandés

- **TinyPNG** - [tinypng.com](https://tinypng.com) - Compression PNG/JPG
- **Squoosh** - [squoosh.app](https://squoosh.app) - Compression avancée
- **ImageOptim** - Pour macOS

### Tailles recommandées

- **Photo de profil** : 500x500px, < 200KB
- **Images projets** : 800x600px, < 300KB
- **Logos** : 200x200px, < 50KB
- **Favicon** : 32x32px, < 10KB

---

## 📊 Analytics (Optionnel)

### Google Analytics

1. Créer une propriété sur [analytics.google.com](https://analytics.google.com)
2. Copier le code de suivi
3. Ajouter avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔧 Maintenance

### Mettre à jour le contenu

```bash
# Modifier les fichiers localement
# Puis pousser les changements

git add .
git commit -m "Update: description des changements"
git push origin main
```

Les changements seront visibles sous 2-3 minutes.

### Ajouter un domaine personnalisé

1. Acheter un domaine (ex: Namecheap, Google Domains)
2. Dans les paramètres DNS, ajouter :
   - Type: `CNAME`
   - Name: `www`
   - Value: `USERNAME.github.io`
3. Dans GitHub Pages Settings, ajouter le custom domain
4. Activer "Enforce HTTPS"

---

## 🐛 Dépannage

### Le site ne s'affiche pas

- Vérifier que le repo s'appelle `USERNAME.github.io`
- Vérifier que GitHub Pages est activé (Settings > Pages)
- Attendre 5-10 minutes après le premier push

### Les images ne s'affichent pas

- Vérifier les chemins : `assets/nom-image.jpg` (sensible à la casse)
- S'assurer que les images sont bien dans le dossier `assets/`
- Vérifier que les images sont poussées sur GitHub

### Le formulaire ne fonctionne pas

- Vérifier que l'ID Formspree est correct
- Tester d'abord sur localhost
- Vérifier la console du navigateur pour les erreurs

---

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et le modifier.

---

## 👨‍💻 Auteur

**Aka Kouadio Bonnaventure Vianney**

- 🌐 Portfolio: [vianney-aka.github.io](https://vianney-aka.github.io)
- 💼 LinkedIn: [linkedin.com/in/vianney-aka](https://linkedin.com/in/vianney-aka)
- 🐙 GitHub: [github.com/vianney-aka](https://github.com/vianney-aka)
- 📧 Email: contact@vianney-aka.com
- 📱 Téléphone: +225 07 89 81 43 08

---

## 🙏 Remerciements

- **UNESCO Impact'Lab** - Pour l'opportunité de travailler sur des projets à impact
- **TotalEnergies Foundation** - Pour la confiance accordée
- **Villa HOH** - Pour l'expérience en formation

---

## 📚 Ressources Utiles

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev - Performance](https://web.dev/performance/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Made with ❤️ in Côte d'Ivoire**

*Dernière mise à jour : Janvier 2025*
