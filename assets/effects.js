// ===================================
// VISUAL EFFECTS - Portfolio animations
// Particles, Scroll Reveal, Counters,
// Typing effect, Magnetic hover, Back to top
// ===================================

// ===================================
// PARTICLE BACKGROUND
// ===================================
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouse = { x: null, y: null };

  function resize() {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(45, 123, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(45, 123, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawLines();
    animationId = requestAnimationFrame(animate);
  }

  const hero = document.getElementById('home');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > canvas.width) p.x = Math.random() * canvas.width;
      if (p.y > canvas.height) p.y = Math.random() * canvas.height;
    });
  });

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate();
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0.1 });

  if (hero) heroObserver.observe(hero);

  init();
  animate();
})();

// ===================================
// SCROLL REVEAL (Enhanced)
// ===================================
(function () {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(c => c === entry.target || c.matches('.project-card, .skill-category, .timeline-item, .info-item')) : [];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.max(0, idx) * 100;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  const selectors = '[data-reveal], .project-card, .skill-category, .timeline-item, .info-item, .certifications';
  document.querySelectorAll(selectors).forEach(el => {
    revealObserver.observe(el);
  });
})();

// ===================================
// COUNTER ANIMATION
// ===================================
(function () {
  const counters = document.querySelectorAll('[data-counter]');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'), 10);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }
})();

// ===================================
// TYPING EFFECT (Hero subtitle)
// ===================================
(function () {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const roles = [
    'Développeur Full Stack',
    'Administrateur LMS',
    'Chef de Projet Digital',
    'Expert Moodle',
    'Formateur Tech'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  setTimeout(() => { startTyping(); }, 4000);

  function startTyping() {
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex <= currentRole.length) {
      subtitle.textContent = currentRole.substring(0, charIndex);
      charIndex++;
      if (charIndex > currentRole.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2500);
        return;
      }
    }

    if (isDeleting && charIndex >= 0) {
      subtitle.textContent = currentRole.substring(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    if (!isPaused) {
      const speed = isDeleting ? 40 : 80;
      setTimeout(type, speed);
    }
  }

  function type() { startTyping(); }
})();

// ===================================
// SMOOTH MAGNETIC HOVER ON CARDS
// ===================================
(function () {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// ===================================
// BACK TO TOP BUTTON
// ===================================
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
  btn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(btn);

  Object.assign(btn.style, {
    position: 'fixed', bottom: '2rem', right: '2rem',
    width: '48px', height: '48px', borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
    color: '#fff', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(45, 123, 255, 0.3)',
    zIndex: '8000', opacity: '0', transform: 'translateY(20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none'
  });

  btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px) scale(1.1)';
    btn.style.boxShadow = '0 6px 28px rgba(45, 123, 255, 0.5)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = '0 4px 20px rgba(45, 123, 255, 0.3)';
  });

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
          btn.style.transform = 'translateY(0)';
        } else {
          btn.style.opacity = '0';
          btn.style.pointerEvents = 'none';
          btn.style.transform = 'translateY(20px)';
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
})();
