// ===================================
// ADMIN DASHBOARD - Main Logic
// ===================================
const AdminDashboard = (function () {
  'use strict';

  const PASS_KEY = 'admin_session';
  // Default password: 'vianney2025'
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
  function toast(msg, type = 'info') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 350);
    }, 3000);
  }

  // ===================================
  // AUTH
  // ===================================
  function initAuth() {
    const form = document.getElementById('loginForm');
    const errEl = document.getElementById('loginError');

    if (sessionStorage.getItem(PASS_KEY) === 'true') {
      showDashboard();
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('loginPassword').value;
      if (hashPass(pass) === VALID_HASH) {
        sessionStorage.setItem(PASS_KEY, 'true');
        showDashboard();
      } else {
        errEl.textContent = 'Mot de passe incorrect';
        document.getElementById('loginPassword').value = '';
      }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      sessionStorage.removeItem(PASS_KEY);
      location.reload();
    });
  }

  async function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';

    // Show loading
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);

    try {
      await PortfolioDB.init();
      dbReady = true;
      document.getElementById('dbStatus').textContent = 'SQLite ✓';
      loadCurrentSection();
    } catch (err) {
      console.error('DB Init Error:', err);
      document.getElementById('dbStatus').textContent = 'SQLite ✗';
      document.getElementById('dbStatus').style.color = 'var(--admin-accent)';
      toast('Erreur d\'initialisation de la base de données', 'error');
    }

    overlay.remove();
    initNavigation();
  }

  // ===================================
  // NAVIGATION
  // ===================================
  let currentSection = 'hero';

  function initNavigation() {
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        switchSection(section);
      });
    });

    // Mobile sidebar
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
      topBar.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          document.getElementById('sidebar').classList.toggle('open');
        }
      });
    }
  }

  function switchSection(section) {
    currentSection = section;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-section="${section}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Update title
    const titles = { hero: 'Section Hero', projects: 'Projets', skills: 'Compétences', experience: 'Expérience', education: 'Formation', certifications: 'Certifications', contact: 'Contact', data: 'Gestion des Données' };
    document.getElementById('sectionTitle').textContent = titles[section] || section;

    // Show panel
    document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
    const panel = document.getElementById(`panel-${section}`);
    if (panel) panel.style.display = 'block';

    // Load data
    loadCurrentSection();

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
  }

  function loadCurrentSection() {
    if (!dbReady) return;
    switch (currentSection) {
      case 'hero': loadHero(); break;
      case 'projects': loadProjects(); break;
      case 'skills': loadSkills(); break;
      case 'experience': loadExperiences(); break;
      case 'education': loadEducation(); break;
      case 'certifications': loadCertifications(); break;
      case 'contact': loadContact(); break;
      case 'data': loadDataInfo(); break;
    }
  }

  // ===================================
  // HERO
  // ===================================
  function loadHero() {
    const s = PortfolioDB.getAllSettings();
    document.getElementById('heroGreeting').value = s.hero_greeting || '';
    document.getElementById('heroTitle').value = s.hero_title || '';
    document.getElementById('heroSubtitle').value = s.hero_subtitle || '';
    document.getElementById('heroDescription').value = s.hero_description || '';
    document.getElementById('statExperience').value = s.stat_experience || '';
    document.getElementById('statYouth').value = s.stat_youth || '';
    document.getElementById('statUsers').value = s.stat_users || '';
    // Profile photo
    const photoPreview = document.getElementById('heroPhotoPreview');
    const photoInput = document.getElementById('heroPhoto');
    if (s.hero_photo && photoPreview) { photoPreview.src = s.hero_photo; photoPreview.style.display = 'block'; }
    if (s.hero_photo && photoInput) photoInput.value = s.hero_photo;
  }

  async function saveHero() {
    PortfolioDB.setSetting('hero_greeting', document.getElementById('heroGreeting').value);
    PortfolioDB.setSetting('hero_title', document.getElementById('heroTitle').value);
    PortfolioDB.setSetting('hero_subtitle', document.getElementById('heroSubtitle').value);
    PortfolioDB.setSetting('hero_description', document.getElementById('heroDescription').value);
    PortfolioDB.setSetting('stat_experience', document.getElementById('statExperience').value);
    PortfolioDB.setSetting('stat_youth', document.getElementById('statYouth').value);
    PortfolioDB.setSetting('stat_users', document.getElementById('statUsers').value);
    const photoVal = document.getElementById('heroPhoto').value;
    if (photoVal) PortfolioDB.setSetting('hero_photo', photoVal);
    await PortfolioDB.persist();
    toast('Hero sauvegardé !', 'success');
  }

  // ===================================
  // PROJECTS
  // ===================================
  function loadProjects() {
    const projects = PortfolioDB.getAll('projects');
    const container = document.getElementById('projectsList');
    container.innerHTML = '';

    projects.forEach(p => {
      const tags = safeJSON(p.tags_json, []);
      const metrics = safeJSON(p.metrics_json, []);

      container.innerHTML += `
        <div class="item-card" data-id="${p.id}">
          <div class="item-card-header">
            <h3>${esc(p.title)}</h3>
            <span class="item-badge">#${p.id} · ${esc(p.category)}</span>
          </div>
          <div class="form-row">
            <div class="form-field"><label>Titre</label><input type="text" value="${esc(p.title)}" data-field="title"></div>
            <div class="form-field"><label>Badge</label><input type="text" value="${esc(p.badge)}" data-field="badge"></div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Catégorie</label>
              <select data-field="category">
                <option value="laravel" ${p.category==='laravel'?'selected':''}>Laravel</option>
                <option value="moodle" ${p.category==='moodle'?'selected':''}>Moodle</option>
                <option value="python" ${p.category==='python'?'selected':''}>Python</option>
                <option value="wordpress" ${p.category==='wordpress'?'selected':''}>WordPress</option>
              </select>
            </div>
            <div class="form-field">
              <label>Type badge</label>
              <select data-field="badge_type">
                <option value="default" ${p.badge_type==='default'?'selected':''}>Default</option>
                <option value="award" ${p.badge_type==='award'?'selected':''}>Award</option>
              </select>
            </div>
          </div>
          <div class="form-field"><label>Description</label><textarea data-field="description" rows="2">${esc(p.description)}</textarea></div>
          <div class="image-upload-zone">
            <img class="img-preview" src="${esc(p.image_url)}" alt="Preview" style="display:${p.image_url ? 'block' : 'none'}">
            <div class="image-upload-actions">
              <button type="button" class="btn-upload-img">📷 Changer l'image</button>
              <input type="file" class="img-file-input" accept="image/*" style="display:none">
              <span class="img-hint">ou collez une URL ci-dessous</span>
            </div>
            <input type="text" value="${esc(p.image_url)}" data-field="image_url" placeholder="URL ou upload ci-dessus">
          </div>
          <div class="form-field"><label>Lien URL</label><input type="text" value="${esc(p.link_url)}" data-field="link_url"></div>
          <div class="form-field"><label>Tags (séparés par virgule)</label><input type="text" value="${tags.join(', ')}" data-field="tags_json"></div>
          <div class="form-field"><label>Métriques (JSON: [{label,value}])</label><input type="text" value='${JSON.stringify(metrics)}' data-field="metrics_json"></div>
          <div class="form-field"><label>Ordre</label><input type="number" value="${p.sort_order}" data-field="sort_order" style="width:80px"></div>
          <div class="item-card-actions">
            <button class="btn-item-save" onclick="AdminDashboard.saveProject(${p.id})">Sauvegarder</button>
            <button class="btn-item-delete" onclick="AdminDashboard.deleteProject(${p.id})">Supprimer</button>
          </div>
        </div>`;
    });
  }

  async function saveProject(id) {
    const card = document.querySelector(`.item-card[data-id="${id}"]`);
    if (!card) return;
    const data = {};
    card.querySelectorAll('[data-field]').forEach(el => {
      const f = el.getAttribute('data-field');
      if (f === 'tags_json') {
        data[f] = JSON.stringify(el.value.split(',').map(s => s.trim()).filter(Boolean));
      } else if (f === 'metrics_json') {
        try { data[f] = JSON.stringify(JSON.parse(el.value)); } catch { data[f] = '[]'; }
      } else if (f === 'sort_order') {
        data[f] = parseInt(el.value) || 0;
      } else {
        data[f] = el.tagName === 'TEXTAREA' ? el.value : el.value;
      }
    });
    PortfolioDB.updateProject(id, data);
    await PortfolioDB.persist();
    toast('Projet sauvegardé !', 'success');
    loadProjects();
  }

  async function deleteProject(id) {
    if (!confirm('Supprimer ce projet ?')) return;
    PortfolioDB.deleteById('projects', id);
    await PortfolioDB.persist();
    toast('Projet supprimé', 'info');
    loadProjects();
  }

  async function addProject() {
    PortfolioDB.insertProject({ title: 'Nouveau Projet', description: '', category: 'laravel', sort_order: 99 });
    await PortfolioDB.persist();
    toast('Projet ajouté', 'success');
    loadProjects();
  }

  // ===================================
  // SKILLS
  // ===================================
  function loadSkills() {
    const categories = PortfolioDB.getAll('skill_categories');
    const container = document.getElementById('skillsList');
    container.innerHTML = '';

    categories.forEach(cat => {
      const skills = PortfolioDB.getSkillsByCategory(cat.id);
      let skillsHTML = skills.map(s => `
        <div class="skill-row" data-skill-id="${s.id}">
          <input type="text" value="${esc(s.name)}" data-skill-field="name" placeholder="Nom">
          <input type="number" value="${s.level}" data-skill-field="level" min="0" max="100" placeholder="%">
          <button class="btn-remove-skill" onclick="AdminDashboard.deleteSkill(${s.id}, ${cat.id})">×</button>
        </div>
      `).join('');

      container.innerHTML += `
        <div class="item-card" data-cat-id="${cat.id}">
          <div class="item-card-header">
            <h3>${esc(cat.icon)} ${esc(cat.name)}</h3>
            <span class="item-badge">ID #${cat.id}</span>
          </div>
          <div class="form-row">
            <div class="form-field"><label>Nom catégorie</label><input type="text" value="${esc(cat.name)}" data-cat-field="name"></div>
            <div class="form-field"><label>Icône</label><input type="text" value="${esc(cat.icon)}" data-cat-field="icon"></div>
            <div class="form-field"><label>Ordre</label><input type="number" value="${cat.sort_order}" data-cat-field="sort_order" style="width:80px"></div>
          </div>
          <label style="font-size:0.8125rem;font-weight:600;color:var(--admin-text2);display:block;margin:0.75rem 0 0.5rem;">Compétences</label>
          <div class="skills-container" data-cat="${cat.id}">${skillsHTML}</div>
          <button class="btn-add-skill" onclick="AdminDashboard.addSkill(${cat.id})">+ Compétence</button>
          <div class="item-card-actions">
            <button class="btn-item-save" onclick="AdminDashboard.saveSkillCategory(${cat.id})">Sauvegarder</button>
            <button class="btn-item-delete" onclick="AdminDashboard.deleteSkillCategory(${cat.id})">Supprimer catégorie</button>
          </div>
        </div>`;
    });
  }

  async function saveSkillCategory(catId) {
    const card = document.querySelector(`.item-card[data-cat-id="${catId}"]`);
    if (!card) return;

    const catData = {};
    card.querySelectorAll('[data-cat-field]').forEach(el => {
      const f = el.getAttribute('data-cat-field');
      catData[f] = f === 'sort_order' ? (parseInt(el.value) || 0) : el.value;
    });
    PortfolioDB.updateSkillCategory(catId, catData);

    // Save individual skills
    card.querySelectorAll('.skill-row').forEach(row => {
      const sid = parseInt(row.getAttribute('data-skill-id'));
      const name = row.querySelector('[data-skill-field="name"]').value;
      const level = parseInt(row.querySelector('[data-skill-field="level"]').value) || 80;
      if (sid) PortfolioDB.updateSkill(sid, { name, level });
    });

    await PortfolioDB.persist();
    toast('Catégorie sauvegardée !', 'success');
    loadSkills();
  }

  async function addSkillCategory() {
    PortfolioDB.insertSkillCategory({ name: 'Nouvelle Catégorie', icon: '📦', sort_order: 99 });
    await PortfolioDB.persist();
    toast('Catégorie ajoutée', 'success');
    loadSkills();
  }

  async function deleteSkillCategory(catId) {
    if (!confirm('Supprimer cette catégorie et toutes ses compétences ?')) return;
    PortfolioDB.deleteById('skill_categories', catId);
    // Delete associated skills
    const skills = PortfolioDB.getSkillsByCategory(catId);
    skills.forEach(s => PortfolioDB.deleteById('skills', s.id));
    await PortfolioDB.persist();
    toast('Catégorie supprimée', 'info');
    loadSkills();
  }

  async function addSkill(catId) {
    PortfolioDB.insertSkill({ category_id: catId, name: 'Nouvelle compétence', level: 80 });
    await PortfolioDB.persist();
    loadSkills();
  }

  async function deleteSkill(skillId, catId) {
    PortfolioDB.deleteById('skills', skillId);
    await PortfolioDB.persist();
    loadSkills();
  }

  // ===================================
  // EXPERIENCES
  // ===================================
  function loadExperiences() {
    const exps = PortfolioDB.getAll('experiences');
    const container = document.getElementById('experienceList');
    container.innerHTML = '';

    exps.forEach(e => {
      const items = safeJSON(e.items_json, []);
      container.innerHTML += `
        <div class="item-card" data-id="${e.id}">
          <div class="item-card-header">
            <h3>${esc(e.title)}</h3>
            <span class="item-badge">${esc(e.date_range)}</span>
          </div>
          <div class="form-row">
            <div class="form-field"><label>Période</label><input type="text" value="${esc(e.date_range)}" data-field="date_range"></div>
            <div class="form-field"><label>Ordre</label><input type="number" value="${e.sort_order}" data-field="sort_order" style="width:80px"></div>
          </div>
          <div class="form-field"><label>Titre du poste</label><input type="text" value="${esc(e.title)}" data-field="title"></div>
          <div class="form-field"><label>Entreprise</label><input type="text" value="${esc(e.company)}" data-field="company"></div>
          <div class="form-field"><label>Missions (une par ligne)</label><textarea data-field="items_json" rows="4">${items.join('\n')}</textarea></div>
          <div class="item-card-actions">
            <button class="btn-item-save" onclick="AdminDashboard.saveExperience(${e.id})">Sauvegarder</button>
            <button class="btn-item-delete" onclick="AdminDashboard.deleteExperience(${e.id})">Supprimer</button>
          </div>
        </div>`;
    });
  }

  async function saveExperience(id) {
    const card = document.querySelector(`.item-card[data-id="${id}"]`);
    if (!card) return;
    const data = {};
    card.querySelectorAll('[data-field]').forEach(el => {
      const f = el.getAttribute('data-field');
      if (f === 'items_json') {
        data[f] = JSON.stringify(el.value.split('\n').map(s => s.trim()).filter(Boolean));
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
  }

  async function deleteExperience(id) {
    if (!confirm('Supprimer cette expérience ?')) return;
    PortfolioDB.deleteById('experiences', id);
    await PortfolioDB.persist();
    toast('Expérience supprimée', 'info');
    loadExperiences();
  }

  async function addExperience() {
    PortfolioDB.insertExperience({ date_range: 'Date', title: 'Nouveau Poste', company: '', items_json: '[]', sort_order: 99 });
    await PortfolioDB.persist();
    toast('Expérience ajoutée', 'success');
    loadExperiences();
  }

  // ===================================
  // EDUCATION
  // ===================================
  function loadEducation() {
    const edus = PortfolioDB.getAll('education');
    const container = document.getElementById('educationList');
    container.innerHTML = '';

    edus.forEach(e => {
      container.innerHTML += `
        <div class="item-card" data-id="${e.id}">
          <div class="item-card-header">
            <h3>${esc(e.title)}</h3>
            <span class="item-badge">${esc(e.date_range)}</span>
          </div>
          <div class="form-row">
            <div class="form-field"><label>Période / Établissement</label><input type="text" value="${esc(e.date_range)}" data-field="date_range"></div>
            <div class="form-field"><label>Ordre</label><input type="number" value="${e.sort_order}" data-field="sort_order" style="width:80px"></div>
          </div>
          <div class="form-field"><label>Diplôme</label><input type="text" value="${esc(e.title)}" data-field="title"></div>
          <div class="form-field"><label>École</label><input type="text" value="${esc(e.school)}" data-field="school"></div>
          <div class="form-field"><label>Description</label><textarea data-field="description" rows="2">${esc(e.description)}</textarea></div>
          <div class="item-card-actions">
            <button class="btn-item-save" onclick="AdminDashboard.saveEducation(${e.id})">Sauvegarder</button>
            <button class="btn-item-delete" onclick="AdminDashboard.deleteEducation(${e.id})">Supprimer</button>
          </div>
        </div>`;
    });
  }

  async function saveEducation(id) {
    const card = document.querySelector(`.item-card[data-id="${id}"]`);
    if (!card) return;
    const data = {};
    card.querySelectorAll('[data-field]').forEach(el => {
      const f = el.getAttribute('data-field');
      data[f] = f === 'sort_order' ? (parseInt(el.value) || 0) : el.value;
    });
    PortfolioDB.updateEducation(id, data);
    await PortfolioDB.persist();
    toast('Formation sauvegardée !', 'success');
    loadEducation();
  }

  async function deleteEducation(id) {
    if (!confirm('Supprimer cette formation ?')) return;
    PortfolioDB.deleteById('education', id);
    await PortfolioDB.persist();
    toast('Formation supprimée', 'info');
    loadEducation();
  }

  async function addEducation() {
    PortfolioDB.insertEducation({ date_range: 'Date', title: 'Nouveau Diplôme', school: '', description: '', sort_order: 99 });
    await PortfolioDB.persist();
    toast('Formation ajoutée', 'success');
    loadEducation();
  }

  // ===================================
  // CERTIFICATIONS
  // ===================================
  function loadCertifications() {
    const certs = PortfolioDB.getAll('certifications');
    const container = document.getElementById('certificationsList');
    container.innerHTML = '';

    certs.forEach(c => {
      container.innerHTML += `
        <div class="item-card" data-id="${c.id}">
          <div class="form-row" style="align-items:end;">
            <div class="form-field" style="flex:1;"><label>Certification</label><input type="text" value="${esc(c.name)}" data-field="name"></div>
            <div class="form-field" style="width:80px;"><label>Ordre</label><input type="number" value="${c.sort_order}" data-field="sort_order"></div>
          </div>
          <div class="item-card-actions">
            <button class="btn-item-save" onclick="AdminDashboard.saveCertification(${c.id})">Sauvegarder</button>
            <button class="btn-item-delete" onclick="AdminDashboard.deleteCertification(${c.id})">Supprimer</button>
          </div>
        </div>`;
    });
  }

  async function saveCertification(id) {
    const card = document.querySelector(`.item-card[data-id="${id}"]`);
    if (!card) return;
    const name = card.querySelector('[data-field="name"]').value;
    const sort_order = parseInt(card.querySelector('[data-field="sort_order"]').value) || 0;
    PortfolioDB.updateCertification(id, { name, sort_order });
    await PortfolioDB.persist();
    toast('Certification sauvegardée !', 'success');
    loadCertifications();
  }

  async function deleteCertification(id) {
    if (!confirm('Supprimer cette certification ?')) return;
    PortfolioDB.deleteById('certifications', id);
    await PortfolioDB.persist();
    toast('Certification supprimée', 'info');
    loadCertifications();
  }

  async function addCertification() {
    PortfolioDB.insertCertification({ name: 'Nouvelle certification', sort_order: 99 });
    await PortfolioDB.persist();
    toast('Certification ajoutée', 'success');
    loadCertifications();
  }

  // ===================================
  // CONTACT
  // ===================================
  function loadContact() {
    const s = PortfolioDB.getAllSettings();
    document.getElementById('contactEmail').value = s.contact_email || '';
    document.getElementById('contactPhone1').value = s.contact_phone1 || '';
    document.getElementById('contactPhone2').value = s.contact_phone2 || '';
    document.getElementById('contactLocation').value = s.contact_location || '';
    document.getElementById('footerDescription').value = s.footer_description || '';
  }

  async function saveContact() {
    PortfolioDB.setSetting('contact_email', document.getElementById('contactEmail').value);
    PortfolioDB.setSetting('contact_phone1', document.getElementById('contactPhone1').value);
    PortfolioDB.setSetting('contact_phone2', document.getElementById('contactPhone2').value);
    PortfolioDB.setSetting('contact_location', document.getElementById('contactLocation').value);
    PortfolioDB.setSetting('footer_description', document.getElementById('footerDescription').value);
    await PortfolioDB.persist();
    toast('Contact sauvegardé !', 'success');
  }

  // ===================================
  // DATA MANAGEMENT
  // ===================================
  function loadDataInfo() {
    const info = {
      projects: PortfolioDB.getAll('projects').length,
      skill_categories: PortfolioDB.getAll('skill_categories').length,
      skills: PortfolioDB.getAll('skills').length,
      experiences: PortfolioDB.getAll('experiences').length,
      education: PortfolioDB.getAll('education').length,
      certifications: PortfolioDB.getAll('certifications').length,
      settings: Object.keys(PortfolioDB.getAllSettings()).length
    };
    document.getElementById('dbInfo').textContent =
      `Base de données SQLite (sql.js / WASM)\n` +
      `Stockage: IndexedDB + localStorage sync\n\n` +
      `Projets: ${info.projects}\n` +
      `Catégories compétences: ${info.skill_categories}\n` +
      `Compétences: ${info.skills}\n` +
      `Expériences: ${info.experiences}\n` +
      `Formations: ${info.education}\n` +
      `Certifications: ${info.certifications}\n` +
      `Paramètres: ${info.settings}`;
  }

  function exportData() {
    const json = PortfolioDB.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_data_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Données exportées !', 'success');
  }

  function initImport() {
    document.getElementById('importFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        PortfolioDB.importJSON(text);
        await PortfolioDB.persist();
        toast('Données importées avec succès !', 'success');
        loadCurrentSection();
      } catch (err) {
        toast('Erreur d\'import: ' + err.message, 'error');
      }
      e.target.value = '';
    });
  }

  async function resetData() {
    if (!confirm('Réinitialiser TOUTES les données ? Cette action est irréversible.')) return;
    await PortfolioDB.resetDatabase();
    toast('Données réinitialisées', 'info');
    loadCurrentSection();
  }

  async function syncData() {
    PortfolioDB.syncToLocalStorage();
    toast('Données synchronisées vers le site public !', 'success');
  }

  // ===================================
  // IMAGE UPLOAD
  // ===================================
  function handleImageUpload(inputEl, previewEl, urlInputEl) {
    inputEl.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        toast('Fichier non valide. Sélectionnez une image.', 'error');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast('Image trop volumineuse (max 2 Mo)', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        if (previewEl) {
          previewEl.src = dataUrl;
          previewEl.style.display = 'block';
        }
        if (urlInputEl) urlInputEl.value = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  function initImageUploads() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-upload-img');
      if (!btn) return;
      const card = btn.closest('.item-card') || btn.closest('.panel-body');
      if (!card) return;
      const fileInput = card.querySelector('.img-file-input');
      if (fileInput) fileInput.click();
    });

    document.addEventListener('change', (e) => {
      if (!e.target.classList.contains('img-file-input')) return;
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { toast('Fichier non valide', 'error'); return; }
      if (file.size > 2 * 1024 * 1024) { toast('Max 2 Mo', 'error'); return; }
      const card = e.target.closest('.item-card') || e.target.closest('.panel-body');
      const preview = card.querySelector('.img-preview');
      const urlInput = card.querySelector('[data-field="image_url"]') || card.querySelector('#heroPhoto');
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (preview) { preview.src = ev.target.result; preview.style.display = 'block'; }
        if (urlInput) urlInput.value = ev.target.result;
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });
  }

  // ===================================
  // UTILS
  // ===================================
  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function safeJSON(str, fallback) {
    try { return JSON.parse(str || '[]'); } catch { return fallback; }
  }

  // ===================================
  // INIT
  // ===================================
  document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initImport();
    initImageUploads();
  });

  // ===================================
  // PUBLIC API
  // ===================================
  return {
    saveHero, handleImageUpload,
    loadProjects, saveProject, deleteProject, addProject,
    loadSkills, saveSkillCategory, addSkillCategory, deleteSkillCategory, addSkill, deleteSkill,
    loadExperiences, saveExperience, deleteExperience, addExperience,
    loadEducation, saveEducation, deleteEducation, addEducation,
    loadCertifications, saveCertification, deleteCertification, addCertification,
    saveContact,
    exportData, resetData, syncData
  };

})();
