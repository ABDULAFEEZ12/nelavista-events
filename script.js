// script.js

// ==========================================
// CONFIGURATION - Links
// ==========================================
const WHATSAPP_INVITE_LINK = "https://chat.whatsapp.com/GhOve0pYW6IJCA1s8U97cz?mode=gi_t";
const SPEAKER_REGISTRATION_LINK = "https://chat.whatsapp.com/Cp629njgkL4D3mphhM3QG5?mode=gi_t";

// Countdown target: July 17, 2026 20:00 WAT (UTC+1)
const COUNTDOWN_TARGET = new Date("2026-07-17T19:00:00Z").getTime(); // 20:00 WAT = 19:00 UTC

// ==========================================
// CONFIRMED SPEAKERS DATA
// Images: assets/images/speakers/
// ==========================================
const speakers = [
  {
    name: "Durojaiye Yusuf O.",
    role: "ESG | hPBP-AI Lead Researcher",
    company: "TENANCY AI",
    country: "Nigeria 🇳🇬",
    topic: "AI Research & Sustainability",
    expertise: "Co-founder, AI Lead Researcher",
    linkedin: "https://www.linkedin.com/in/the-durojaiye?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "assets/images/speakers/speaker-durojaiye-yusuf.jpg"
  },
  {
    name: "Epaphras Adelabi",
    role: "Entrepreneur | Lecturer in Business",
    company: "SaaS & EdTech Ventures",
    country: "Nigeria 🇳🇬",
    topic: "Product Design & Business Strategy",
    expertise: "Product Owner, Business Analyst, Brand Consultant, Global Talent",
    linkedin: "https://www.linkedin.com/in/epaphrasadelabi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "assets/images/speakers/speaker-epaphras-adelabi.jpg"
  },
  {
    name: "Ernest Gavor",
    role: "Edtech Ecosystem Strategist",
    company: "AEE & Africa Pavilion @ Bett",
    country: "Ghana 🇬🇭",
    topic: "Africa Education Innovation",
    expertise: "AI Maturity Consulting, Policy Advisory, Investment Facilitation, Angel Investor, Entrepreneurs Coach",
    linkedin: "https://www.linkedin.com/in/ernestgavor?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "assets/images/speakers/speaker-ernest-gavor.jpg"
  },
  {
    name: "Shoyombo (Olanrewaju) Moshood",
    role: "Mastercard Foundation Scholar",
    company: "Data Science & AI Professional",
    country: "Nigeria 🇳🇬",
    topic: "Data Science & AI Applications",
    expertise: "Mathematician, Data Scientist, AI Professional, Web App Developer",
    linkedin: "https://www.linkedin.com/in/shoyombo-moshood-582003126?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "assets/images/speakers/speaker-sholoyombo-moshood.jpg"
  }
];

// ==========================================
// PARTICLE SYSTEM
// ==========================================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  const particles = [];
  const PARTICLE_COUNT = 60;
  
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
      this.size = Math.random() * 1.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.08;
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
      ctx.fillStyle = `rgba(150, 170, 255, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
  
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
          ctx.strokeStyle = `rgba(130, 155, 255, ${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.4;
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
// RENDER SPEAKERS WITH ACTUAL IMAGES
// ==========================================
function renderSpeakers() {
  const grid = document.getElementById('speakerGrid');
  if (!grid) return;
  
  grid.innerHTML = speakers.map(s => `
    <div class="speaker-card">
      <div class="speaker-photo">
        <img 
          src="${s.image}" 
          alt="Photo of ${s.name}" 
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'speaker-photo-placeholder\\'>👤</span>';"
        >
      </div>
      <h3 class="speaker-name">${s.name}</h3>
      <p class="speaker-role">${s.role}</p>
      <p class="speaker-country">${s.country}</p>
      <span class="speaker-topic">${s.topic}</span>
      <p class="speaker-expertise">${s.expertise}</p>
      <a href="${s.linkedin}" class="linkedin-link" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  
  document.querySelectorAll('.about-card, .attend-card, .timeline-card, .speaker-card, .apply-step, .gallery-item, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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
    nav.style.background = 'rgba(8, 8, 22, 0.96)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.padding = '1.5rem';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    nav.style.borderRadius = '0 0 1.5rem 1.5rem';
    nav.style.zIndex = '99';
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
        const nav = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (nav && nav.style.display === 'flex') {
          nav.style.display = 'none';
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
