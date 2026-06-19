/* ============================================================
   VIANNEY AKA — content-data.js
   Modèle de données + store (localStorage) + auth + messages.
   Source de vérité partagée entre le site public et l'admin.
   ============================================================ */
(function (global) {
  'use strict';

  const KEY_CONTENT  = 'va_content_v1';
  const KEY_MESSAGES = 'va_messages_v1';
  const KEY_HASH     = 'va_admin_hash';
  const KEY_SESSION  = 'va_admin_ok';

  /* ---------- Defaults (issus du CV) ---------- */
  const DEFAULT_CONTENT = {
    hero: {
      statusFr: "Disponible pour de nouveaux projets",
      statusEn: "Available for new projects",
      subFr: "Développeur <b>Full-Stack</b> · administrateur <b>LMS</b> · chef de projet digital. Je conçois des plateformes e-learning et des applications web & mobiles à <b>fort impact</b>.",
      subEn: "<b>Full-stack</b> developer · <b>LMS</b> administrator · digital project lead. I build e-learning platforms and web & mobile apps with <b>real impact</b>."
    },
    about: {
      leadFr: "Je conçois des <em>plateformes e-learning</em> et des applications qui forment, connectent et <em>créent de l'impact</em>.",
      leadEn: "I build <em>e-learning platforms</em> and applications that train, connect and <em>create impact</em>.",
      p1Fr: "Développeur Full-Stack et Responsable IT avec plus de 5 ans d'expérience dans la conception de plateformes e-learning, la gestion de projets digitaux et le développement d'applications web et mobiles (PHP/Laravel, Python/Django, WordPress, React Native, Angular).",
      p1En: "Full-Stack developer and IT lead with over 5 years of experience designing e-learning platforms, managing digital projects and building web and mobile applications (PHP/Laravel, Python/Django, WordPress, React Native, Angular).",
      p2Fr: "Passionné par l'innovation et la transmission de compétences, j'ai dirigé des projets à fort impact social (Prosper Cashew, TotalEnergies Fondation, UNESCO) et formé plus de 300 jeunes aux métiers du numérique. Basé à Abidjan, Côte d'Ivoire.",
      p2En: "Driven by innovation and knowledge sharing, I have led high-impact social projects (Prosper Cashew, TotalEnergies Foundation, UNESCO) and trained over 300 young people in digital skills. Based in Abidjan, Côte d'Ivoire.",
      stats: [
        { num: 5,   suf: "+", lblFr: "Années d'expérience",        lblEn: "Years of experience" },
        { num: 300, suf: "+", lblFr: "Jeunes formés au numérique", lblEn: "Youth trained in digital" },
        { num: 200, suf: "+", lblFr: "Apprenants actifs (LMS)",    lblEn: "Active LMS learners" },
        { num: 95,  suf: "%", lblFr: "Taux de satisfaction",       lblEn: "Satisfaction rate" }
      ]
    },
    skills: [
      { ix: "/01", titleFr: "Développement Web & Mobile", titleEn: "Web & Mobile Dev",
        descFr: "Applications full-stack, du back-end aux interfaces.", descEn: "Full-stack apps, from back-end to interfaces.",
        chips: ["PHP / Laravel", "Python / Django", "React Native", "Angular", "JavaScript", "HTML / CSS", "Bootstrap"] },
      { ix: "/02", titleFr: "E-learning & LMS", titleEn: "E-learning & LMS",
        descFr: "Plateformes de formation à grande échelle.", descEn: "Training platforms at scale.",
        chips: ["Moodle (Expert)", "H5P", "SCORM", "TalentLMS", "Rise 360", "WordPress"] },
      { ix: "/03", titleFr: "Données & Systèmes", titleEn: "Data & Systems",
        descFr: "Bases de données, serveurs et déploiement.", descEn: "Databases, servers and deployment.",
        chips: ["MySQL", "PostgreSQL", "SQL", "Linux", "GitHub", "Excel avancé"] },
      { ix: "/04", titleFr: "Gestion de Projet", titleEn: "Project Management",
        descFr: "Pilotage, formation et qualité.", descEn: "Leadership, training and quality.",
        chips: ["Méthodes Agiles", "Jira / Trello", "Rédaction de SOPs", "Formation d'équipes", "MVC"] }
    ],
    projects: [
      { id: "proj1", tagFr: "Mobile · Startup", tagEn: "Mobile · Startup",
        periodFr: "01 — 2025 · Co-fondateur & CTO", periodEn: "01 — 2025 · Co-founder & CTO",
        titleFr: "Nounou Minute CI", titleEn: "Nounou Minute CI",
        descFr: "Application mobile de mise en relation avec des nounous : MVP livré en 3 mois — authentification, recherche géolocalisée (Google Maps), réservation de forfaits, paiement mobile sécurisé, messagerie temps réel, suivi de trajet et système d'avis. Déployée sur Play Store & App Store.",
        descEn: "Mobile app connecting families with nannies: MVP shipped in 3 months — authentication, geolocated search (Google Maps), package booking, secure mobile payments, real-time messaging, trip tracking and a review system. Released on Play Store & App Store.",
        tags: ["React Native", "Google Maps", "Paiement mobile", "Temps réel"],
        links: [{ labelFr: "Landing page ↗", labelEn: "Landing page ↗", url: "https://nounouminute.pro" }] },
      { id: "proj2", tagFr: "LMS · E-learning", tagEn: "LMS · E-learning",
        periodFr: "02 — 2023 · Impact'Lab UNESCO", periodEn: "02 — 2023 · Impact'Lab UNESCO",
        titleFr: "Academy Impact'Lab", titleEn: "Impact'Lab Academy",
        descFr: "Conception et déploiement d'une plateforme e-learning Moodle gérant plus de 200 utilisateurs actifs avec un taux de satisfaction de 95%. Coordination des programmes Génie (GGGI / KOICA / Primature) et Youth Mobile (120 jeunes formés au NOCODE).",
        descEn: "Design and deployment of a Moodle e-learning platform serving 200+ active users with a 95% satisfaction rate. Coordinated the Génie (GGGI / KOICA) and Youth Mobile programs (120 youth trained in NOCODE).",
        tags: ["Moodle", "H5P", "SCORM", "Gestion de projet"],
        links: [{ labelFr: "Voir la plateforme ↗", labelEn: "View platform ↗", url: "https://academy.impactlab-cilis.org" }] },
      { id: "proj3", tagFr: "LMS sur-mesure", tagEn: "Custom LMS",
        periodFr: "03 — 2024 · Prosper Cashew / TechnoServe", periodEn: "03 — 2024 · Prosper Cashew / TechnoServe",
        titleFr: "LMS Prosper Cashew", titleEn: "Prosper Cashew LMS",
        descFr: "Plateforme LMS sur-mesure intégrant vidéos, animations et quiz interactifs. Formation de 15 collaborateurs à la gestion de la plateforme et amélioration de 40% du taux d'engagement des apprenants.",
        descEn: "Custom LMS platform with videos, animations and interactive quizzes. Trained 15 staff to manage the platform and improved learner engagement by 40%.",
        tags: ["LMS", "Conception pédagogique", "UX", "Rise 360"],
        links: [{ labelFr: "Étude de cas ↗", labelEn: "Case study ↗", url: "#" }] },
      { id: "proj4", tagFr: "Hackathon · IoT", tagEn: "Hackathon · IoT",
        periodFr: "04 — 2022 · Orange Digital Center", periodEn: "04 — 2022 · Orange Digital Center",
        titleFr: "Drone Patrouilleur", titleEn: "Patrol Drone",
        descFr: "Finaliste du Hackathon 5G d'Orange Côte d'Ivoire : application web de gestion des alertes citoyennes et prototype de drone (Raspberry Pi 4, Linux, caméra avec détection de mouvement et reconnaissance d'objet) piloté à distance.",
        descEn: "Finalist of Orange Côte d'Ivoire's 5G Hackathon: a web app for managing citizen alerts and a drone prototype (Raspberry Pi 4, Linux, camera with motion detection and object recognition) controlled remotely.",
        tags: ["Python", "Raspberry Pi", "Linux", "Vision par ordinateur"],
        links: [{ labelFr: "En savoir plus ↗", labelEn: "Learn more ↗", url: "#" }] }
    ],
    experience: [
      { dateFr: "Sep 2025 — Aujourd'hui", dateEn: "Sep 2025 — Present", titleFr: "Co-fondateur & CTO", titleEn: "Co-founder & CTO", org: "Nounou Minute CI",
        descFr: "Direction technique d'une startup mobile : architecture produit, développement du MVP, intégration des paiements et déploiement sur les stores.",
        descEn: "Technical leadership of a mobile startup: product architecture, MVP development, payment integration and app-store deployment." },
      { dateFr: "Aoû 2023 — Aujourd'hui", dateEn: "Aug 2023 — Present", titleFr: "Responsable IT & Chef de Projet", titleEn: "IT Lead & Project Manager", org: "Impact'Lab — UNESCO",
        descFr: "Plateforme e-learning Moodle (200+ utilisateurs, 95% de satisfaction), coordination des programmes Génie, Youth Mobile et TEWA, refonte du site institutionnel.",
        descEn: "Moodle e-learning platform (200+ users, 95% satisfaction), coordination of the Génie, Youth Mobile and TEWA programs, institutional website redesign." },
      { dateFr: "Sep 2024 — Juin 2025", dateEn: "Sep 2024 — Jun 2025", titleFr: "Consultant en Digitalisation", titleEn: "Digitalization Consultant", org: "Prosper Cashew / TechnoServe",
        descFr: "Conception d'une plateforme LMS sur-mesure, formation de l'équipe et amélioration de 40% de l'engagement des apprenants.",
        descEn: "Built a custom LMS platform, trained the team and improved learner engagement by 40%." },
      { dateFr: "Nov 2021 — Aoû 2023", dateEn: "Nov 2021 — Aug 2023", titleFr: "Développeur Web & Formateur", titleEn: "Web Developer & Trainer", org: "Villa HOH — Univers de l'Intelligence Collective",
        descFr: "Sites web sous Laravel & WordPress, et formation de plusieurs cohortes de jeunes (jusqu'à 120) à la conception web (projet Projeunes / IRC).",
        descEn: "Laravel & WordPress websites, and training of several youth cohorts (up to 120) in web design (Projeunes / IRC program)." },
      { dateFr: "Juin 2020 — 2021", dateEn: "Jun 2020 — 2021", titleFr: "Développeur Web (Stage)", titleEn: "Web Developer (Internship)", org: "Villa HOH — Univers de l'Intelligence Collective",
        descFr: "Développement du site de l'entreprise (HTML/CSS/JS/PHP), gestion de bases MySQL et première plateforme e-learning Moodle.",
        descEn: "Built the company website (HTML/CSS/JS/PHP), MySQL database management and a first Moodle e-learning platform." }
    ],
    certs: [
      { badge: "BTS", titleFr: "BTS Informatique — Développeur d'Application", titleEn: "Software Developer Diploma (BTS)", issuer: "PIGIER Côte d'Ivoire · 2019" },
      { badge: "LIC", titleFr: "Licence — Réseaux & Génie Logiciel", titleEn: "Bachelor — Networks & Software Eng.", issuer: "IFSM Cocody" },
      { badge: "LMS", titleFr: "Moodle Expert — H5P / SCORM", titleEn: "Moodle Expert — H5P / SCORM", issuer: "Administration LMS" },
      { badge: "5G",  titleFr: "Finaliste Hackathon 5G", titleEn: "5G Hackathon Finalist", issuer: "Orange Digital Center · 2022" },
      { badge: "VIA", titleFr: "Formateur — Programme VIA", titleEn: "Trainer — VIA Program", issuer: "TotalEnergies Fondation · 2023 & 2024" },
      { badge: "MS",  titleFr: "Microsoft Excel 2016", titleEn: "Microsoft Excel 2016", issuer: "Certificat" }
    ],
    services: [
      { icon: "code", titleFr: "Développement Web & Mobile", titleEn: "Web & Mobile Development",
        descFr: "Sites et applications sur-mesure avec Laravel, Django, WordPress et React Native — du prototype à la mise en production.",
        descEn: "Custom websites and apps with Laravel, Django, WordPress and React Native — from prototype to production." },
      { icon: "lms", titleFr: "Plateformes E-learning / LMS", titleEn: "E-learning / LMS Platforms",
        descFr: "Conception, déploiement et administration de plateformes Moodle & LMS sur-mesure, avec contenus interactifs (H5P, SCORM).",
        descEn: "Design, deployment and administration of custom Moodle & LMS platforms, with interactive content (H5P, SCORM)." },
      { icon: "consult", titleFr: "Conseil & Formation", titleEn: "Consulting & Training",
        descFr: "Gestion de projet digital, accompagnement d'équipes et formation aux métiers du numérique (+300 jeunes formés).",
        descEn: "Digital project management, team support and training in digital skills (300+ youth trained)." }
    ],
    contact: {
      email: "aka.vianney@ik.me",
      phone: "+2250789814308",
      phoneDisplay: "+225 07 89 81 43 08",
      linkedin: "https://www.linkedin.com/in/akavianney/",
      linkedinDisplay: "in/akavianney",
      github: "https://github.com/vianney-aka",
      githubDisplay: "vianney-aka"
    }
  };

  const clone = (o) => JSON.parse(JSON.stringify(o));
  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }

  /* ---------- Content ---------- */
  function get() {
    const stored = read(KEY_CONTENT, null);
    if (!stored) return clone(DEFAULT_CONTENT);
    // merge so new top-level keys appear even on old saves
    const base = clone(DEFAULT_CONTENT);
    Object.keys(stored).forEach(k => { base[k] = stored[k]; });
    return base;
  }
  function save(content) { return write(KEY_CONTENT, content); }
  function reset() { try { localStorage.removeItem(KEY_CONTENT); } catch (e) {} }

  /* ---------- Messages ---------- */
  function getMessages() { return read(KEY_MESSAGES, []); }
  function addMessage(msg) {
    const list = getMessages();
    list.unshift({
      id: 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      name: msg.name || '', email: msg.email || '', message: msg.message || '',
      lang: msg.lang || 'fr', date: new Date().toISOString(), read: false
    });
    write(KEY_MESSAGES, list);
  }
  function deleteMessage(id) { write(KEY_MESSAGES, getMessages().filter(m => m.id !== id)); }
  function setRead(id, val) {
    const list = getMessages(); const m = list.find(x => x.id === id);
    if (m) { m.read = val !== false; write(KEY_MESSAGES, list); }
  }
  function markAllRead() { const l = getMessages(); l.forEach(m => m.read = true); write(KEY_MESSAGES, l); }
  function unreadCount() { return getMessages().filter(m => !m.read).length; }

  /* ---------- Auth (côté navigateur — prototype) ---------- */
  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  const Auth = {
    isSetup() { return !!localStorage.getItem(KEY_HASH); },
    async setPassword(pw) { localStorage.setItem(KEY_HASH, await sha256(pw)); },
    async check(pw) { return (await sha256(pw)) === localStorage.getItem(KEY_HASH); },
    login() { try { sessionStorage.setItem(KEY_SESSION, '1'); } catch (e) {} },
    logout() { try { sessionStorage.removeItem(KEY_SESSION); } catch (e) {} },
    isLoggedIn() { try { return sessionStorage.getItem(KEY_SESSION) === '1'; } catch (e) { return false; } }
  };

  global.VAContent = {
    DEFAULT_CONTENT, get, save, reset,
    getMessages, addMessage, deleteMessage, setRead, markAllRead, unreadCount,
    Auth
  };
})(window);
