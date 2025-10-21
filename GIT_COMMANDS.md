# 🔧 Commandes Git - Aide-Mémoire

Guide complet des commandes Git pour gérer votre portfolio.

---

## 🚀 Déploiement Initial

### 1. Configuration Git (Première fois uniquement)

```bash
# Configurer votre identité
git config --global user.name "Votre Nom"
git config --global user.email "votre-email@example.com"

# Vérifier la configuration
git config --list
```

### 2. Initialiser le Repository

```bash
# Naviguer vers le dossier du projet
cd d:/2025_FREELANCE/portfolio/CascadeProjects/windsurf-project

# Initialiser Git
git init

# Vérifier le statut
git status
```

### 3. Premier Commit

```bash
# Ajouter tous les fichiers
git add .

# Ou ajouter fichier par fichier
git add index.html
git add styles.css
git add script.js

# Créer le commit
git commit -m "Initial commit: Portfolio Vianney AKA"
```

### 4. Connecter à GitHub

```bash
# Ajouter le remote (REMPLACER votre-username)
git remote add origin https://github.com/votre-username/votre-username.github.io.git

# Vérifier le remote
git remote -v

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

---

## 📝 Workflow Quotidien

### Vérifier l'État

```bash
# Voir les fichiers modifiés
git status

# Voir les différences
git diff

# Voir les différences d'un fichier spécifique
git diff index.html
```

### Ajouter des Modifications

```bash
# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add index.html

# Ajouter plusieurs fichiers
git add index.html styles.css

# Ajouter tous les fichiers d'un dossier
git add assets/

# Ajouter tous les fichiers .html
git add *.html
```

### Créer un Commit

```bash
# Commit avec message
git commit -m "Update: ajout nouveau projet"

# Commit avec message détaillé
git commit -m "Update: ajout projet SpeedKDO" -m "- Ajout screenshot
- Mise à jour description
- Ajout tags Laravel"

# Modifier le dernier commit (avant push)
git commit --amend -m "Nouveau message"
```

### Pousser vers GitHub

```bash
# Pousser les changements
git push origin main

# Forcer le push (ATTENTION: dangereux)
git push -f origin main
```

---

## 📊 Consulter l'Historique

### Voir les Commits

```bash
# Historique complet
git log

# Historique compact
git log --oneline

# Historique avec graphe
git log --graph --oneline --all

# Derniers 5 commits
git log -5

# Commits d'un fichier spécifique
git log index.html

# Commits avec différences
git log -p
```

### Voir les Détails d'un Commit

```bash
# Détails du dernier commit
git show

# Détails d'un commit spécifique
git show abc1234

# Fichiers modifiés dans un commit
git show --name-only abc1234
```

---

## 🔄 Annuler des Modifications

### Avant le Commit

```bash
# Annuler modifications d'un fichier
git checkout -- index.html

# Annuler toutes les modifications
git checkout -- .

# Retirer un fichier de staging
git reset HEAD index.html

# Retirer tous les fichiers de staging
git reset HEAD
```

### Après le Commit (Avant Push)

```bash
# Annuler le dernier commit (garder modifications)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer modifications)
git reset --hard HEAD~1

# Annuler les 3 derniers commits
git reset --soft HEAD~3
```

### Après le Push

```bash
# Créer un commit qui annule un commit précédent
git revert abc1234

# Annuler le dernier commit
git revert HEAD
```

---

## 🌿 Gestion des Branches

### Créer et Utiliser des Branches

```bash
# Voir les branches
git branch

# Créer une nouvelle branche
git branch nouvelle-feature

# Changer de branche
git checkout nouvelle-feature

# Créer et changer de branche en une commande
git checkout -b nouvelle-feature

# Renommer la branche actuelle
git branch -m nouveau-nom
```

### Fusionner des Branches

```bash
# Revenir à main
git checkout main

# Fusionner une branche
git merge nouvelle-feature

# Supprimer une branche locale
git branch -d nouvelle-feature

# Forcer la suppression
git branch -D nouvelle-feature
```

---

## 🔍 Recherche et Inspection

### Rechercher dans le Code

```bash
# Rechercher un mot dans tous les fichiers
git grep "mot-clé"

# Rechercher dans un type de fichier
git grep "mot-clé" -- "*.html"

# Rechercher avec numéro de ligne
git grep -n "mot-clé"
```

### Voir les Différences

```bash
# Différences non stagées
git diff

# Différences stagées
git diff --staged

# Différences entre deux commits
git diff abc1234 def5678

# Différences d'un fichier entre deux commits
git diff abc1234 def5678 index.html
```

---

## 🗑️ Suppression et Nettoyage

### Supprimer des Fichiers

```bash
# Supprimer un fichier (et le stager)
git rm fichier.txt

# Supprimer un dossier
git rm -r dossier/

# Garder le fichier localement mais le retirer de Git
git rm --cached fichier.txt

# Supprimer tous les fichiers ignorés
git clean -fdX
```

### Nettoyer le Repository

```bash
# Voir ce qui serait supprimé
git clean -n

# Supprimer fichiers non trackés
git clean -f

# Supprimer fichiers et dossiers non trackés
git clean -fd
```

---

## 🔐 Gestion des Remotes

### Voir et Modifier les Remotes

```bash
# Voir les remotes
git remote -v

# Ajouter un remote
git remote add origin https://github.com/user/repo.git

