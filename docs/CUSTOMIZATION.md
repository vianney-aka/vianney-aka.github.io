# 🎨 Guide de Personnalisation

Guide complet pour personnaliser votre portfolio selon vos besoins.

---

## 🎯 Informations Personnelles

### 1. Modifier le nom et titre

**Fichier** : `index.html`

```html
<!-- Ligne ~80 -->
<h1 class="hero-title">Votre Nom Complet</h1>
<h2 class="hero-subtitle">Votre Titre Professionnel</h2>
<p class="hero-description">
  Votre description personnalisée...
</p>
```

### 2. Mettre à jour les statistiques

```html
<!-- Ligne ~95 -->
<div class="hero-stats">
  <div class="stat"><span>X+</span>Ans d'expérience</div>
  <div class="stat"><span>XXX+</span>Projets réalisés</div>
  <div class="stat"><span>XXX+</span>Clients satisfaits</div>
</div>
```

### 3. Changer les informations de contact

```html
<!-- Section Contact - Ligne ~450 -->
<a href="mailto:votre-email@example.com">votre-email@example.com</a>
<a href="tel:+225XXXXXXXX">+225 XX XX XX XX XX</a>
```

---

## 🎨 Couleurs et Design

### Modifier la palette de couleurs

**Fichier** : `styles.css` (lignes 1-15)

```css
:root {
  /* Couleurs principales */
  --primary: #0066FF;      /* Votre couleur primaire */
  --secondary: #00C853;    /* Votre couleur secondaire */
  --dark: #0A0E27;         /* Couleur de fond */
  --accent: #FF6B6B;       /* Couleur d'accent */
  
  /* Nuances de gris */
  --gray-100: #F8F9FA;
  --gray-300: #DEE2E6;
  --gray-700: #495057;
}
```

### Exemples de palettes alternatives

#### Palette Tech Moderne
```css
--primary: #3B82F6;      /* Bleu moderne */
--secondary: #10B981;    /* Vert émeraude */
--accent: #F59E0B;       /* Orange */
```

#### Palette Minimaliste
```css
--primary: #000000;      /* Noir */
--secondary: #6366F1;    /* Indigo */
--accent: #EC4899;       /* Rose */
```

#### Palette Créative
```css
--primary: #8B5CF6;      /* Violet */
--secondary: #06B6D4;    /* Cyan */
--accent: #F97316;       /* Orange vif */
```

### Modifier les polices

```css
/* Dans :root */
--font-heading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;
```

**Polices alternatives** :
- **Modernes** : Montserrat, Raleway, Work Sans
- **Élégantes** : Playfair Display, Merriweather
- **Tech** : Roboto Mono, Fira Code, JetBrains Mono

**Changer dans** `index.html` (ligne ~30) :
```html
<link href="https://fonts.googleapis.com/css2?family=Votre-Police:wght@300;400;600;700&display=swap" rel="stylesheet">
```

---

## 📁 Projets

### Ajouter un nouveau projet

**Fichier** : `index.html` (Section Projects)

```html
<article class="project-card" data-category="votre-techno">
  <div class="project-image">
    <img src="assets/votre-projet.jpg" alt="Nom du Projet" loading="lazy">
    <a href="https://lien-projet.com" target="_blank" class="project-link">↗</a>
  </div>
  <div class="project-content">
    <h3>Nom du Projet<span class="badge">Badge</span></h3>
    <p>Description courte et impactante du projet...</p>
    <div class="metrics">
      <div><strong>XX%</strong> Métrique 1</div>
      <div><strong>XXX</strong> Métrique 2</div>
    </div>
    <div class="tags">
      <span>Tech1</span><span>Tech2</span><span>Tech3</span>
    </div>
  </div>
</article>
```

### Modifier les filtres de projets

```html
<!-- Ajouter un nouveau filtre -->
<button class="filter-btn" data-filter="react">React</button>
<button class="filter-btn" data-filter="nodejs">Node.js</button>
```

**Important** : Le `data-filter` doit correspondre au `data-category` des projets.

---

## 💼 Compétences

### Ajouter une nouvelle catégorie de compétences

**Fichier** : `index.html` (Section Skills)

```html
<div class="skill-category">
  <h3>🎯 Nom de la Catégorie</h3>
  <div class="skill-item">
    <span>Nom de la Compétence</span>
    <div class="skill-bar"><div style="width: 85%"></div></div>
  </div>
  <!-- Répéter pour chaque compétence -->
</div>
```

### Modifier les niveaux de compétence

Changer la valeur `width` dans `style="width: XX%"` :
- **Expert** : 90-100%
- **Avancé** : 75-89%
- **Intermédiaire** : 60-74%
- **Débutant** : 40-59%

### Ajouter des certifications

```html
<div class="cert-badges">
  <span>✓ Nom de la Certification</span>
  <span>✓ Autre Certification</span>
</div>
```

---

## 🕐 Parcours Professionnel

### Ajouter une nouvelle expérience

**Fichier** : `index.html` (Section Experience)

```html
<div class="timeline-item">
  <div class="timeline-date">YYYY - YYYY</div>
  <div class="timeline-content">
    <h3>Titre du Poste</h3>
    <h4>Nom de l'Entreprise</h4>
    <ul>
      <li>Réalisation clé 1 avec métrique</li>
      <li>Réalisation clé 2 avec impact</li>
      <li>Réalisation clé 3 avec résultat</li>
    </ul>
  </div>
</div>
```

### Ordre chronologique

Les expériences sont affichées de haut en bas. Mettez la plus récente en premier.

---

## 🔗 Liens Sociaux

### Modifier les liens sociaux

