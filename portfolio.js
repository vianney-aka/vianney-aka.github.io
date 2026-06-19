/* ============================================================
   VIANNEY AKA — portfolio.js
   Rendu piloté par les données (VAContent) + i18n + animations.
   ============================================================ */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = (window.VAContent ? window.VAContent.get() : null);

  /* ---------- DOM builders ---------- */
  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(c => c && n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return n;
  }
  // bilingual element: stores both langs, current applied later by setLang
  function bi(tag, attrs, fr, en, isHtml) {
    const a = attrs || {};
    a[isHtml ? 'data-fr-html' : 'data-fr'] = fr;
    a[isHtml ? 'data-en-html' : 'data-en'] = en;
    const n = el(tag, a);
    if (isHtml) n.innerHTML = fr; else n.textContent = fr;
    return n;
  }
  const chip = (label) => el('span', { class: 'chip', text: label });

  const SERVICE_ICONS = {
    code:    '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    lms:     '<path d="M3 5h18v12H3zM3 21h18M9 9l2 2-2 2M13 13h3"/>',
    consult: '<path d="M12 3v18M3 8l9-5 9 5M3 16l9 5 9-5"/>',
    mobile:  '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    cloud:   '<path d="M6 16a4 4 0 0 1 .9-7.9 5 5 0 0 1 9.7 1.2A3.5 3.5 0 0 1 17 16z"/>',
    design:  '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>'
  };

  /* ============================================================
     RENDER from data
     ============================================================ */
  function render() {
    if (!C) return;

    // hero
    const hs = $('#heroStatus'); if (hs) { hs.setAttribute('data-fr', C.hero.statusFr); hs.setAttribute('data-en', C.hero.statusEn); }
    const sub = $('#heroSub'); if (sub) { sub.setAttribute('data-fr-html', C.hero.subFr); sub.setAttribute('data-en-html', C.hero.subEn); }

    // about
    const lead = $('#aboutLead'); if (lead) { lead.setAttribute('data-fr-html', C.about.leadFr); lead.setAttribute('data-en-html', C.about.leadEn); }
    const body = $('#aboutBody');
    if (body) { body.innerHTML = '';
      body.appendChild(bi('p', null, C.about.p1Fr, C.about.p1En));
      body.appendChild(bi('p', null, C.about.p2Fr, C.about.p2En));
    }
    const stats = $('#statsGrid');
    if (stats) { stats.innerHTML = '';
      C.about.stats.forEach(s => {
        stats.appendChild(el('div', { class: 'stat' }, [
          el('div', { class: 'num', 'data-count': s.num, 'data-suf': s.suf || '', text: '0' }),
          bi('div', { class: 'lbl' }, s.lblFr, s.lblEn)
        ]));
      });
    }

    // skills
    const sg = $('#skillsGrid');
    if (sg) { sg.innerHTML = '';
      C.skills.forEach((s, i) => {
        const card = el('article', { class: 'skill-card reveal tilt', 'data-d': String(i) });
        card.appendChild(el('h3', null, [ el('span', { class: 'ix', text: s.ix || ('/0' + (i + 1)) }), document.createTextNode(' '), bi('span', null, s.titleFr, s.titleEn) ]));
        card.appendChild(bi('p', { class: 'desc' }, s.descFr, s.descEn));
        card.appendChild(el('div', { class: 'chips' }, (s.chips || []).map(chip)));
        sg.appendChild(card);
      });
    }

    // projects
    const pl = $('#projectsList');
    if (pl) { pl.innerHTML = '';
      C.projects.forEach(p => {
        const media = el('div', { class: 'project-media tilt' }, [
          bi('span', { class: 'tag-float' }, p.tagFr || p.tag || '', p.tagEn || p.tag || '')
        ]);
        const slot = el('image-slot', { id: p.id, style: 'width:100%;height:100%', shape: 'rect', fit: 'cover', placeholder: (p.titleFr || 'Projet') });
        media.appendChild(slot);
        const links = el('div', { class: 'project-links' },
          (p.links || []).map(l => bi('a', { href: l.url || '#', target: (l.url && l.url !== '#') ? '_blank' : null, rel: 'noopener' }, l.labelFr, l.labelEn)));
        const info = el('div', { class: 'project-info' }, [
          bi('span', { class: 'pnum' }, p.periodFr || '', p.periodEn || p.periodFr || ''),
          bi('h3', null, p.titleFr, p.titleEn),
          bi('p', null, p.descFr, p.descEn),
          el('div', { class: 'project-tags' }, (p.tags || []).map(chip)),
          links
        ]);
        pl.appendChild(el('article', { class: 'project reveal' }, [media, info]));
      });
    }

    // experience
    const tl = $('#timeline');
    if (tl) { tl.innerHTML = '';
      C.experience.forEach((x, i) => {
        tl.appendChild(el('div', { class: 'tl-item reveal', 'data-d': String(i % 4) }, [
          bi('span', { class: 'tl-date' }, x.dateFr, x.dateEn),
          bi('h3', null, x.titleFr, x.titleEn),
          el('div', { class: 'tl-org', text: x.org || '' }),
          bi('p', null, x.descFr, x.descEn)
        ]));
      });
    }

    // certs
    const cg = $('#certsGrid');
    if (cg) { cg.innerHTML = '';
      C.certs.forEach((c, i) => {
        cg.appendChild(el('div', { class: 'cert reveal', 'data-d': String(i % 4) }, [
          el('div', { class: 'badge', text: c.badge || '' }),
          el('div', null, [ bi('h3', null, c.titleFr, c.titleEn), el('div', { class: 'issuer', text: c.issuer || '' }) ])
        ]));
      });
    }

    // services
    const svg = $('#servicesGrid');
    if (svg) { svg.innerHTML = '';
      C.services.forEach((s, i) => {
        const ico = el('div', { class: 'ico' });
        ico.innerHTML = '<svg viewBox="0 0 24 24">' + (SERVICE_ICONS[s.icon] || SERVICE_ICONS.code) + '</svg>';
        svg.appendChild(el('article', { class: 'service reveal', 'data-d': String(i) }, [
          el('span', { class: 'snum', text: String(i + 1).padStart(2, '0') }),
          ico,
          bi('h3', null, s.titleFr, s.titleEn),
          bi('p', null, s.descFr, s.descEn)
        ]));
      });
    }

    // contact list
    const cl = $('#contactList');
    if (cl) { cl.innerHTML = '';
      const ct = C.contact;
      const row = (labelFr, labelEn, value, href, ext) => {
        const a = el('a', { href: href, 'data-magnetic': '' });
        if (ext) { a.target = '_blank'; a.rel = 'noopener'; }
        a.appendChild(el('span', null, [ bi('span', { class: 'ci-label' }, labelFr, labelEn), el('span', { class: 'ci-value', text: value }) ]));
        a.appendChild(el('span', { class: 'arr', text: '↗' }));
        return a;
      };
      cl.appendChild(row('Email', 'Email', ct.email, 'mailto:' + ct.email));
      cl.appendChild(row('Téléphone', 'Phone', ct.phoneDisplay || ct.phone, 'tel:' + ct.phone));
      cl.appendChild(row('LinkedIn', 'LinkedIn', ct.linkedinDisplay || 'LinkedIn', ct.linkedin, true));
      cl.appendChild(row('GitHub', 'GitHub', ct.githubDisplay || 'GitHub', ct.github, true));
    }
  }

  render();

  /* ---------- year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- i18n (FR default) ---------- */
  function setLang(lang) {
    document.documentElement.lang = lang;
    $$('[data-fr]').forEach(e => { const v = e.getAttribute('data-' + lang); if (v != null) e.textContent = v; });
    $$('[data-fr-html]').forEach(e => { const v = e.getAttribute('data-' + lang + '-html'); if (v != null) e.innerHTML = v; });
    $$('#langToggle button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('va_lang', lang); } catch (e) {}
  }
  $$('#langToggle button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  let savedLang = 'fr';
  try { savedLang = localStorage.getItem('va_lang') || 'fr'; } catch (e) {}
  setLang(savedLang);

  /* ---------- nav scroll + burger ---------- */
  const nav = $('#nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
    const h = document.documentElement;
    $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#burger').addEventListener('click', () => nav.classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* ---------- marquee ---------- */
  const mq = $('#marquee'); if (mq) mq.innerHTML += mq.innerHTML;

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(e => io.observe(e));

  /* ---------- count-up ---------- */
  function sufHtml(s) { return s ? '<span class="suf">' + s + '</span>' : ''; }
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el2 = e.target, target = +el2.dataset.count, suf = el2.dataset.suf || '';
      if (reduce) { el2.innerHTML = target + sufHtml(suf); countIO.unobserve(el2); return; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
        el2.innerHTML = Math.round(target * eased) + sufHtml(suf);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); countIO.unobserve(el2);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(e => countIO.observe(e));

  /* ---------- hero entrance ---------- */
  const hero = $('#hero');
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('ready')));

  /* ---------- skill spotlight ---------- */
  $$('.skill-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- tilt ---------- */
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    $$('.tilt').forEach(e => {
      e.style.transformStyle = 'preserve-3d';
      e.addEventListener('pointermove', (ev) => {
        const r = e.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5, py = (ev.clientY - r.top) / r.height - 0.5;
        e.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
      });
      e.addEventListener('pointerleave', () => { e.style.transform = ''; });
    });
  }

  /* ---------- cursor + magnetic ---------- */
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  if (matchMedia('(pointer:fine)').matches && !reduce) {
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
    $$('a, button, .tilt, [data-magnetic], input, textarea, .chip').forEach(e => {
      e.addEventListener('pointerenter', () => ring.classList.add('hover'));
      e.addEventListener('pointerleave', () => ring.classList.remove('hover'));
    });
    $$('[data-magnetic]').forEach(e => {
      e.addEventListener('pointermove', (ev) => {
        const r = e.getBoundingClientRect();
        e.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * 0.25}px, ${(ev.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      e.addEventListener('pointerleave', () => { e.style.transform = ''; });
    });
  } else if (dot && ring) { dot.style.display = ring.style.display = 'none'; }

  /* ---------- contact form → enregistre le message ---------- */
  const form = $('#contactForm');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = document.documentElement.lang;
    const data = { name: form.name.value, email: form.email.value, message: form.message.value, lang };
    try { if (window.VAContent) window.VAContent.addMessage(data); } catch (err) {}
    const btn = form.querySelector('button');
    btn.textContent = lang === 'fr' ? 'Message envoyé ✓' : 'Message sent ✓';
    btn.style.background = 'var(--accent-bright)';
    setTimeout(() => { form.reset(); btn.textContent = lang === 'fr' ? 'Envoyer le message' : 'Send message'; btn.style.background = ''; }, 2600);
  });

  /* ============================================================
     HERO CANVAS — constellation
     ============================================================ */
  const cv = $('#hero-canvas');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let w, h, dpr, pts = [], mouse = { x: -999, y: -999 };
    const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#13c06b';
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor(w * h / 16000));
      pts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.6 + .6 }));
    }
    function hex2rgb(hx) { const m = hx.replace('#', ''); const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m; return [parseInt(n.slice(0,2),16), parseInt(n.slice(2,4),16), parseInt(n.slice(4,6),16)]; }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const [r, g, b] = hex2rgb(accent());
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.hypot(dxm, dym);
        if (dm < 140) { p.x += dxm / dm * .8; p.y += dym / dm * .8; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${r},${g},${b},0.7)`; ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 130) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(${r},${g},${b},${0.16 * (1 - d / 130)})`; ctx.lineWidth = 1; ctx.stroke(); }
      }
      requestAnimationFrame(frame);
    }
    addEventListener('resize', resize);
    cv.parentElement.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    cv.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
    resize(); frame();
  }
})();
