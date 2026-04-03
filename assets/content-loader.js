// ===================================
// CONTENT LOADER - Reads synced data
// from localStorage and applies it to
// the public portfolio page dynamically.
// No sql.js needed on the main page.
// ===================================
(function () {
  'use strict';

  const SYNC_KEY = 'portfolio_sync_data';

  function load() {
    const raw = localStorage.getItem(SYNC_KEY);
    if (!raw) return;

    let data;
    try { data = JSON.parse(raw); } catch { return; }

    applySettings(data.settings);
    applyProjects(data.projects);
    applySkills(data.skill_categories, data.skills);
    applyExperiences(data.experiences);
    applyEducation(data.education);
    applyCertifications(data.certifications);
  }

  // ===================================
  // SETTINGS (Hero, Contact, Footer)
  // ===================================
  function applySettings(s) {
    if (!s) return;

    setText('.hero-greeting', s.hero_greeting);
    setText('.hero-title', s.hero_title);
    setHTML('.hero-description', s.hero_description);

    // Profile photo
    if (s.hero_photo) {
      const img = document.querySelector('.hero-image img') || document.querySelector('.profile-photo');
      if (img) img.src = s.hero_photo;
    }

    // Stats counters
    const counters = document.querySelectorAll('[data-counter]');
    if (s.stat_experience && counters[0]) counters[0].setAttribute('data-counter', s.stat_experience);
    if (s.stat_youth && counters[1]) counters[1].setAttribute('data-counter', s.stat_youth);
    if (s.stat_users && counters[2]) counters[2].setAttribute('data-counter', s.stat_users);

    // Contact
    const emailLink = document.querySelector('.contact-info a[href^="mailto:"]');
    if (emailLink && s.contact_email) {
      emailLink.href = 'mailto:' + s.contact_email;
      emailLink.textContent = s.contact_email;
    }

    const phoneLinks = document.querySelectorAll('.contact-info a[href^="tel:"]');
    if (phoneLinks[0] && s.contact_phone1) {
      phoneLinks[0].href = 'tel:' + s.contact_phone1.replace(/\s/g, '');
      phoneLinks[0].textContent = s.contact_phone1;
    }
    if (phoneLinks[1] && s.contact_phone2) {
      phoneLinks[1].href = 'tel:' + s.contact_phone2.replace(/\s/g, '');
      phoneLinks[1].textContent = s.contact_phone2;
    }

    const locP = document.querySelector('.info-item:last-of-type p');
    if (locP && s.contact_location) locP.textContent = s.contact_location;

    // Footer
    const footerP = document.querySelector('.footer-brand p');
    if (footerP && s.footer_description) footerP.textContent = s.footer_description;
  }

  // ===================================
  // PROJECTS
  // ===================================
  function applyProjects(projects) {
    if (!projects || !projects.length) return;
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = '';
    projects.filter(p => p.visible !== 0).forEach(p => {
      const tags = safeJSON(p.tags_json, []);
      const metrics = safeJSON(p.metrics_json, []);

      let metricsHTML = '';
      if (metrics.length) {
        metricsHTML = '<div class="metrics">' + metrics.map(m =>
          `<div><strong>${esc(m.value)}</strong> ${esc(m.label)}</div>`
        ).join('') + '</div>';
      }

      let badgeHTML = '';
      if (p.badge) {
        badgeHTML = `<span class="badge${p.badge_type === 'award' ? ' award' : ''}">${esc(p.badge)}</span>`;
      }

      let linkHTML = '';
      if (p.link_url) {
        linkHTML = `<a href="${esc(p.link_url)}" target="_blank" class="project-link">↗</a>`;
      }

      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', p.category || 'laravel');
      card.innerHTML = `
        <div class="project-image">
          <img src="${esc(p.image_url)}" alt="${esc(p.title)}" loading="lazy">
          ${linkHTML}
        </div>
        <div class="project-content">
          <h3>${esc(p.title)}${badgeHTML}</h3>
          <p>${esc(p.description)}</p>
          ${metricsHTML}
          <div class="tags">${tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>`;
      grid.appendChild(card);
    });
  }

  // ===================================
  // SKILLS
  // ===================================
  function applySkills(categories, skills) {
    if (!categories || !categories.length) return;
    const grid = document.querySelector('.skills-grid');
    if (!grid) return;

    grid.innerHTML = '';
    categories.forEach(cat => {
      const catSkills = (skills || []).filter(s => s.category_id === cat.id);
      const skillsHTML = catSkills.map(s =>
        `<div class="skill-item">
          <span>${esc(s.name)}</span>
          <div class="skill-bar"><div style="width: ${s.level}%"></div></div>
        </div>`
      ).join('');

      const div = document.createElement('div');
      div.className = 'skill-category';
      div.innerHTML = `<h3>${esc(cat.icon)} ${esc(cat.name)}</h3>${skillsHTML}`;
      grid.appendChild(div);
    });
  }

  // ===================================
  // EXPERIENCES
  // ===================================
  function applyExperiences(experiences) {
    if (!experiences || !experiences.length) return;
    const timeline = document.querySelector('#experience .timeline');
    if (!timeline) return;

    timeline.innerHTML = '';
    experiences.forEach(e => {
      const items = safeJSON(e.items_json, []);
      const itemsHTML = items.length ? '<ul>' + items.map(i => `<li>${esc(i)}</li>`).join('') + '</ul>' : '';

      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <div class="timeline-date">${esc(e.date_range)}</div>
        <div class="timeline-content">
          <h3>${esc(e.title)}</h3>
          ${e.company ? `<h4>${esc(e.company)}</h4>` : ''}
          ${itemsHTML}
        </div>`;
      timeline.appendChild(div);
    });
  }

  // ===================================
  // EDUCATION
  // ===================================
  function applyEducation(education) {
    if (!education || !education.length) return;
    const timeline = document.querySelector('#formation .timeline');
    if (!timeline) return;

    timeline.innerHTML = '';
    education.forEach(e => {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <div class="timeline-date">${esc(e.date_range)}</div>
        <div class="timeline-content">
          <h3>${esc(e.title)}</h3>
          ${e.school ? `<h4>${esc(e.school)}</h4>` : ''}
          ${e.description ? `<p>${esc(e.description)}</p>` : ''}
        </div>`;
      timeline.appendChild(div);
    });
  }

  // ===================================
  // CERTIFICATIONS
  // ===================================
  function applyCertifications(certs) {
    if (!certs || !certs.length) return;
    const container = document.querySelector('.cert-badges');
    if (!container) return;

    container.innerHTML = '';
    certs.forEach(c => {
      const span = document.createElement('span');
      span.textContent = c.name;
      container.appendChild(span);
    });
  }

  // ===================================
  // UTILS
  // ===================================
  function setText(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHTML(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function esc(str) {
    if (str === null || str === undefined) return '';
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }

  function safeJSON(str, fallback) {
    try { return JSON.parse(str || '[]'); } catch { return fallback; }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

})();
