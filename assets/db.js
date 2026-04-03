// ===================================
// SQLite Database Layer (sql.js + IndexedDB)
// Runs entirely in the browser via WASM
// ===================================
const PortfolioDB = (function () {
  'use strict';

  const DB_NAME = 'portfolio_db';
  const IDB_NAME = 'PortfolioDB';
  const IDB_STORE = 'sqlitedb';
  const SYNC_KEY = 'portfolio_sync_data';

  let db = null;

  // ===================================
  // IndexedDB helpers for persistence
  // ===================================
  function openIDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(IDB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveToIDB(data) {
    const idb = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = idb.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(data, DB_NAME);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function loadFromIDB() {
    const idb = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = idb.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(DB_NAME);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  // ===================================
  // Initialize sql.js and database
  // ===================================
  async function init() {
    const SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    });

    const savedData = await loadFromIDB();
    if (savedData) {
      db = new SQL.Database(new Uint8Array(savedData));
    } else {
      db = new SQL.Database();
      createSchema();
      seedDefaults();
    }

    return db;
  }

  // ===================================
  // Schema
  // ===================================
  function createSchema() {
    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        badge TEXT DEFAULT '',
        badge_type TEXT DEFAULT 'default',
        description TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        link_url TEXT DEFAULT '',
        category TEXT DEFAULT 'laravel',
        metrics_json TEXT DEFAULT '[]',
        tags_json TEXT DEFAULT '[]',
        sort_order INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS skill_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        level INTEGER DEFAULT 80,
        FOREIGN KEY(category_id) REFERENCES skill_categories(id) ON DELETE CASCADE
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS experiences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_range TEXT NOT NULL,
        title TEXT NOT NULL,
        company TEXT DEFAULT '',
        items_json TEXT DEFAULT '[]',
        sort_order INTEGER DEFAULT 0
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_range TEXT NOT NULL,
        title TEXT NOT NULL,
        school TEXT DEFAULT '',
        description TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS certifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0
      );
    `);
  }

  // ===================================
  // Seed default data from current HTML
  // ===================================
  function seedDefaults() {
    // Settings
    const settings = {
      hero_greeting: 'Bonjour, je suis',
      hero_title: 'Vianney AKA',
      hero_subtitle: 'Développeur Full Stack | Administrateur LMS & Chef de Projet Digital',
      hero_description: "Développeur Full Stack et Responsable IT avec plus de 5 ans d'expérience dans la conception de plateformes e-learning, la gestion de projets digitaux et le développement d'applications web et mobile.",
      stat_experience: '5',
      stat_youth: '300',
      stat_users: '200',
      contact_email: 'contact@vianney-aka.com',
      contact_phone1: '+225 07 89 81 43 08',
      contact_phone2: '+225 01 40 39 95 80',
      contact_location: 'Abidjan, Côte d\'Ivoire',
      footer_description: "Développeur Full Stack passionné par l'e-learning et l'impact social",
      admin_password_hash: ''
    };
    const stmtS = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
    Object.entries(settings).forEach(([k, v]) => { stmtS.run([k, v]); });
    stmtS.free();

    // Projects
    const projects = [
      { title: "Impact'Lab UNESCO", badge: 'Featured', badge_type: 'default', description: "Plateforme e-learning complète pour l'UNESCO. Architecture Moodle personnalisée avec modules interactifs.", image_url: 'assets/project-impactlab.jpg', link_url: 'https://academy.impactlab-cilis.org', category: 'moodle', metrics_json: JSON.stringify([{label:'Utilisateurs',value:'200+'},{label:'Satisfaction',value:'95%'}]), tags_json: JSON.stringify(['Moodle','PHP','MySQL']), sort_order: 1 },
      { title: 'Prosper Cashew LMS', badge: 'TechnoServe', badge_type: 'default', description: 'LMS sur-mesure pour Prosper Cashew / TechnoServe avec vidéos, animations et quiz interactifs.', image_url: 'assets/project-prosper.jpg', link_url: '', category: 'laravel', metrics_json: JSON.stringify([{label:'Engagement',value:'40% ↑'},{label:'Formés',value:'15'}]), tags_json: JSON.stringify(['Laravel','MySQL','Bootstrap']), sort_order: 2 },
      { title: 'SpeedKDO', badge: '', badge_type: 'default', description: "Plateforme web moderne pour la gestion et l'envoi de cadeaux.", image_url: 'assets/project-speedkdo.jpg', link_url: 'https://www.speedkdo.com', category: 'laravel', metrics_json: '[]', tags_json: JSON.stringify(['Laravel','Bootstrap','MySQL']), sort_order: 3 },
      { title: 'Nounou Minute CI', badge: 'Startup', badge_type: 'default', description: "Application mobile de mise en relation pour services de garde d'enfants avec géolocalisation et paiement mobile.", image_url: 'assets/project-nounou.jpg', link_url: '', category: 'laravel', metrics_json: JSON.stringify([{label:'MVP',value:'3 mois'},{label:'Stores',value:'2'}]), tags_json: JSON.stringify(['React Native','Laravel','Google Maps']), sort_order: 4 },
      { title: 'Drone Patrouilleur 5G', badge: 'Finaliste', badge_type: 'award', description: 'Système de surveillance intelligent avec Computer Vision. Finaliste Hackathon Orange.', image_url: 'assets/project-drone.jpg', link_url: '', category: 'python', metrics_json: '[]', tags_json: JSON.stringify(['Python','Raspberry Pi','CV']), sort_order: 5 },
      { title: 'Sites WordPress & Laravel', badge: '', badge_type: 'default', description: 'Conception de multiples sites professionnels : afcsm.com, acm-institute.com, dyvagroup.com', image_url: 'assets/project-wordpress.jpg', link_url: '', category: 'laravel', metrics_json: '[]', tags_json: JSON.stringify(['WordPress','Laravel','PHP']), sort_order: 6 }
    ];
    const stmtP = db.prepare('INSERT INTO projects (title, badge, badge_type, description, image_url, link_url, category, metrics_json, tags_json, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)');
    projects.forEach(p => { stmtP.run([p.title, p.badge, p.badge_type, p.description, p.image_url, p.link_url, p.category, p.metrics_json, p.tags_json, p.sort_order]); });
    stmtP.free();

    // Skill categories + skills
    const skillData = [
      { name: 'Backend', icon: '🗄️', sort_order: 1, skills: [{name:'🐘 PHP / Laravel',level:95},{name:'🐍 Python / Django',level:85},{name:'🟢 Node.js',level:80},{name:'🗄️ MySQL / PostgreSQL',level:90}] },
      { name: 'Frontend', icon: '💻', sort_order: 2, skills: [{name:'🌐 HTML/CSS/JS',level:95},{name:'🅰️ Angular',level:80},{name:'⚛️ React Native',level:75},{name:'🎨 Bootstrap',level:90}] },
      { name: 'CMS & LMS', icon: '📚', sort_order: 3, skills: [{name:'🎓 Moodle Expert',level:95},{name:'📝 WordPress',level:85},{name:'🧩 H5P / SCORM',level:85},{name:'📊 TalentLMS',level:80},{name:'🎯 Rise360',level:80}] },
      { name: 'DevOps & Outils', icon: '🛠️', sort_order: 4, skills: [{name:'🐙 Git / GitHub',level:90},{name:'🐧 Linux',level:85},{name:'📋 Jira / Trello',level:80}] }
    ];
    skillData.forEach(cat => {
      db.run('INSERT INTO skill_categories (name, icon, sort_order) VALUES (?,?,?)', [cat.name, cat.icon, cat.sort_order]);
      const catId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
      const stmtSk = db.prepare('INSERT INTO skills (category_id, name, level) VALUES (?,?,?)');
      cat.skills.forEach(s => { stmtSk.run([catId, s.name, s.level]); });
      stmtSk.free();
    });

    // Experiences
    const experiences = [
      { date_range: 'Sept. 2025 - Présent', title: 'Co-fondateur & CTO', company: 'Nounou Minute CI', items_json: JSON.stringify(['MVP fonctionnel en 3 mois (authentification, géolocalisation Google Maps, réservation)','Intégration paiement mobile & messagerie temps réel avec notifications push','Déploiement Google Play Store et App Store','Création de la landing page (nounouminute.pro)']), sort_order: 1 },
      { date_range: 'Août 2023 - Présent', title: 'Responsable Informatique & Chef de Projet', company: "Impact'Lab UNESCO - CILIS", items_json: JSON.stringify(["Déploiement plateforme e-learning Moodle (200+ utilisateurs, 95% satisfaction)","Chef projet Youth Mobile : formation de 120 jeunes en apps mobiles NOCODE","Coordinateur plateforme Moodle projet Génie (GGGI / Primature / KOICA)","Projet TEWA : formation de 30 femmes et intégration plateforme ISAHIT","Refonte complète du site web impactlab-cilis.org"]), sort_order: 2 },
      { date_range: 'Sept. 2024 - Juin 2025', title: 'Consultant en Digitalisation', company: 'Prosper Cashew / TechnoServe', items_json: JSON.stringify(['Développement LMS Laravel sur-mesure','Formation 15 collaborateurs','+40% engagement apprenants']), sort_order: 3 },
      { date_range: 'Nov. 2022 - Août 2023', title: 'Développeur Web & Formateur WordPress', company: "Villa HOH | L'univers de l'intelligence collective", items_json: JSON.stringify(['Création de sites internet avec Laravel','Formation de la 3ème cohorte de 60 jeunes (projet Projeunes - ONG IRC)']), sort_order: 4 },
      { date_range: 'Juin - Nov. 2022', title: 'Finaliste Hackathon 5G', company: 'Orange Côte d\'Ivoire - Orange Digital Center', items_json: JSON.stringify(['Drone patrouilleur intelligent (Raspberry Pi 4, caméra, détection de mouvement)','Application web de gestion des alertes citoyens','Application de bureau pour pilotage du drone à distance']), sort_order: 5 },
      { date_range: 'Fév. - Juin 2022', title: 'Chef Projet Web & Formateur WordPress', company: "Villa HOH | L'univers de l'intelligence collective", items_json: JSON.stringify(['Création de sites web avec Laravel et WordPress','Formation de la 2ème cohorte de 120 jeunes à Abidjan et Korhogo (projet Projeunes - ONG IRC)']), sort_order: 6 },
      { date_range: 'Juin 2020 - Fév. 2022', title: 'Stage & Assistant Chef Projet Web', company: "Villa HOH | L'univers de l'intelligence collective", items_json: JSON.stringify(['Création de sites web avec Laravel et déploiement Agora Project','Mise en place plateforme e-learning Moodle','Gestion de bases de données MySQL']), sort_order: 7 }
    ];
    const stmtE = db.prepare('INSERT INTO experiences (date_range, title, company, items_json, sort_order) VALUES (?,?,?,?,?)');
    experiences.forEach(e => { stmtE.run([e.date_range, e.title, e.company, e.items_json, e.sort_order]); });
    stmtE.free();

    // Education
    const edus = [
      { date_range: 'IFSM Cocody', title: 'Licence 3 Réseaux Telecom et Génie Logiciel', school: '', description: '', sort_order: 1 },
      { date_range: 'Fév. 2017 - Juil. 2019', title: "BTS Informatique - Développeur d'Application", school: 'PIGIER Côte d\'Ivoire', description: 'Licence Professionnelle 1ère et 2ème année - Option Réseaux et Génie Logiciel', sort_order: 2 },
      { date_range: 'Nov. 2015 - Juil. 2016', title: 'Baccalauréat D', school: 'Institut LKM', description: '', sort_order: 3 }
    ];
    const stmtEd = db.prepare('INSERT INTO education (date_range, title, school, description, sort_order) VALUES (?,?,?,?,?)');
    edus.forEach(e => { stmtEd.run([e.date_range, e.title, e.school, e.description, e.sort_order]); });
    stmtEd.free();

    // Certifications
    const certs = [
      { name: '✓ Microsoft Excel 2016', sort_order: 1 },
      { name: '✓ Bénévole Formateur Programme VIA 2023 & 2024', sort_order: 2 },
      { name: '👨‍🎓 300+ jeunes formés', sort_order: 3 },
      { name: '🌍 UNESCO, TechnoServe & TotalEnergies', sort_order: 4 }
    ];
    const stmtC = db.prepare('INSERT INTO certifications (name, sort_order) VALUES (?,?)');
    certs.forEach(c => { stmtC.run([c.name, c.sort_order]); });
    stmtC.free();
  }

  // ===================================
  // Persist to IndexedDB + sync to localStorage
  // ===================================
  async function persist() {
    if (!db) return;
    const data = db.export();
    await saveToIDB(data.buffer);
    syncToLocalStorage();
  }

  function syncToLocalStorage() {
    if (!db) return;
    const allData = {
      settings: getAllSettings(),
      projects: getAll('projects'),
      skill_categories: getAll('skill_categories'),
      skills: getAll('skills'),
      experiences: getAll('experiences'),
      education: getAll('education'),
      certifications: getAll('certifications')
    };
    localStorage.setItem(SYNC_KEY, JSON.stringify(allData));
  }

  // ===================================
  // Generic CRUD helpers
  // ===================================
  function getAll(table) {
    const result = db.exec(`SELECT * FROM ${table} ORDER BY sort_order ASC, id ASC`);
    if (!result.length) return [];
    const cols = result[0].columns;
    return result[0].values.map(row => {
      const obj = {};
      cols.forEach((c, i) => { obj[c] = row[i]; });
      return obj;
    });
  }

  function getById(table, id) {
    const stmt = db.prepare(`SELECT * FROM ${table} WHERE id = ?`);
    stmt.bind([id]);
    let row = null;
    if (stmt.step()) {
      const cols = stmt.getColumnNames();
      const vals = stmt.get();
      row = {};
      cols.forEach((c, i) => { row[c] = vals[i]; });
    }
    stmt.free();
    return row;
  }

  function deleteById(table, id) {
    db.run(`DELETE FROM ${table} WHERE id = ?`, [id]);
  }

  // ===================================
  // Settings CRUD
  // ===================================
  function getSetting(key) {
    const stmt = db.prepare('SELECT value FROM settings WHERE key = ?');
    stmt.bind([key]);
    let val = null;
    if (stmt.step()) val = stmt.get()[0];
    stmt.free();
    return val;
  }

  function setSetting(key, value) {
    db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
  }

  function getAllSettings() {
    const result = db.exec('SELECT key, value FROM settings');
    if (!result.length) return {};
    const obj = {};
    result[0].values.forEach(([k, v]) => { obj[k] = v; });
    return obj;
  }

  // ===================================
  // Projects CRUD
  // ===================================
  function insertProject(data) {
    db.run(
      'INSERT INTO projects (title, badge, badge_type, description, image_url, link_url, category, metrics_json, tags_json, sort_order, visible) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [data.title || '', data.badge || '', data.badge_type || 'default', data.description || '', data.image_url || '', data.link_url || '', data.category || 'laravel', data.metrics_json || '[]', data.tags_json || '[]', data.sort_order || 0, data.visible !== undefined ? data.visible : 1]
    );
    return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
  }

  function updateProject(id, data) {
    const fields = [];
    const vals = [];
    Object.keys(data).forEach(k => {
      if (k !== 'id') { fields.push(`${k} = ?`); vals.push(data[k]); }
    });
    vals.push(id);
    db.run(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, vals);
  }

  // ===================================
  // Skill categories & skills CRUD
  // ===================================
  function insertSkillCategory(data) {
    db.run('INSERT INTO skill_categories (name, icon, sort_order) VALUES (?,?,?)', [data.name, data.icon || '', data.sort_order || 0]);
    return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
  }

  function updateSkillCategory(id, data) {
    db.run('UPDATE skill_categories SET name=?, icon=?, sort_order=? WHERE id=?', [data.name, data.icon || '', data.sort_order || 0, id]);
  }

  function getSkillsByCategory(catId) {
    const result = db.exec(`SELECT * FROM skills WHERE category_id = ? ORDER BY id ASC`, [catId]);
    if (!result.length) return [];
    const cols = result[0].columns;
    return result[0].values.map(row => {
      const obj = {};
      cols.forEach((c, i) => { obj[c] = row[i]; });
      return obj;
    });
  }

  function insertSkill(data) {
    db.run('INSERT INTO skills (category_id, name, level) VALUES (?,?,?)', [data.category_id, data.name, data.level || 80]);
    return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
  }

  function updateSkill(id, data) {
    db.run('UPDATE skills SET name=?, level=? WHERE id=?', [data.name, data.level, id]);
  }

  // ===================================
  // Experiences CRUD
  // ===================================
  function insertExperience(data) {
    db.run('INSERT INTO experiences (date_range, title, company, items_json, sort_order) VALUES (?,?,?,?,?)', [data.date_range, data.title, data.company || '', data.items_json || '[]', data.sort_order || 0]);
    return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
  }

  function updateExperience(id, data) {
    db.run('UPDATE experiences SET date_range=?, title=?, company=?, items_json=?, sort_order=? WHERE id=?', [data.date_range, data.title, data.company || '', data.items_json || '[]', data.sort_order || 0, id]);
  }

  // ===================================
  // Education CRUD
  // ===================================
  function insertEducation(data) {
    db.run('INSERT INTO education (date_range, title, school, description, sort_order) VALUES (?,?,?,?,?)', [data.date_range, data.title, data.school || '', data.description || '', data.sort_order || 0]);
    return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
  }

  function updateEducation(id, data) {
    db.run('UPDATE education SET date_range=?, title=?, school=?, description=?, sort_order=? WHERE id=?', [data.date_range, data.title, data.school || '', data.description || '', data.sort_order || 0, id]);
  }

  // ===================================
  // Certifications CRUD
  // ===================================
  function insertCertification(data) {
    db.run('INSERT INTO certifications (name, sort_order) VALUES (?,?)', [data.name, data.sort_order || 0]);
    return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
  }

  function updateCertification(id, data) {
    db.run('UPDATE certifications SET name=?, sort_order=? WHERE id=?', [data.name, data.sort_order || 0, id]);
  }

  // ===================================
  // Export / Import
  // ===================================
  function exportJSON() {
    return JSON.stringify({
      settings: getAllSettings(),
      projects: getAll('projects'),
      skill_categories: getAll('skill_categories'),
      skills: getAll('skills'),
      experiences: getAll('experiences'),
      education: getAll('education'),
      certifications: getAll('certifications')
    }, null, 2);
  }

  function importJSON(jsonStr) {
    const data = JSON.parse(jsonStr);
    // Clear all tables
    ['certifications','education','experiences','skills','skill_categories','projects','settings'].forEach(t => {
      db.run(`DELETE FROM ${t}`);
    });

    // Re-insert settings
    if (data.settings) {
      const stmt = db.prepare('INSERT INTO settings (key, value) VALUES (?,?)');
      Object.entries(data.settings).forEach(([k, v]) => { stmt.run([k, v]); });
      stmt.free();
    }

    // Re-insert projects
    if (data.projects) {
      const stmt = db.prepare('INSERT INTO projects (id, title, badge, badge_type, description, image_url, link_url, category, metrics_json, tags_json, sort_order, visible) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
      data.projects.forEach(p => { stmt.run([p.id, p.title, p.badge, p.badge_type, p.description, p.image_url, p.link_url, p.category, p.metrics_json, p.tags_json, p.sort_order, p.visible]); });
      stmt.free();
    }

    // Re-insert skill_categories
    if (data.skill_categories) {
      const stmt = db.prepare('INSERT INTO skill_categories (id, name, icon, sort_order) VALUES (?,?,?,?)');
      data.skill_categories.forEach(c => { stmt.run([c.id, c.name, c.icon, c.sort_order]); });
      stmt.free();
    }

    // Re-insert skills
    if (data.skills) {
      const stmt = db.prepare('INSERT INTO skills (id, category_id, name, level) VALUES (?,?,?,?)');
      data.skills.forEach(s => { stmt.run([s.id, s.category_id, s.name, s.level]); });
      stmt.free();
    }

    // Re-insert experiences
    if (data.experiences) {
      const stmt = db.prepare('INSERT INTO experiences (id, date_range, title, company, items_json, sort_order) VALUES (?,?,?,?,?,?)');
      data.experiences.forEach(e => { stmt.run([e.id, e.date_range, e.title, e.company, e.items_json, e.sort_order]); });
      stmt.free();
    }

    // Re-insert education
    if (data.education) {
      const stmt = db.prepare('INSERT INTO education (id, date_range, title, school, description, sort_order) VALUES (?,?,?,?,?,?)');
      data.education.forEach(e => { stmt.run([e.id, e.date_range, e.title, e.school, e.description, e.sort_order]); });
      stmt.free();
    }

    // Re-insert certifications
    if (data.certifications) {
      const stmt = db.prepare('INSERT INTO certifications (id, name, sort_order) VALUES (?,?,?)');
      data.certifications.forEach(c => { stmt.run([c.id, c.name, c.sort_order]); });
      stmt.free();
    }
  }

  async function resetDatabase() {
    ['certifications','education','experiences','skills','skill_categories','projects','settings'].forEach(t => {
      db.run(`DELETE FROM ${t}`);
    });
    seedDefaults();
    await persist();
  }

  // ===================================
  // Public API
  // ===================================
  return {
    init,
    persist,
    syncToLocalStorage,
    // Settings
    getSetting,
    setSetting,
    getAllSettings,
    // Generic
    getAll,
    getById,
    deleteById,
    // Projects
    insertProject,
    updateProject,
    // Skills
    insertSkillCategory,
    updateSkillCategory,
    getSkillsByCategory,
    insertSkill,
    updateSkill,
    // Experiences
    insertExperience,
    updateExperience,
    // Education
    insertEducation,
    updateEducation,
    // Certifications
    insertCertification,
    updateCertification,
    // Export/Import
    exportJSON,
    importJSON,
    resetDatabase
  };

})();
