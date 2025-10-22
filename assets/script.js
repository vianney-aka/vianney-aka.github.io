// ===================================
// LOADER
// ===================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 500);
});

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll (optimized with requestAnimationFrame)
let ticking = false;

function updateNavbar() {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

// Optimized scroll listener with throttle
let highlightTicking = false;

window.addEventListener('scroll', () => {
  if (!highlightTicking) {
    window.requestAnimationFrame(() => {
      highlightNavLink();
      highlightTicking = false;
    });
    highlightTicking = true;
  }
}, { passive: true });

// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  // Save theme preference
  const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  
  // Add animation to toggle button
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)';
  }, 300);
});

// ===================================
// PROJECT FILTERS
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card, index) => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        // Stagger animation for smooth appearance
        setTimeout(() => {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===================================
// SCROLL ANIMATIONS (Intersection Observer)
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      
      // Animate skill bars when visible
      if (entry.target.classList.contains('skill-category')) {
        const skillBars = entry.target.querySelectorAll('.skill-bar div');
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// Observe skill categories for bar animation
document.querySelectorAll('.skill-category').forEach(el => {
  observer.observe(el);
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    
    try {
      // If using Formspree or similar service
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        submitBtn.textContent = '✓ Message envoyé !';
        submitBtn.style.background = 'var(--secondary)';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      // Error
      submitBtn.textContent = '✗ Erreur, réessayez';
      submitBtn.style.background = 'var(--accent)';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// ===================================
// TYPING EFFECT (Optional)
// ===================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Example usage (uncomment to activate):
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 80);
// }

// ===================================
// PARALLAX EFFECT (Optimized)
// ===================================
let parallaxTicking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-image');
  
  parallaxElements.forEach(el => {
    const speed = 0.3;
    el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
  });
  
  parallaxTicking = false;
}

window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    window.requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
}, { passive: true });

// ===================================
// CURSOR TRAIL EFFECT (Optional)
// ===================================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY });
  
  if (cursorTrail.length > trailLength) {
    cursorTrail.shift();
  }
});

// ===================================
// LAZY LOADING IMAGES (Enhanced)
// ===================================
const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      // Add fade-in effect
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in';
      
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', () => {
          img.style.opacity = '1';
        });
      }
      
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounce already applied via requestAnimationFrame above

// ===================================
// EASTER EGG: KONAMI CODE
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-konamiSequence.length);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// ===================================
// ANALYTICS (Optional - Google Analytics)
// ===================================
// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // If Google Analytics is installed:
    // gtag('event', 'click', {
    //   'event_category': 'Button',
    //   'event_label': btn.textContent
    // });
    console.log('Button clicked:', btn.textContent);
  });
});

// Track project card clicks
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const projectName = card.querySelector('h3').textContent;
    console.log('Project viewed:', projectName);
  });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Bonjour!', 'font-size: 20px; font-weight: bold; color: #0066FF;');
console.log('%cVous êtes curieux? J\'aime ça! 🚀', 'font-size: 14px; color: #00C853;');
console.log('%cSi vous cherchez un développeur passionné, contactez-moi!', 'font-size: 12px;');
console.log('%c📧 contact@vianney-aka.com', 'font-size: 12px; color: #0066FF;');

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Aller au contenu principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for project cards
projectCards.forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const link = card.querySelector('.project-link');
      if (link) link.click();
    }
  });
});

// ===================================
// PRINT STYLES
// ===================================
window.addEventListener('beforeprint', () => {
  // Expand all sections for printing
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display = 'block';
  });
});

// ===================================
// SERVICE WORKER (Optional - for PWA)
// ===================================
if ('serviceWorker' in navigator) {
  // Uncomment to enable PWA
  // navigator.serviceWorker.register('/sw.js')
  //   .then(reg => console.log('Service Worker registered'))
  //   .catch(err => console.log('Service Worker registration failed'));
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio initialized ✓');
  
  // Add initial animations
  document.body.classList.add('loaded');
  
  // Trigger initial scroll check
  highlightNavLink();
});