# Changer l'URL d'un remote
git remote set-url origin https://github.com/user/nouveau-repo.git

# Renommer un remote
git remote rename origin upstream

# Supprimer un remote
git remote remove origin
```

### Synchroniser avec GitHub

```bash
# Récupérer les changements (sans fusionner)
git fetch origin

# Récupérer et fusionner
git pull origin main

# Pousser une branche
git push origin nom-branche

# Pousser toutes les branches
git push --all origin

# Pousser les tags
git push --tags
```

---

## 🏷️ Tags et Versions

### Créer des Tags

```bash
# Tag léger
git tag v1.0.0

# Tag annoté (recommandé)
git tag -a v1.0.0 -m "Version 1.0.0 - Release initiale"

# Tag sur un commit spécifique
git tag -a v1.0.0 abc1234 -m "Version 1.0.0"

# Voir tous les tags
git tag

# Voir détails d'un tag
git show v1.0.0
```

### Pousser et Supprimer des Tags

```bash
# Pousser un tag
git push origin v1.0.0

# Pousser tous les tags
git push --tags

# Supprimer un tag local
git tag -d v1.0.0

# Supprimer un tag distant
git push origin --delete v1.0.0
```

---

## 🔄 Stash (Mise de Côté Temporaire)

### Utiliser le Stash

```bash
# Mettre de côté les modifications
git stash

# Mettre de côté avec message
git stash save "WIP: nouvelle feature"

# Voir la liste des stash
git stash list

# Appliquer le dernier stash
git stash apply

# Appliquer et supprimer le dernier stash
git stash pop

# Appliquer un stash spécifique
git stash apply stash@{2}

# Supprimer un stash
git stash drop stash@{0}

# Supprimer tous les stash
git stash clear
```

---

## 🐛 Dépannage

### Problèmes Courants

#### Erreur : "fatal: not a git repository"
```bash
# Solution : Initialiser Git
git init
```

#### Erreur : "fatal: remote origin already exists"
```bash
# Solution : Supprimer et recréer le remote
git remote remove origin
git remote add origin https://github.com/user/repo.git
```

#### Erreur : "Updates were rejected"
```bash
# Solution : Pull d'abord
git pull origin main --rebase
git push origin main
```

#### Erreur : "Your branch is behind"
```bash
# Solution : Pull pour synchroniser
git pull origin main
```

#### Conflit de Fusion
```bash
# 1. Voir les fichiers en conflit
git status

# 2. Éditer les fichiers pour résoudre les conflits
# Chercher les marqueurs : <<<<<<<, =======, >>>>>>>

# 3. Marquer comme résolu
git add fichier-resolu.html

# 4. Finaliser la fusion
git commit -m "Resolve merge conflict"
```

---

## 📋 Commandes Utiles pour ce Portfolio

### Mise à Jour Typique

```bash
# 1. Vérifier l'état
git status

# 2. Ajouter les modifications
git add .

# 3. Commit
git commit -m "Update: description des changements"

# 4. Pousser
git push origin main
```

### Ajouter de Nouvelles Images

```bash
# Ajouter les images
git add assets/nouvelle-image.jpg

# Commit
git commit -m "Add: nouvelle image de projet"

# Pousser
git push origin main
```

### Corriger une Erreur

```bash
# Si pas encore commit
git checkout -- fichier-avec-erreur.html

# Si déjà commit mais pas push
git reset --soft HEAD~1
# Corriger l'erreur
git add .
git commit -m "Fix: correction de l'erreur"

# Si déjà push
# Corriger l'erreur
git add .
git commit -m "Fix: correction de l'erreur"
git push origin main
```

---

## 🎯 Bonnes Pratiques

### Messages de Commit

**Format recommandé** :
```
Type: Description courte (50 caractères max)

Description détaillée si nécessaire (72 caractères par ligne)
```

**Types** :
- `Add:` Ajout de nouvelle fonctionnalité
- `Update:` Mise à jour de contenu
- `Fix:` Correction de bug
- `Refactor:` Refactoring de code
- `Style:` Changements de style (CSS)
- `Docs:` Mise à jour documentation
- `Optimize:` Optimisation performance

**Exemples** :
```bash
git commit -m "Add: nouveau projet TotalEnergies"
git commit -m "Update: compétences Angular"
git commit -m "Fix: correction responsive mobile menu"
git commit -m "Optimize: compression images -40%"
git commit -m "Style: amélioration couleurs hero section"
```

### Fréquence des Commits

- ✅ **Commit souvent** : Petits commits fréquents
- ✅ **Commits atomiques** : Un changement logique par commit
- ✅ **Messages clairs** : Décrire ce qui a changé et pourquoi
- ❌ **Éviter** : Gros commits avec plein de changements

### Avant de Push

```bash
# Checklist
git status          # Vérifier les fichiers
git diff            # Vérifier les changements
git log --oneline   # Vérifier l'historique
```

---

## 🔗 Ressources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Oh Shit, Git!?!](https://ohshitgit.com) - Dépannage

---

## 🆘 Aide Rapide

```bash
# Aide générale
git help

# Aide sur une commande spécifique
git help commit
git commit --help

# Version de Git
git --version
```

---

**Besoin d'aide avec Git ?**
📧 contact@vianney-aka.com

**Made with ❤️ in Côte d'Ivoire**