**Fichier** : `index.html` (Section Contact)

```html
<div class="social-links">
  <a href="https://github.com/votre-username" target="_blank" aria-label="GitHub">
    <!-- SVG GitHub -->
  </a>
  <a href="https://linkedin.com/in/votre-username" target="_blank" aria-label="LinkedIn">
    <!-- SVG LinkedIn -->
  </a>
</div>
```

### Ajouter d'autres réseaux sociaux

**Twitter** :
```html
<a href="https://twitter.com/votre-username" target="_blank" aria-label="Twitter">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
</a>
```

**Instagram** :
```html
<a href="https://instagram.com/votre-username" target="_blank" aria-label="Instagram">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
</a>
```

---

## 📧 Formulaire de Contact

### Configurer Formspree

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire
4. Dans `index.html` :

```html
<form action="https://formspree.io/f/VOTRE_ID_ICI" method="POST">
```

### Ajouter des champs au formulaire

```html
<!-- Champ téléphone -->
<div class="form-group">
  <input type="tel" name="phone" placeholder="Téléphone (optionnel)">
</div>

<!-- Champ entreprise -->
<div class="form-group">
  <input type="text" name="company" placeholder="Entreprise">
</div>

<!-- Select pour type de projet -->
<div class="form-group">
  <select name="project-type" required>
    <option value="">Type de projet</option>
    <option value="web">Site Web</option>
    <option value="mobile">Application Mobile</option>
    <option value="elearning">Plateforme E-Learning</option>
  </select>
</div>
```

---

## 🎭 Animations

### Désactiver les animations

Si vous préférez un site sans animations :

**Fichier** : `styles.css`

```css
/* Commenter ou supprimer */
@keyframes fadeInUp { ... }
@keyframes fadeInRight { ... }
@keyframes spin { ... }

/* Et dans script.js, commenter */
// observer.observe(el);
```

### Modifier la vitesse des animations

```css
:root {
  --transition: all 0.3s ease;  /* Changer 0.3s */
}
```

### Ajouter une animation personnalisée

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.mon-element {
  animation: slideIn 0.6s ease-out;
}
```

---

## 📱 Responsive

### Modifier les breakpoints

**Fichier** : `styles.css` (fin du fichier)

```css
/* Tablet */
@media (max-width: 768px) {
  /* Styles pour tablette */
}

/* Mobile */
@media (max-width: 480px) {
  /* Styles pour mobile */
}

/* Ajouter un breakpoint personnalisé */
@media (max-width: 1024px) {
  /* Styles pour petits laptops */
}
```

---

## 🌐 SEO et Meta Tags

### Modifier les meta tags

**Fichier** : `index.html` (dans `<head>`)

```html
<meta name="description" content="Votre description (150-160 caractères)">
<meta name="keywords" content="mot-clé1, mot-clé2, mot-clé3">

<!-- Open Graph -->
<meta property="og:title" content="Votre Nom - Titre">
<meta property="og:description" content="Votre description">
<meta property="og:image" content="https://votre-site.com/assets/og-image.jpg">
<meta property="og:url" content="https://votre-site.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Votre Nom - Titre">
<meta name="twitter:description" content="Votre description">
<meta name="twitter:image" content="https://votre-site.com/assets/og-image.jpg">
```

### Ajouter un sitemap.xml

Créer `sitemap.xml` à la racine :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-username.github.io/</loc>
    <lastmod>2025-01-21</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🎯 Fonctionnalités Avancées

### Ajouter un mode clair/sombre

Le toggle est déjà présent. Pour personnaliser :

**Fichier** : `script.js`

```javascript
// Modifier les couleurs du mode clair
if (!isDark) {
  document.body.style.background = '#FFFFFF';  // Votre couleur
  document.body.style.color = '#000000';       // Votre couleur
}
```

### Ajouter Google Analytics

**Fichier** : `index.html` (avant `</head>`)

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

### Ajouter un blog (simple)

Créer une nouvelle section :

```html
<section class="blog" id="blog">
  <div class="container">
    <div class="section-header">
      <span class="label">Blog</span>
      <h2>Articles Récents</h2>
    </div>
    <div class="blog-grid">
      <article class="blog-card">
        <h3>Titre de l'Article</h3>
        <p class="date">21 Janvier 2025</p>
        <p>Extrait de l'article...</p>
        <a href="article.html" class="btn btn-secondary">Lire plus</a>
      </article>
    </div>
  </div>
</section>
```

---

## 🔧 Optimisations

### Améliorer les performances

1. **Compresser les images** : Utiliser TinyPNG
2. **Lazy loading** : Déjà implémenté
3. **Minifier CSS/JS** : Utiliser des outils en ligne

### Minifier le CSS

Utiliser [CSS Minifier](https://cssminifier.com/) et créer `styles.min.css`

Dans `index.html` :
```html
<link rel="stylesheet" href="styles.min.css">
```

---

## 📝 Checklist de Personnalisation

- [ ] Nom et titre modifiés
- [ ] Description personnalisée
- [ ] Photo de profil ajoutée
- [ ] Projets mis à jour
- [ ] Compétences adaptées
- [ ] Expériences professionnelles ajoutées
- [ ] Informations de contact correctes
- [ ] Liens sociaux mis à jour
- [ ] Couleurs personnalisées (optionnel)
- [ ] Polices changées (optionnel)
- [ ] Formspree configuré
- [ ] Meta tags SEO complétés
- [ ] Favicon ajouté

---

**Besoin d'aide pour personnaliser ?**
📧 contact@vianney-aka.com

**Made with ❤️ in Côte d'Ivoire**
