// script.js

// ==========================================
// CONFIGURATION - Update these links
// ==========================================
const WHATSAPP_INVITE_LINK = "https://chat.whatsapp.com/your-invite-link";
const SPEAKER_REGISTRATION_LINK = "https://tally.so/r/your-speaker-form";

// Countdown target: July 17, 2026 20:00 WAT (UTC+1)
const COUNTDOWN_TARGET = new Date("2026-07-17T19:00:00Z").getTime(); // 20:00 WAT = 19:00 UTC

// ==========================================
// CONFIRMED SPEAKERS DATA
// Replace with real speaker info as they confirm
// ==========================================
const speakers = [
  {
    name: "Dr. Amina Diallo",
    role: "AI Research Scientist",
    company: "Google DeepMind",
    country: "Senegal 🇸🇳",
    topic: "The Future of AI in Africa",
    linkedin: "#",
    emoji: "👩🏾‍🔬"
  },
  {
    name: "David Okafor",
    role: "Senior Software Engineer",
    company: "Stripe",
    country: "Nigeria 🇳🇬",
    topic: "Building Global Products",
    linkedin: "#",
    emoji: "👨🏾‍💻"
  },
  {
    name: "Lina Mwangi",
    role: "Product Design Lead",
    company: "Linear",
    country: "Kenya 🇰🇪",
    topic: "Designing for Scale",
    linkedin: "#",
    emoji: "👩🏻‍🎨"
  },
  {
    name: "Kwame Asare",
    role: "Cloud Solutions Architect",
    company: "Microsoft",
    country: "Ghana 🇬🇭",
    topic: "Cloud Computing 101",
    linkedin: "#",
    emoji: "👨🏾‍💼"
  },
  {
    name: "Zuri Abebe",
    role: "Founder & CEO",
    company: "AfriTech Ventures",
    country: "Ethiopia 🇪🇹",
    topic: "From Idea to Startup",
    linkedin: "#",
    emoji: "👩🏾‍🚀"
  },
  {
    name: "Omar Benali",
    role: "Data Engineering Manager",
    company: "Vercel",
    country: "Morocco 🇲🇦",
    topic: "Data Careers in 2026",
    linkedin: "#",
    emoji: "🧑🏾‍🔬"
  },
  {
    name: "Chioma Eze",
    role: "Developer Advocate",
    company: "GitHub",
    country: "Nigeria 🇳🇬",
    topic: "Open Source & Community",
    linkedin: "#",
    emoji: "👩🏾‍💻"
  },
  {
    name: "Tendai Mutasa",
    role: "UX Researcher",
    company: "Spotify",
    country: "Zimbabwe 🇿🇼",
    topic: "User Research Fundamentals",
    linkedin: "#",
    emoji: "👩🏾‍🔍"
  }
];

// ==========================================
// PARTICLE SYSTEM (Premium animated background)
// ==========================================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  const particles = [];
  const PARTICLE_COUNT = 70;
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 160, 255, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
  
  // Connect nearby particles with lines
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 130, 255, ${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawLines();
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ==========================================
// COUNTDOWN TIMER
// ==========================================
function updateCountdown() {
  const now = Date.now();
  const distance = COUNTDOWN_TARGET - now;
  
  const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };
  
  if (!elements.days) return;
  
  if (distance < 0) {
    Object.values(elements).forEach(el => el.textContent = '00');
    return;
  }
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  elements.days.textContent = String(days).padStart(2, '0');
  elements.hours.textContent = String(hours).padStart(2, '0');
  elements.minutes.textContent = String(minutes).padStart(2, '0');
  elements.seconds.textContent = String(seconds).padStart(2, '0');
}

// ==========================================
// RENDER SPEAKERS
// ==========================================
function renderSpeakers() {
  const grid = document.getElementById('speakerGrid');
  if (!grid) return;
  
  grid.innerHTML = speakers.map(s => `
    <div class="speaker-card">
      <div class="speaker-photo">${s.emoji}</div>
      <h3 class="speaker-name">${s.name}</h3>
      <p class="speaker-role">${s.role} at ${s.company}</p>
      <p class="speaker-country">${s.country}</p>
      <span class="speaker-topic">${s.topic}</span>
      <a href="${s.linkedin}" class="linkedin-link" target="_blank" rel="noopener">LinkedIn ↗</a>
    </div>
  `).join('');
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function setupFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Close all others
      document.querySelectorAll('.faq-item.active').forEach(el => {
        if (el !== item) el.classList.remove('active');
      });
      
      item.classList.toggle('active');
    });
  });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.about-card, .attend-card, .timeline-card, .speaker-card, .apply-step, .gallery-item, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function setupMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;
  
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    nav.style.display = expanded ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'rgba(5,5,16,0.95)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.padding = '1.5rem';
    nav.style.borderBottom = '1px solid var(--border)';
  });
}

// ==========================================
// BUTTON HANDLERS
// ==========================================
function setupButtons() {
  const speakerLink = SPEAKER_REGISTRATION_LINK;
  const whatsappLink = WHATSAPP_INVITE_LINK;
  
  const buttonMap = [
    { id: 'joinBootcampBtn', link: whatsappLink },
    { id: 'becomeSpeakerBtn', link: speakerLink },
    { id: 'becomeSpeakerSecondary', link: speakerLink },
    { id: 'joinWhatsAppBtn', link: whatsappLink },
    { id: 'footerJoinBtn', link: whatsappLink },
  ];
  
  buttonMap.forEach(({ id, link }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link, '_blank');
      });
    }
  });
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderSpeakers();
  setupFAQ();
  setupScrollReveal();
  setupMobileMenu();
  setupButtons();
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        const nav = document.querySelector('.nav-links');
        if (nav && nav.style.display === 'flex') {
          nav.style.display = 'none';
          document.querySelector('.mobile-menu-btn')?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
