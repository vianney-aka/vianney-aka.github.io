# 🌓 Différences Mode Clair vs Mode Sombre

## 📊 Variables CSS

### **Backgrounds**
| Variable | Mode Sombre | Mode Clair |
|----------|-------------|------------|
| `--bg-primary` | `#030915` (noir bleuté) | `#F6F9FF` (blanc bleuté) |
| `--bg-secondary` | `#07142B` (bleu très foncé) | `#ECF2FF` (bleu pastel) |
| `--bg-tertiary` | `#0F203C` (bleu foncé) | `#DEE7FF` (bleu clair) |
| `--bg-elevated` | `rgba(16, 30, 58, 0.92)` | `rgba(13, 35, 67, 0.04)` |
| `--bg-hover` | `rgba(30, 54, 94, 0.96)` | `rgba(13, 35, 67, 0.08)` |

### **Textes**
| Variable | Mode Sombre | Mode Clair |
|----------|-------------|------------|
| `--text-primary` | `#F5F8FF` (blanc) | `#0B1633` (bleu très foncé) |
| `--text-secondary` | `#CAD5FF` (bleu clair) | `#314064` (bleu moyen) |
| `--text-tertiary` | `#94A4D9` (bleu moyen) | `#556189` (bleu gris) |
| `--text-muted` | `#5E6E92` (gris bleuté) | `#8A94B5` (gris clair) |

### **Bordures**
| Variable | Mode Sombre | Mode Clair |
|----------|-------------|------------|
| `--border-primary` | `rgba(74, 138, 255, 0.25)` | `rgba(13, 35, 67, 0.12)` |
| `--border-secondary` | `rgba(255, 255, 255, 0.05)` | `rgba(13, 35, 67, 0.08)` |
| `--border-accent` | `rgba(45, 123, 255, 0.4)` | `rgba(45, 123, 255, 0.22)` |

### **Ombres**
| Variable | Mode Sombre | Mode Clair |
|----------|-------------|------------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.15)` | `0 2px 8px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.2)` | `0 4px 16px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.25)` | `0 8px 32px rgba(0,0,0,0.12)` |
| `--shadow-xl` | `0 12px 48px rgba(0,0,0,0.3)` | `0 12px 48px rgba(0,0,0,0.15)` |

---

## 🎨 Composants Spécifiques

### **Navigation**
- **Sombre** : `rgba(10, 14, 39, 0.8)` avec bordure bleu clair
- **Clair** : `rgba(255, 255, 255, 0.85)` avec bordure gris foncé
- **Logo span** : Vert secondaire en mode clair

### **Hero**
- **Sombre** : Dégradé noir bleuté avec overlays bleu/vert intenses
- **Clair** : Dégradé `#D5E5FF → #C5D9FF` avec overlays subtils
- **Titre** : Dégradé `#1F4FCC → #1FAB54` en mode clair
- **Stats** : Cards blanches avec bordure en mode clair

### **Projects**
- **Sombre** : Cards `rgba(15, 30, 58, 0.96)` avec bordure bleu clair
- **Clair** : Cards blanches `rgba(255, 255, 255, 0.98)` avec bordure gris
- **Filtres** : Fond blanc en mode clair, fond sombre en mode sombre
- **Badges** : Texte blanc sur fond coloré (tous modes)

### **Skills**
- **Sombre** : Dégradé `rgba(5, 12, 26, 1) → rgba(9, 24, 47, 0.95)`
- **Clair** : Dégradé `#DEE7FF → #F6F9FF`
- **Cards** : Blanches avec bordures en mode clair
- **Barres** : Fond gris clair `rgba(13, 35, 67, 0.08)` en mode clair

### **Experience**
- **Sombre** : Dégradé complexe noir/bleu
- **Clair** : Dégradé `#F6F9FF → #ECF2FF`
- **Timeline** : Ligne et points bleu/vert en mode clair
- **Cards** : Blanches avec ombres douces en mode clair

### **Contact**
- **Sombre** : Dégradé `rgba(4, 12, 28, 1) → rgba(9, 26, 52, 0.95)`
- **Clair** : Dégradé `#ECF2FF → #DEE7FF`
- **Inputs** : Fond blanc `rgba(255, 255, 255, 0.95)` avec bordure 2px en mode clair
- **Focus** : Box-shadow bleu `rgba(45, 123, 255, 0.15)` en mode clair

### **Footer**
- **Sombre** : `rgba(0, 0, 0, 0.3)` avec bordure blanche
- **Clair** : `rgba(236, 242, 255, 0.8)` avec bordure grise

### **Boutons**
- **Primary** : Identique (dégradé bleu), ombres plus légères en mode clair
- **Secondary** : Fond vert léger en mode clair, bordure renforcée

---

## 🔑 Principes de Design

### **Mode Sombre**
- Backgrounds très foncés (noir bleuté)
- Textes clairs (blanc/bleu clair)
- Bordures lumineuses (bleu/blanc)
- Ombres intenses pour profondeur
- Overlays colorés intenses

### **Mode Clair**
- Backgrounds pastels (bleu clair)
- Textes foncés (bleu foncé/moyen)
- Bordures grises subtiles
- Ombres légères pour élévation
- Overlays colorés subtils
- Cards blanches avec bordures définies

---

## 🎯 Contraste WCAG
- **Mode Sombre** : Ratio > 7:1 (AAA)
- **Mode Clair** : Ratio > 4.5:1 (AA)
