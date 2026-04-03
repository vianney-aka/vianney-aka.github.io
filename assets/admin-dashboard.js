// ===================================
// ADMIN DASHBOARD - Main Logic
// ===================================
const AdminDashboard = (function () {
  'use strict';

  const PASS_KEY = 'admin_session';
  function hashPass(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h;
    }
    return Math.abs(h).toString(36);
  }
  const VALID_HASH = hashPass('vianney2025');

  let dbReady = false;

  // ===================================
  // TOAST
  // ===================================
  function toast(msg, type) {
    type = type || 'info';
    var c = document.getElementById('toastContainer');
    if (!c) return;
    var t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 350);
    }, 3000);
  }

  // Safe wrapper for all async operations
  async function safeRun(fn, errMsg) {
    if (!dbReady) { toast('Base de données non prête. Rechargez la page.', 'error'); return false; }
    try {
      await fn();
      return true;
    } catch (err) {
      console.error(errMsg || 'Erreur', err);
      toast((errMsg || 'Erreur') + ': ' + (err.message || err), 'error');
      return false;
    }
  }

  // ===================================
  // AUTH
  // ===================================
  function initAuth() {
    var form = document.getElementById('loginForm');
    var errEl = document.getElementById('loginError');

    if (sessionStorage.getItem(PASS_KEY) === 'true') {
      showDashboard();
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var pass = document.getElementById('loginPassword').value;
      if (hashPass(pass) === VALID_HASH) {
        sessionStorage.setItem(PASS_KEY, 'true');
        showDashboard();
      } else {
        errEl.textContent = 'Mot de passe incorrect';
        document.getElementById('loginPassword').value = '';
      }
    });

    document.getElementById('logoutBtn').addEventListener('click', function () {
      sessionStorage.removeItem(PASS_KEY);
      location.reload();
    });
  }

  async function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';

    var overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);

    try {
      await PortfolioDB.init();
      dbReady = true;
      document.getElementById('dbStatus').textContent = 'SQLite ✓';
      console.log('[Admin] DB initialisée OK');
      loadCurrentSection();
    } catch (err) {
      console.error('[Admin] DB Init Error:', err);
      document.getElementById('dbStatus').textContent = 'SQLite ✗ Erreur';
      document.getElementById('dbStatus').style.color = 'var(--admin-accent)';
      toast('Erreur DB: ' + (err.message || err), 'error');
    }

    overlay.remove();
    initNavigation();
  }

  // ===================================
  // NAVIGATION
  // ===================================
  var currentSection = 'hero';

  function initNavigation() {
    document.querySelectorAll('.nav-item[data-section]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        switchSection(item.getAttribute('data-section'));
      });
    });
    var topBar = document.querySelector('.top-bar');
    if (topBar) {
      topBar.addEventListener('click', function () {
        if (window.innerWidth <= 768) document.getElementById('sidebar').classList.toggle('open');
      });
    }
  }

  function switchSection(section) {
    currentSection = section;
    document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
    var activeNav = document.querySelector('.nav-item[data-section="' + section + '"]');
    if (activeNav) activeNav.classList.add('active');

    var titles = { hero: 'Section Hero', projects: 'Projets', skills: 'Compétences', experience: 'Expérience', education: 'Formation', certifications: 'Certifications', contact: 'Contact', analytics: 'Analytics', cache: 'Gestion du Cache', data: 'Gestion des Données' };
    document.getElementById('sectionTitle').textContent = titles[section] || section;

    document.querySelectorAll('.panel').forEach(function (p) { p.style.display = 'none'; });
    var panel = document.getElementById('panel-' + section);
    if (panel) panel.style.display = 'block';

    loadCurrentSection();
    document.getElementById('sidebar').classList.remove('open');
  }

  function loadCurrentSection() {
    if (!dbReady) return;
    try {
      switch (currentSection) {
        case 'hero': loadHero(); break;
        case 'projects': loadProjects(); break;
        case 'skills': loadSkills(); break;
        case 'experience': loadExperiences(); break;
        case 'education': loadEducation(); break;
        case 'certifications': loadCertifications(); break;
        case 'contact': loadContact(); break;
        case 'analytics': loadAnalytics(); break;
        case 'cache': loadCacheInfo(); break;
        case 'data': loadDataInfo(); break;
      }
    } catch (err) {
      console.error('[Admin] Load section error:', err);
      toast('Erreur chargement section: ' + err.message, 'error');
    }
  }

  // ===================================
  // HERO
  // ===================================
  function loadHero() {
    var s = PortfolioDB.getAllSettings();
    document.getElementById('heroGreeting').value = s.hero_greeting || '';
    document.getElementById('heroTitle').value = s.hero_title || '';
    document.getElementById('heroSubtitle').value = s.hero_subtitle || '';
    document.getElementById('heroDescription').value = s.hero_description || '';
    document.getElementById('statExperience').value = s.stat_experience || '';
    document.getElementById('statYouth').value = s.stat_youth || '';
    document.getElementById('statUsers').value = s.stat_users || '';
    var photoPreview = document.getElementById('heroPhotoPreview');
    var photoInput = document.getElementById('heroPhoto');
    if (s.hero_photo && photoPreview) { photoPreview.src = s.hero_photo; photoPreview.style.display = 'block'; }
    if (s.hero_photo && photoInput) photoInput.value = s.hero_photo;
  }

  async function saveHero() {
    await safeRun(async function () {
      PortfolioDB.setSetting('hero_greeting', document.getElementById('heroGreeting').value);
      PortfolioDB.setSetting('hero_title', document.getElementById('heroTitle').value);
      PortfolioDB.setSetting('hero_subtitle', document.getElementById('heroSubtitle').value);
      PortfolioDB.setSetting('hero_description', document.getElementById('heroDescription').value);
      PortfolioDB.setSetting('stat_experience', document.getElementById('statExperience').value);
      PortfolioDB.setSetting('stat_youth', document.getElementById('statYouth').value);
      PortfolioDB.setSetting('stat_users', document.getElementById('statUsers').value);
      var photoVal = document.getElementById('heroPhoto').value;
      if (photoVal) PortfolioDB.setSetting('hero_photo', photoVal);
      await PortfolioDB.persist();
      toast('Hero sauvegardé !', 'success');
    }, 'Erreur sauvegarde Hero');
  }

  // ===================================
  // PROJECTS
  // ===================================
  function loadProjects() {
    var projects = PortfolioDB.getAll('projects');
    var container = document.getElementById('projectsList');
    var html = [];

    projects.forEach(function (p) {
      var tags = safeJSON(p.tags_json, []);
      var metrics = safeJSON(p.metrics_json, []);
      var imgSrc = p.image_url || '';
      var imgDisplay = imgSrc ? 'block' : 'none';

      html.push(
        '<div class="item-card" data-id="' + p.id + '">' +
          '<div class="item-card-header">' +
            '<h3>' + esc(p.title) + '</h3>' +
            '<span class="item-badge">#' + p.id + ' · ' + esc(p.category) + '</span>' +
          '</div>' +
          '<div class="form-row">' +
            '<div class="form-field"><label>Titre</label><input type="text" data-field="title"></div>' +
            '<div class="form-field"><label>Badge</label><input type="text" data-field="badge"></div>' +
          '</div>' +
          '<div class="form-row">' +
            '<div class="form-field"><label>Catégorie</label>' +
              '<select data-field="category">' +
                '<option value="laravel"' + (p.category==='laravel'?' selected':'') + '>Laravel</option>' +
                '<option value="moodle"' + (p.category==='moodle'?' selected':'') + '>Moodle</option>' +
                '<option value="python"' + (p.category==='python'?' selected':'') + '>Python</option>' +
                '<option value="wordpress"' + (p.category==='wordpress'?' selected':'') + '>WordPress</option>' +
              '</select></div>' +
            '<div class="form-field"><label>Type badge</label>' +
              '<select data-field="badge_type">' +
                '<option value="default"' + (p.badge_type==='default'?' selected':'') + '>Default</option>' +
                '<option value="award"' + (p.badge_type==='award'?' selected':'') + '>Award</option>' +
              '</select></div>' +
          '</div>' +
          '<div class="form-field"><label>Description</label><textarea data-field="description" rows="2"></textarea></div>' +
          '<div class="image-upload-zone">' +
            '<img class="img-preview" alt="Preview" style="display:' + imgDisplay + '">' +
            '<div class="image-upload-actions">' +
              '<button type="button" class="btn-upload-img">📷 Changer l\'image</button>' +
              '<input type="file" class="img-file-input" accept="image/*" style="display:none">' +
              '<span class="img-hint">ou collez une URL ci-dessous</span>' +
            '</div>' +
            '<input type="text" data-field="image_url" placeholder="URL ou upload ci-dessus">' +
          '</div>' +
          '<div class="form-field"><label>Lien URL</label><input type="text" data-field="link_url"></div>' +
          '<div class="form-field"><label>Tags (séparés par virgule)</label><input type="text" data-field="tags_json"></div>' +
          '<div class="form-field"><label>Métriques (JSON)</label><input type="text" data-field="metrics_json"></div>' +
          '<div class="form-field"><label>Ordre</label><input type="number" data-field="sort_order" style="width:80px"></div>' +
          '<div class="item-card-actions">' +
            '<button class="btn-item-save" onclick="AdminDashboard.saveProject(' + p.id + ')">Sauvegarder</button>' +
            '<button class="btn-item-delete" onclick="AdminDashboard.deleteProject(' + p.id + ')">Supprimer</button>' +
          '</div>' +
        '</div>'
      );
    });

    container.innerHTML = html.join('');

    // Set values programmatically (safe, no HTML escaping issues)
    projects.forEach(function (p) {
      var card = container.querySelector('[data-id="' + p.id + '"]');
      if (!card) return;
      var tags = safeJSON(p.tags_json, []);
      var metrics = safeJSON(p.metrics_json, []);
      setField(card, 'title', p.title);
      setField(card, 'badge', p.badge);
      setField(card, 'description', p.description);
      setField(card, 'image_url', p.image_url);
      setField(card, 'link_url', p.link_url);
      setField(card, 'tags_json', tags.join(', '));
      setField(card, 'metrics_json', JSON.stringify(metrics));
      setField(card, 'sort_order', p.sort_order);
      // Set image preview src
      var img = card.querySelector('.img-preview');
      if (img && p.image_url) img.src = p.image_url;
    });
  }

  function setField(card, fieldName, value) {
    var el = card.querySelector('[data-field="' + fieldName + '"]');
    if (el) el.value = (value !== null && value !== undefined) ? value : '';
  }

  async function saveProject(id) {
    await safeRun(async function () {
      var card = document.querySelector('.item-card[data-id="' + id + '"]');
      if (!card) throw new Error('Carte projet #' + id + ' introuvable');
      var data = {};
      card.querySelectorAll('[data-field]').forEach(function (el) {
        var f = el.getAttribute('data-field');
        if (f === 'tags_json') {
          data[f] = JSON.stringify(el.value.split(',').map(function(s){return s.trim();}).filter(Boolean));
        } else if (f === 'metrics_json') {
          try { data[f] = JSON.stringify(JSON.parse(el.value)); } catch(e) { data[f] = '[]'; }
        } else if (f === 'sort_order') {
          data[f] = parseInt(el.value) || 0;
        } else {
          data[f] = el.value;
        }
      });
      console.log('[Admin] Saving project', id, Object.keys(data));
      PortfolioDB.updateProject(id, data);
      await PortfolioDB.persist();
      toast('Projet sauvegardé !', 'success');
      loadProjects();
    }, 'Erreur sauvegarde projet');
  }

  async function deleteProject(id) {
    if (!confirm('Supprimer ce projet ?')) return;
    await safeRun(async function () {
      PortfolioDB.deleteById('projects', id);
      await PortfolioDB.persist();
      toast('Projet supprimé', 'info');
      loadProjects();
    }, 'Erreur suppression projet');
  }

  async function addProject() {
    await safeRun(async function () {
      PortfolioDB.insertProject({ title: 'Nouveau Projet', description: '', category: 'laravel', sort_order: 99 });
      await PortfolioDB.persist();
      toast('Projet ajouté', 'success');
      loadProjects();
    }, 'Erreur ajout projet');
  }

  // ===================================
  // SKILLS
  // ===================================
  function loadSkills() {
    var categories = PortfolioDB.getAll('skill_categories');
    var container = document.getElementById('skillsList');
    var html = [];

    categories.forEach(function (cat) {
      var skills = PortfolioDB.getSkillsByCategory(cat.id);
      var skillsHTML = skills.map(function (s) {
        return '<div class="skill-row" data-skill-id="' + s.id + '">' +
          '<input type="text" data-skill-field="name" placeholder="Nom">' +
          '<input type="number" data-skill-field="level" min="0" max="100" placeholder="%">' +
          '<button class="btn-remove-skill" onclick="AdminDashboard.deleteSkill(' + s.id + ',' + cat.id + ')">×</button>' +
        '</div>';
      }).join('');

      html.push(
        '<div class="item-card" data-cat-id="' + cat.id + '">' +
          '<div class="item-card-header"><h3>' + esc(cat.icon) + ' ' + esc(cat.name) + '</h3><span class="item-badge">ID #' + cat.id + '</span></div>' +
          '<div class="form-row">' +
            '<div class="form-field"><label>Nom catégorie</label><input type="text" data-cat-field="name"></div>' +
            '<div class="form-field"><label>Icône</label><input type="text" data-cat-field="icon"></div>' +
            '<div class="form-field"><label>Ordre</label><input type="number" data-cat-field="sort_order" style="width:80px"></div>' +
          '</div>' +
          '<label style="font-size:0.8125rem;font-weight:600;color:var(--admin-text2);display:block;margin:0.75rem 0 0.5rem;">Compétences</label>' +
          '<div class="skills-container" data-cat="' + cat.id + '">' + skillsHTML + '</div>' +
          '<button class="btn-add-skill" onclick="AdminDashboard.addSkill(' + cat.id + ')">+ Compétence</button>' +
          '<div class="item-card-actions">' +
            '<button class="btn-item-save" onclick="AdminDashboard.saveSkillCategory(' + cat.id + ')">Sauvegarder</button>' +
            '<button class="btn-item-delete" onclick="AdminDashboard.deleteSkillCategory(' + cat.id + ')">Supprimer catégorie</button>' +
          '</div>' +
        '</div>'
      );

      // We'll set values after innerHTML
    });

    container.innerHTML = html.join('');

    // Set values programmatically
    categories.forEach(function (cat) {
      var card = container.querySelector('[data-cat-id="' + cat.id + '"]');
      if (!card) return;
      var nameEl = card.querySelector('[data-cat-field="name"]');
      var iconEl = card.querySelector('[data-cat-field="icon"]');
      var orderEl = card.querySelector('[data-cat-field="sort_order"]');
      if (nameEl) nameEl.value = cat.name || '';
      if (iconEl) iconEl.value = cat.icon || '';
      if (orderEl) orderEl.value = cat.sort_order || 0;

      var skills = PortfolioDB.getSkillsByCategory(cat.id);
      skills.forEach(function (s) {
        var row = card.querySelector('[data-skill-id="' + s.id + '"]');
        if (!row) return;
        var n = row.querySelector('[data-skill-field="name"]');
        var l = row.querySelector('[data-skill-field="level"]');
        if (n) n.value = s.name || '';
        if (l) l.value = s.level || 80;
      });
    });
  }

  async function saveSkillCategory(catId) {
    await safeRun(async function () {
      var card = document.querySelector('.item-card[data-cat-id="' + catId + '"]');
      if (!card) throw new Error('Catégorie introuvable');
      var catData = {};
      card.querySelectorAll('[data-cat-field]').forEach(function (el) {
        var f = el.getAttribute('data-cat-field');
        catData[f] = f === 'sort_order' ? (parseInt(el.value) || 0) : el.value;
      });
      PortfolioDB.updateSkillCategory(catId, catData);
      card.querySelectorAll('.skill-row').forEach(function (row) {
        var sid = parseInt(row.getAttribute('data-skill-id'));
        var name = row.querySelector('[data-skill-field="name"]').value;
        var level = parseInt(row.querySelector('[data-skill-field="level"]').value) || 80;
        if (sid) PortfolioDB.updateSkill(sid, { name: name, level: level });
      });
      await PortfolioDB.persist();
      toast('Catégorie sauvegardée !', 'success');
      loadSkills();
    }, 'Erreur sauvegarde compétences');
  }

  async function addSkillCategory() {
    await safeRun(async function () {
      PortfolioDB.insertSkillCategory({ name: 'Nouvelle Catégorie', icon: '📦', sort_order: 99 });
      await PortfolioDB.persist();
      toast('Catégorie ajoutée', 'success');
      loadSkills();
    }, 'Erreur ajout catégorie');
  }

  async function deleteSkillCategory(catId) {
    if (!confirm('Supprimer cette catégorie et toutes ses compétences ?')) return;
    await safeRun(async function () {
      var skills = PortfolioDB.getSkillsByCategory(catId);
      skills.forEach(function (s) { PortfolioDB.deleteById('skills', s.id); });
      PortfolioDB.deleteById('skill_categories', catId);
      await PortfolioDB.persist();
      toast('Catégorie supprimée', 'info');
      loadSkills();
    }, 'Erreur suppression catégorie');
  }

  async function addSkill(catId) {
    await safeRun(async function () {
      PortfolioDB.insertSkill({ category_id: catId, name: 'Nouvelle compétence', level: 80 });
      await PortfolioDB.persist();
      loadSkills();
    }, 'Erreur ajout compétence');
  }

  async function deleteSkill(skillId) {
    await safeRun(async function () {
      PortfolioDB.deleteById('skills', skillId);
      await PortfolioDB.persist();
      loadSkills();
    }, 'Erreur suppression compétence');
  }

  // ===================================
  // EXPERIENCES
  // ===================================
  function loadExperiences() {
    var exps = PortfolioDB.getAll('experiences');
    var container = document.getElementById('experienceList');
    var html = [];

    exps.forEach(function (e) {
      var items = safeJSON(e.items_json, []);
      html.push(
        '<div class="item-card" data-id="' + e.id + '">' +
          '<div class="item-card-header"><h3>' + esc(e.title) + '</h3><span class="item-badge">' + esc(e.date_range) + '</span></div>' +
          '<div class="form-row">' +
            '<div class="form-field"><label>Période</label><input type="text" data-field="date_range"></div>' +
            '<div class="form-field"><label>Ordre</label><input type="number" data-field="sort_order" style="width:80px"></div>' +
          '</div>' +
          '<div class="form-field"><label>Titre du poste</label><input type="text" data-field="title"></div>' +
          '<div class="form-field"><label>Entreprise</label><input type="text" data-field="company"></div>' +
          '<div class="form-field"><label>Missions (une par ligne)</label><textarea data-field="items_json" rows="4"></textarea></div>' +
          '<div class="item-card-actions">' +
            '<button class="btn-item-save" onclick="AdminDashboard.saveExperience(' + e.id + ')">Sauvegarder</button>' +
            '<button class="btn-item-delete" onclick="AdminDashboard.deleteExperience(' + e.id + ')">Supprimer</button>' +
          '</div>' +
        '</div>'
      );
    });

    container.innerHTML = html.join('');

    exps.forEach(function (e) {
      var card = container.querySelector('[data-id="' + e.id + '"]');
      if (!card) return;
      var items = safeJSON(e.items_json, []);
      setField(card, 'date_range', e.date_range);
      setField(card, 'sort_order', e.sort_order);
      setField(card, 'title', e.title);
      setField(card, 'company', e.company);
      setField(card, 'items_json', items.join('\n'));
    });
  }

  async function saveExperience(id) {
    await safeRun(async function () {
      var card = document.querySelector('.item-card[data-id="' + id + '"]');
      if (!card) throw new Error('Carte introuvable');
      var data = {};
      card.querySelectorAll('[data-field]').forEach(function (el) {
        var f = el.getAttribute('data-field');
        if (f === 'items_json') {
          data[f] = JSON.stringify(el.value.split('\n').map(function(s){return s.trim();}).filter(Boolean));
        } else if (f === 'sort_order') {
          data[f] = parseInt(el.value) || 0;
        } else {
          data[f] = el.value;
        }
      });
      PortfolioDB.updateExperience(id, data);
      await PortfolioDB.persist();
      toast('Expérience sauvegardée !', 'success');
      loadExperiences();
    }, 'Erreur sauvegarde expérience');
  }

  async function deleteExperience(id) {
    if (!confirm('Supprimer cette expérience ?')) return;
    await safeRun(async function () {
      PortfolioDB.deleteById('experiences', id);
      await PortfolioDB.persist();
      toast('Expérience supprimée', 'info');
      loadExperiences();
    }, 'Erreur suppression expérience');
  }

  async function addExperience() {
    await safeRun(async function () {
      PortfolioDB.insertExperience({ date_range: 'Date', title: 'Nouveau Poste', company: '', items_json: '[]', sort_order: 99 });
      await PortfolioDB.persist();
      toast('Expérience ajoutée', 'success');
      loadExperiences();
    }, 'Erreur ajout expérience');
  }

  // ===================================
  // EDUCATION
  // ===================================
  function loadEducation() {
    var edus = PortfolioDB.getAll('education');
    var container = document.getElementById('educationList');
    var html = [];

    edus.forEach(function (e) {
      html.push(
        '<div class="item-card" data-id="' + e.id + '">' +
          '<div class="item-card-header"><h3>' + esc(e.title) + '</h3><span class="item-badge">' + esc(e.date_range) + '</span></div>' +
          '<div class="form-row">' +
            '<div class="form-field"><label>Période</label><input type="text" data-field="date_range"></div>' +
            '<div class="form-field"><label>Ordre</label><input type="number" data-field="sort_order" style="width:80px"></div>' +
          '</div>' +
          '<div class="form-field"><label>Diplôme</label><input type="text" data-field="title"></div>' +
          '<div class="form-field"><label>École</label><input type="text" data-field="school"></div>' +
          '<div class="form-field"><label>Description</label><textarea data-field="description" rows="2"></textarea></div>' +
          '<div class="item-card-actions">' +
            '<button class="btn-item-save" onclick="AdminDashboard.saveEducation(' + e.id + ')">Sauvegarder</button>' +
            '<button class="btn-item-delete" onclick="AdminDashboard.deleteEducation(' + e.id + ')">Supprimer</button>' +
          '</div>' +
        '</div>'
      );
    });

    container.innerHTML = html.join('');

    edus.forEach(function (e) {
      var card = container.querySelector('[data-id="' + e.id + '"]');
      if (!card) return;
      setField(card, 'date_range', e.date_range);
      setField(card, 'sort_order', e.sort_order);
      setField(card, 'title', e.title);
      setField(card, 'school', e.school);
      setField(card, 'description', e.description);
    });
  }

  async function saveEducation(id) {
    await safeRun(async function () {
      var card = document.querySelector('.item-card[data-id="' + id + '"]');
      if (!card) throw new Error('Carte introuvable');
      var data = {};
      card.querySelectorAll('[data-field]').forEach(function (el) {
        var f = el.getAttribute('data-field');
        data[f] = f === 'sort_order' ? (parseInt(el.value) || 0) : el.value;
      });
      PortfolioDB.updateEducation(id, data);
      await PortfolioDB.persist();
      toast('Formation sauvegardée !', 'success');
      loadEducation();
    }, 'Erreur sauvegarde formation');
  }

  async function deleteEducation(id) {
    if (!confirm('Supprimer cette formation ?')) return;
    await safeRun(async function () {
      PortfolioDB.deleteById('education', id);
      await PortfolioDB.persist();
      toast('Formation supprimée', 'info');
      loadEducation();
    }, 'Erreur suppression formation');
  }

  async function addEducation() {
    await safeRun(async function () {
      PortfolioDB.insertEducation({ date_range: 'Date', title: 'Nouveau Diplôme', school: '', description: '', sort_order: 99 });
      await PortfolioDB.persist();
      toast('Formation ajoutée', 'success');
      loadEducation();
    }, 'Erreur ajout formation');
  }

  // ===================================
  // CERTIFICATIONS
  // ===================================
  function loadCertifications() {
    var certs = PortfolioDB.getAll('certifications');
    var container = document.getElementById('certificationsList');
    var html = [];

    certs.forEach(function (c) {
      html.push(
        '<div class="item-card" data-id="' + c.id + '">' +
          '<div class="form-row" style="align-items:end;">' +
            '<div class="form-field" style="flex:1;"><label>Certification</label><input type="text" data-field="name"></div>' +
            '<div class="form-field" style="width:80px;"><label>Ordre</label><input type="number" data-field="sort_order"></div>' +
          '</div>' +
          '<div class="item-card-actions">' +
            '<button class="btn-item-save" onclick="AdminDashboard.saveCertification(' + c.id + ')">Sauvegarder</button>' +
            '<button class="btn-item-delete" onclick="AdminDashboard.deleteCertification(' + c.id + ')">Supprimer</button>' +
          '</div>' +
        '</div>'
      );
    });

    container.innerHTML = html.join('');

    certs.forEach(function (c) {
      var card = container.querySelector('[data-id="' + c.id + '"]');
      if (!card) return;
      setField(card, 'name', c.name);
      setField(card, 'sort_order', c.sort_order);
    });
  }

  async function saveCertification(id) {
    await safeRun(async function () {
      var card = document.querySelector('.item-card[data-id="' + id + '"]');
      if (!card) throw new Error('Carte introuvable');
      var name = card.querySelector('[data-field="name"]').value;
      var sort_order = parseInt(card.querySelector('[data-field="sort_order"]').value) || 0;
      PortfolioDB.updateCertification(id, { name: name, sort_order: sort_order });
      await PortfolioDB.persist();
      toast('Certification sauvegardée !', 'success');
      loadCertifications();
    }, 'Erreur sauvegarde certification');
  }

  async function deleteCertification(id) {
    if (!confirm('Supprimer cette certification ?')) return;
    await safeRun(async function () {
      PortfolioDB.deleteById('certifications', id);
      await PortfolioDB.persist();
      toast('Certification supprimée', 'info');
      loadCertifications();
    }, 'Erreur suppression certification');
  }

  async function addCertification() {
    await safeRun(async function () {
      PortfolioDB.insertCertification({ name: 'Nouvelle certification', sort_order: 99 });
      await PortfolioDB.persist();
      toast('Certification ajoutée', 'success');
      loadCertifications();
    }, 'Erreur ajout certification');
  }

  // ===================================
  // CONTACT
  // ===================================
  function loadContact() {
    var s = PortfolioDB.getAllSettings();
    document.getElementById('contactEmail').value = s.contact_email || '';
    document.getElementById('contactPhone1').value = s.contact_phone1 || '';
    document.getElementById('contactPhone2').value = s.contact_phone2 || '';
    document.getElementById('contactLocation').value = s.contact_location || '';
    document.getElementById('footerDescription').value = s.footer_description || '';
  }

  async function saveContact() {
    await safeRun(async function () {
      PortfolioDB.setSetting('contact_email', document.getElementById('contactEmail').value);
      PortfolioDB.setSetting('contact_phone1', document.getElementById('contactPhone1').value);
      PortfolioDB.setSetting('contact_phone2', document.getElementById('contactPhone2').value);
      PortfolioDB.setSetting('contact_location', document.getElementById('contactLocation').value);
      PortfolioDB.setSetting('footer_description', document.getElementById('footerDescription').value);
      await PortfolioDB.persist();
      toast('Contact sauvegardé !', 'success');
    }, 'Erreur sauvegarde contact');
  }

  // ===================================
  // DATA MANAGEMENT
  // ===================================
  function loadDataInfo() {
    try {
      var info = {
        projects: PortfolioDB.getAll('projects').length,
        skill_categories: PortfolioDB.getAll('skill_categories').length,
        skills: PortfolioDB.getAll('skills').length,
        experiences: PortfolioDB.getAll('experiences').length,
        education: PortfolioDB.getAll('education').length,
        certifications: PortfolioDB.getAll('certifications').length,
        settings: Object.keys(PortfolioDB.getAllSettings()).length
      };
      document.getElementById('dbInfo').textContent =
        'Base de données SQLite (sql.js / WASM)\n' +
        'Stockage: IndexedDB + localStorage sync\n\n' +
        'Projets: ' + info.projects + '\n' +
        'Catégories compétences: ' + info.skill_categories + '\n' +
        'Compétences: ' + info.skills + '\n' +
        'Expériences: ' + info.experiences + '\n' +
        'Formations: ' + info.education + '\n' +
        'Certifications: ' + info.certifications + '\n' +
        'Paramètres: ' + info.settings + '\n' +
        'DB Ready: ' + dbReady;
    } catch (err) {
      document.getElementById('dbInfo').textContent = 'Erreur: ' + err.message;
    }
  }

  function exportData() {
    try {
      var json = PortfolioDB.exportJSON();
      var blob = new Blob([json], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio_data_' + new Date().toISOString().slice(0,10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      toast('Données exportées !', 'success');
    } catch (err) { toast('Erreur export: ' + err.message, 'error'); }
  }

  function initImport() {
    document.getElementById('importFile').addEventListener('change', async function (e) {
      var file = e.target.files[0];
      if (!file) return;
      try {
        var text = await file.text();
        PortfolioDB.importJSON(text);
        await PortfolioDB.persist();
        toast('Données importées avec succès !', 'success');
        loadCurrentSection();
      } catch (err) {
        toast('Erreur import: ' + err.message, 'error');
      }
      e.target.value = '';
    });
  }

  async function resetData() {
    if (!confirm('Réinitialiser TOUTES les données ? Cette action est irréversible.')) return;
    await safeRun(async function () {
      await PortfolioDB.resetDatabase();
      toast('Données réinitialisées', 'info');
      loadCurrentSection();
    }, 'Erreur réinitialisation');
  }

  async function syncData() {
    try {
      PortfolioDB.syncToLocalStorage();
      toast('Données synchronisées vers le site public !', 'success');
    } catch (err) { toast('Erreur sync: ' + err.message, 'error'); }
  }

  // ===================================
  // ANALYTICS
  // ===================================
  var ANALYTICS_KEY = 'portfolio_analytics';

  function getAnalyticsData() {
    try {
      var raw = localStorage.getItem(ANALYTICS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function loadAnalytics() {
    var data = getAnalyticsData();
    if (!data || !data.days) {
      document.getElementById('analyticsSummary').innerHTML =
        '<div class="stat-card" style="grid-column:1/-1;text-align:center;padding:3rem;">' +
        '<div class="stat-icon">📊</div>' +
        '<p style="color:var(--admin-text2);margin-top:0.5rem;">Aucune donnée analytics. Visitez le site public pour commencer le suivi.</p></div>';
      return;
    }
    renderSummaryCards(data);
    renderViewsChart(data);
    renderDevicesChart(data);
    renderBrowsersChart(data);
    renderReferrers(data);
    renderSections(data);
    renderHoursChart(data);
    renderEngagement(data);
  }

  function getLast30Days() {
    var days = [];
    var now = new Date();
    for (var i = 29; i >= 0; i--) {
      var d = new Date(now);
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  }

  function renderSummaryCards(data) {
    var days = Object.keys(data.days).sort();
    var todayKey = new Date().toISOString().slice(0, 10);
    var yesterdayKey = (function () { var d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })();

    var totalViews = 0, totalVisitors = 0, totalSessions = 0;
    days.forEach(function (d) {
      var day = data.days[d];
      totalViews += day.views || 0;
      totalVisitors += (day.visitors ? day.visitors.length : 0);
      totalSessions += (day.sessions ? day.sessions.length : 0);
    });

    var todayData = data.days[todayKey] || { views: 0, visitors: [] };
    var yesterdayData = data.days[yesterdayKey] || { views: 0, visitors: [] };
    var viewsTrend = todayData.views - (yesterdayData.views || 0);
    var trendClass = viewsTrend > 0 ? 'up' : (viewsTrend < 0 ? 'down' : 'neutral');
    var trendText = viewsTrend > 0 ? ('▲ +' + viewsTrend) : (viewsTrend < 0 ? ('▼ ' + viewsTrend) : '— stable');

    // Avg time on page
    var totalTime = 0, timeDays = 0;
    days.forEach(function (d) {
      if (data.days[d].totalTime) { totalTime += data.days[d].totalTime; timeDays++; }
    });
    var avgTime = timeDays > 0 ? Math.round(totalTime / totalSessions) : 0;
    var avgTimeStr = avgTime >= 60 ? Math.floor(avgTime / 60) + 'min ' + (avgTime % 60) + 's' : avgTime + 's';

    document.getElementById('analyticsSummary').innerHTML =
      '<div class="stat-card"><div class="stat-icon">👁</div><div class="stat-value">' + totalViews + '</div><div class="stat-label">Vues totales</div><div class="stat-trend ' + trendClass + '">' + trendText + ' aujourd\'hui</div></div>' +
      '<div class="stat-card"><div class="stat-icon">👤</div><div class="stat-value">' + totalVisitors + '</div><div class="stat-label">Visiteurs</div><div class="stat-trend neutral">' + (todayData.visitors ? todayData.visitors.length : 0) + ' aujourd\'hui</div></div>' +
      '<div class="stat-card"><div class="stat-icon">⏱</div><div class="stat-value">' + avgTimeStr + '</div><div class="stat-label">Temps moyen</div><div class="stat-trend neutral">par session</div></div>' +
      '<div class="stat-card"><div class="stat-icon">📅</div><div class="stat-value">' + days.length + '</div><div class="stat-label">Jours suivis</div><div class="stat-trend neutral">' + todayData.views + ' vues aujourd\'hui</div></div>';
  }

  // roundRect polyfill for older browsers
  if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radii) {
      var r = (Array.isArray(radii) ? radii[0] : radii) || 0;
      this.moveTo(x + r, y);
      this.lineTo(x + w - r, y);
      this.quadraticCurveTo(x + w, y, x + w, y + r);
      this.lineTo(x + w, y + h);
      this.lineTo(x, y + h);
      this.lineTo(x, y + r);
      this.quadraticCurveTo(x, y, x + r, y);
      this.closePath();
    };
  }

  // Mini canvas chart library (no external dependency)
  function drawBarChart(canvasId, labels, values, color) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = canvas.height * dpr;
    canvas.style.width = rect.width + 'px';
    ctx.scale(dpr, dpr);
    var W = rect.width, H = canvas.height / dpr;
    ctx.clearRect(0, 0, W, H);
    if (!values.length) return;

    var max = Math.max.apply(null, values) || 1;
    var barW = Math.max(2, (W - 60) / values.length - 2);
    var padding = { top: 10, bottom: 30, left: 40, right: 10 };
    var chartW = W - padding.left - padding.right;
    var chartH = H - padding.top - padding.bottom;
    barW = Math.min(barW, chartW / values.length - 2);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (var g = 0; g <= 4; g++) {
      var gy = padding.top + (chartH / 4) * g;
      ctx.beginPath(); ctx.moveTo(padding.left, gy); ctx.lineTo(W - padding.right, gy); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(max - (max / 4) * g), padding.left - 6, gy + 4);
    }

    // Bars
    values.forEach(function (v, i) {
      var x = padding.left + (chartW / values.length) * i + 1;
      var barH = (v / max) * chartH;
      var y = padding.top + chartH - barH;

      var grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, color || '#2d7bff');
      grad.addColorStop(1, color ? color + '80' : '#2d7bff60');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(barW, 2), barH, [3, 3, 0, 0]);
      ctx.fill();
    });

    // X labels (show every Nth)
    var step = Math.ceil(labels.length / 8);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px Inter, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach(function (l, i) {
      if (i % step === 0 || i === labels.length - 1) {
        var x = padding.left + (chartW / values.length) * i + barW / 2;
        ctx.fillText(l, x, H - 6);
      }
    });
  }

  function drawDonutChart(canvasId, labelsArr, valuesArr, colorsArr) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.parentElement.getBoundingClientRect();
    var size = Math.min(rect.width, 200);
    canvas.width = rect.width * dpr;
    canvas.height = size * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);
    var W = rect.width, H = size;
    ctx.clearRect(0, 0, W, H);

    var total = valuesArr.reduce(function (a, b) { return a + b; }, 0);
    if (!total) return;
    var cx = W / 3, cy = H / 2, r = Math.min(cx, cy) - 10;
    var startAngle = -Math.PI / 2;

    valuesArr.forEach(function (v, i) {
      var sliceAngle = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colorsArr[i % colorsArr.length];
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Inner circle for donut
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--admin-surface2').trim() || '#1a2332';
    ctx.fill();

    // Center text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(total, cx, cy + 6);

    // Legend
    ctx.textAlign = 'left';
    ctx.font = '11px Inter, sans-serif';
    var legendX = W * 0.62, legendY = 20;
    labelsArr.forEach(function (l, i) {
      ctx.fillStyle = colorsArr[i % colorsArr.length];
      ctx.fillRect(legendX, legendY + i * 22, 12, 12);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(l + ' (' + valuesArr[i] + ')', legendX + 18, legendY + i * 22 + 10);
    });
  }

  function renderViewsChart(data) {
    var last30 = getLast30Days();
    var labels = last30.map(function (d) { return d.slice(5); }); // MM-DD
    var values = last30.map(function (d) {
      return data.days[d] ? (data.days[d].views || 0) : 0;
    });
    drawBarChart('chartViews', labels, values, '#2d7bff');
  }

  function renderDevicesChart(data) {
    var d = data.devices || {};
    drawDonutChart('chartDevices',
      ['Desktop', 'Mobile', 'Tablet'],
      [d.desktop || 0, d.mobile || 0, d.tablet || 0],
      ['#2d7bff', '#00c853', '#ff6b35']
    );
  }

  function renderBrowsersChart(data) {
    var b = data.browsers || {};
    var sorted = Object.keys(b).sort(function (a, c) { return b[c] - b[a]; }).slice(0, 5);
    var colors = ['#2d7bff', '#00c853', '#ff6b35', '#a855f7', '#fbbf24'];
    drawDonutChart('chartBrowsers',
      sorted,
      sorted.map(function (k) { return b[k]; }),
      colors
    );
  }

  function renderReferrers(data) {
    var refs = data.referrers || {};
    var sorted = Object.keys(refs).sort(function (a, b) { return refs[b] - refs[a]; });
    var max = sorted.length ? refs[sorted[0]] : 1;
    var icons = { direct: '🔗', google: '🔍', linkedin: '💼', facebook: '👥', twitter: '🐦', github: '🐙', bing: '🔎', interne: '🏠' };
    var html = sorted.map(function (r) {
      var pct = Math.round((refs[r] / max) * 100);
      var icon = icons[r] || '🌐';
      return '<div class="analytics-row"><span class="row-label">' + icon + ' ' + esc(r) + '</span><div class="row-bar"><div class="row-bar-fill" style="width:' + pct + '%"></div></div><span class="row-value">' + refs[r] + '</span></div>';
    }).join('');
    document.getElementById('referrersList').innerHTML = html || '<p style="color:var(--admin-text2);font-size:0.8rem;">Aucune donnée</p>';
  }

  function renderSections(data) {
    var pages = data.pages || {};
    var sorted = Object.keys(pages).sort(function (a, b) { return pages[b] - pages[a]; });
    var max = sorted.length ? pages[sorted[0]] : 1;
    var names = { '#home': '🏠 Accueil', '#projects': '📁 Projets', '#skills': '⚡ Compétences', '#experience': '💼 Expérience', '#formation': '🎓 Formation', '#contact': '📧 Contact' };
    var html = sorted.map(function (s) {
      var pct = Math.round((pages[s] / max) * 100);
      return '<div class="analytics-row"><span class="row-label">' + (names[s] || s) + '</span><div class="row-bar"><div class="row-bar-fill" style="width:' + pct + '%"></div></div><span class="row-value">' + pages[s] + '</span></div>';
    }).join('');
    document.getElementById('sectionsList').innerHTML = html || '<p style="color:var(--admin-text2);font-size:0.8rem;">Aucune donnée</p>';
  }

  function renderHoursChart(data) {
    var hours = data.hours || {};
    var labels = [], values = [];
    for (var h = 0; h < 24; h++) {
      labels.push(h + 'h');
      values.push(hours[String(h)] || 0);
    }
    drawBarChart('chartHours', labels, values, '#00c853');
  }

  function renderEngagement(data) {
    var days = Object.keys(data.days);
    var totalBounce = 0, totalEngaged = 0, totalSessions = 0;
    days.forEach(function (d) {
      var day = data.days[d];
      totalBounce += day.bounce || 0;
      totalEngaged += day.engaged || 0;
      totalSessions += (day.sessions ? day.sessions.length : 0);
    });
    var bounceRate = totalSessions > 0 ? Math.round((totalBounce / totalSessions) * 100) : 0;
    var topDevice = 'desktop';
    var devMax = 0;
    if (data.devices) {
      Object.keys(data.devices).forEach(function (k) {
        if (data.devices[k] > devMax) { devMax = data.devices[k]; topDevice = k; }
      });
    }
    var deviceNames = { desktop: '🖥 Desktop', mobile: '📱 Mobile', tablet: '📟 Tablet' };
    document.getElementById('engagementStats').innerHTML =
      '<div class="analytics-row"><span class="row-label">Taux de rebond</span><span class="row-value">' + bounceRate + '%</span></div>' +
      '<div class="analytics-row"><span class="row-label">Sessions totales</span><span class="row-value">' + totalSessions + '</span></div>' +
      '<div class="analytics-row"><span class="row-label">Sessions engagées</span><span class="row-value">' + totalEngaged + '</span></div>' +
      '<div class="analytics-row"><span class="row-label">Appareil principal</span><span class="row-value">' + (deviceNames[topDevice] || topDevice) + '</span></div>' +
      '<div class="analytics-row"><span class="row-label">Jours actifs</span><span class="row-value">' + days.length + '</span></div>';
  }

  function exportAnalytics() {
    var data = getAnalyticsData();
    if (!data) { toast('Aucune donnée à exporter', 'error'); return; }
    var days = Object.keys(data.days).sort();
    var csv = 'Date,Vues,Visiteurs,Sessions,Bounce,TempsTotal\n';
    days.forEach(function (d) {
      var day = data.days[d];
      csv += d + ',' + (day.views || 0) + ',' + (day.visitors ? day.visitors.length : 0) + ',' + (day.sessions ? day.sessions.length : 0) + ',' + (day.bounce || 0) + ',' + (day.totalTime || 0) + '\n';
    });
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'analytics_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast('Analytics exportées !', 'success');
  }

  function clearAnalytics() {
    if (!confirm('Supprimer toutes les données analytics ?')) return;
    localStorage.removeItem(ANALYTICS_KEY);
    toast('Analytics réinitialisées', 'info');
    loadAnalytics();
  }

  // ===================================
  // CACHE MANAGEMENT
  // ===================================
  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getStorageSize(storage) {
    var total = 0;
    try {
      for (var i = 0; i < storage.length; i++) {
        var key = storage.key(i);
        total += (key.length + (storage.getItem(key) || '').length) * 2; // UTF-16
      }
    } catch (e) {}
    return total;
  }

  function loadCacheInfo() {
    var lsSize = getStorageSize(localStorage);
    var ssSize = getStorageSize(sessionStorage);

    document.getElementById('lsSize').textContent = formatBytes(lsSize);
    document.getElementById('ssSize').textContent = formatBytes(ssSize);

    // Estimate IndexedDB size
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then(function (est) {
        document.getElementById('idbSize').textContent = formatBytes(est.usage || 0) + ' / ' + formatBytes(est.quota || 0);
      }).catch(function () {
        document.getElementById('idbSize').textContent = 'N/A';
      });
    } else {
      document.getElementById('idbSize').textContent = 'N/A';
    }

    // Detail breakdown
    var details = 'localStorage (' + formatBytes(lsSize) + '):\n';
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var val = localStorage.getItem(key) || '';
      details += '  ' + key + ': ' + formatBytes(val.length * 2) + '\n';
    }
    details += '\nsessionStorage (' + formatBytes(ssSize) + '):\n';
    for (var j = 0; j < sessionStorage.length; j++) {
      var skey = sessionStorage.key(j);
      var sval = sessionStorage.getItem(skey) || '';
      details += '  ' + skey + ': ' + formatBytes(sval.length * 2) + '\n';
    }
    document.getElementById('cacheDetail').textContent = details;
  }

  function clearLocalStorage() {
    if (!confirm('Vider le localStorage ? Le site public perdra ses données dynamiques.')) return;
    var analyticsBackup = localStorage.getItem(ANALYTICS_KEY);
    localStorage.clear();
    // Keep analytics
    if (analyticsBackup) localStorage.setItem(ANALYTICS_KEY, analyticsBackup);
    toast('localStorage vidé (analytics conservées)', 'success');
    loadCacheInfo();
  }

  function clearIndexedDB() {
    if (!confirm('Vider IndexedDB ? La base de données sera recréée au prochain chargement.')) return;
    var dbName = 'PortfolioDB';
    var req = indexedDB.deleteDatabase(dbName);
    req.onsuccess = function () {
      toast('IndexedDB vidée. Rechargez la page.', 'success');
      loadCacheInfo();
    };
    req.onerror = function () {
      toast('Erreur suppression IndexedDB', 'error');
    };
  }

  function clearSession() {
    if (!confirm('Vider sessionStorage ? Vous serez déconnecté.')) return;
    sessionStorage.clear();
    toast('Session vidée. Redirection...', 'info');
    setTimeout(function () { location.reload(); }, 1000);
  }

  function clearAllCaches() {
    if (!confirm('PURGE COMPLÈTE : localStorage + IndexedDB + session.\nVous perdrez TOUTES les données locales. Continuer ?')) return;
    localStorage.clear();
    sessionStorage.clear();
    var dbName = 'PortfolioDB';
    var req = indexedDB.deleteDatabase(dbName);
    req.onsuccess = function () {
      toast('Purge complète. Rechargement...', 'success');
      setTimeout(function () { location.reload(); }, 1000);
    };
    req.onerror = function () {
      toast('Purge partielle (erreur IndexedDB)', 'error');
      setTimeout(function () { location.reload(); }, 1000);
    };
  }

  // ===================================
  // IMAGE UPLOAD + COMPRESSION
  // ===================================
  function compressImage(file, maxW, maxH, quality) {
    maxW = maxW || 800;
    maxH = maxH || 600;
    quality = quality || 0.75;
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
          var w = img.width, h = img.height;
          if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
          if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = function () { reject(new Error('Image invalide')); };
        img.src = ev.target.result;
      };
      reader.onerror = function () { reject(new Error('Lecture fichier échouée')); };
      reader.readAsDataURL(file);
    });
  }

  function initImageUploads() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-upload-img');
      if (!btn) return;
      var zone = btn.closest('.image-upload-zone') || btn.closest('.hero-photo-upload');
      if (!zone) return;
      var fileInput = zone.querySelector('.img-file-input');
      if (fileInput) fileInput.click();
    });

    document.addEventListener('change', async function (e) {
      if (!e.target.classList.contains('img-file-input')) return;
      var file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { toast('Fichier non valide', 'error'); return; }
      if (file.size > 5 * 1024 * 1024) { toast('Max 5 Mo', 'error'); return; }
      var zone = e.target.closest('.image-upload-zone') || e.target.closest('.hero-photo-upload');
      if (!zone) return;
      var preview = zone.querySelector('.img-preview');
      var urlInput = zone.querySelector('[data-field="image_url"]') || zone.querySelector('#heroPhoto');
      try {
        var dataUrl = await compressImage(file);
        if (preview) { preview.src = dataUrl; preview.style.display = 'block'; }
        if (urlInput) urlInput.value = dataUrl;
        toast('Image chargée ! Cliquez Sauvegarder.', 'success');
      } catch (err) {
        console.error('[Admin] Image error:', err);
        toast('Erreur image: ' + err.message, 'error');
      }
      e.target.value = '';
    });
  }

  // ===================================
  // UTILS
  // ===================================
  function esc(str) {
    if (str === null || str === undefined) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }

  function safeJSON(str, fallback) {
    try { return JSON.parse(str || '[]'); } catch (e) { return fallback; }
  }

  // ===================================
  // INIT
  // ===================================
  document.addEventListener('DOMContentLoaded', function () {
    initAuth();
    initImport();
    initImageUploads();
  });

  // ===================================
  // PUBLIC API
  // ===================================
  return {
    saveHero: saveHero,
    loadProjects: loadProjects, saveProject: saveProject, deleteProject: deleteProject, addProject: addProject,
    loadSkills: loadSkills, saveSkillCategory: saveSkillCategory, addSkillCategory: addSkillCategory, deleteSkillCategory: deleteSkillCategory, addSkill: addSkill, deleteSkill: deleteSkill,
    loadExperiences: loadExperiences, saveExperience: saveExperience, deleteExperience: deleteExperience, addExperience: addExperience,
    loadEducation: loadEducation, saveEducation: saveEducation, deleteEducation: deleteEducation, addEducation: addEducation,
    loadCertifications: loadCertifications, saveCertification: saveCertification, deleteCertification: deleteCertification, addCertification: addCertification,
    saveContact: saveContact,
    exportData: exportData, resetData: resetData, syncData: syncData,
    exportAnalytics: exportAnalytics, clearAnalytics: clearAnalytics,
    clearLocalStorage: clearLocalStorage, clearIndexedDB: clearIndexedDB, clearSession: clearSession, clearAllCaches: clearAllCaches
  };

})();
