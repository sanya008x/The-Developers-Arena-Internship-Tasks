// ==================== DARK/LIGHT MODE TOGGLE ====================
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  if (document.body.classList.contains('light-mode')) {
    modeToggle.textContent = '🌙 Dark';
    // Save preference to localStorage (optional)
    localStorage.setItem('theme', 'light');
  } else {
    modeToggle.textContent = '☀️ Light';
    localStorage.setItem('theme', 'dark');
  }
});

// Load saved theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    modeToggle.textContent = '🌙 Dark';
  }
});

// ==================== HAMBURGER MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navRight = document.getElementById('navRight');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navRight.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-right a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navRight.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navRight.contains(e.target)) {
      hamburger.classList.remove('active');
      navRight.classList.remove('active');
    }
  });
}

// ==================== CONTACT FORM VALIDATION ====================
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Validation: Check if all fields are filled
  if (!name || !email || !message) {
    showAlert('⚠️ Please fill out all fields!', 'warning');
    return;
  }
  
  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showAlert('❌ Please enter a valid email address!', 'error');
    return;
  }
  
  // Success message
  showAlert(`✅ Thank you, ${name}! Your message has been sent successfully.`, 'success');
  
  // Log to console (in real app, this would send to a server)
  console.log('Form submitted:', { name, email, message });
  
  // Reset form
  form.reset();
});

// ==================== CUSTOM ALERT FUNCTION ====================
function showAlert(message, type = 'info') {
  // Remove any existing alerts
  const existingAlert = document.querySelector('.custom-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement('div');
  alert.className = `custom-alert alert-${type}`;
  alert.textContent = message;
  
  // Style the alert
  alert.style.position = 'fixed';
  alert.style.top = '20px';
  alert.style.right = '20px';
  alert.style.padding = '15px 25px';
  alert.style.borderRadius = '10px';
  alert.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  alert.style.zIndex = '10000';
  alert.style.fontWeight = '600';
  alert.style.animation = 'slideInRight 0.5s ease-out';
  alert.style.maxWidth = '400px';
  
  // Set color based on type
  if (type === 'success') {
    alert.style.background = 'linear-gradient(135deg, #00d9ff, #7c3aed)';
    alert.style.color = 'white';
  } else if (type === 'error') {
    alert.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
    alert.style.color = 'white';
  } else if (type === 'warning') {
    alert.style.background = 'linear-gradient(135deg, #ffbb33, #ff8800)';
    alert.style.color = 'white';
  }
  
  // Add to page
  document.body.appendChild(alert);
  
  // Remove after 4 seconds
  setTimeout(() => {
    alert.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => alert.remove(), 500);
  }, 4000);
}

// Add CSS animation for alerts
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==================== SMOOTH SCROLL WITH OFFSET ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offset = 80; // Height of fixed nav
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== SCROLL ANIMATIONS ====================
// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});

// ==================== SKILL CARD INTERACTIONS ====================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Add a subtle pulse effect
    card.style.animation = 'pulse 0.5s ease-in-out';
  });
  
  card.addEventListener('animationend', () => {
    card.style.animation = '';
  });
});

// ==================== GALLERY LIGHTBOX EFFECT ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    // Get the overlay text
    const overlay = item.querySelector('.gallery-overlay');
    const title = overlay.querySelector('h4').textContent;
    const description = overlay.querySelector('p').textContent;
    
    // Show an alert with project details (in a real app, this would open a modal)
    showAlert(`📸 ${title}\n${description}`, 'info');
  });
});

// ==================== PROJECT CARD ANALYTICS ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const projectName = card.querySelector('h3').textContent;
    console.log(`Project clicked: ${projectName}`);
    // In a real app, this would track analytics
  });
});

// ==================== TYPING EFFECT FOR HERO (Optional Enhancement) ====================
function typeWriter(element, text, speed = 50) {
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

// Uncomment to enable typing effect on hero heading
// const heroHeading = document.querySelector('.hero-content h1');
// if (heroHeading) {
//   const originalText = heroHeading.textContent;
//   typeWriter(heroHeading, originalText, 80);
// }

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(26, 31, 58, 0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(26, 31, 58, 0.95)';
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ==================== FORM INPUT ANIMATIONS ====================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
  // Add floating label effect
  input.addEventListener('focus', () => {
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.style.color = 'var(--primary-color)';
      label.style.transform = 'translateY(-5px)';
    }
  });
  
  input.addEventListener('blur', () => {
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL' && !input.value) {
      label.style.color = 'var(--text-light)';
      label.style.transform = 'translateY(0)';
    }
  });
});

// ==================== CERTIFICATE COUNTER ANIMATION ====================
const certItems = document.querySelectorAll('.cert-item');

function animateCounter(element, target, duration = 1000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Observe certificate section and animate count when visible
const certSection = document.querySelector('#certifications');
if (certSection) {
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the certificate count
        const totalCerts = certItems.length;
        console.log(`Total Certifications: ${totalCerts}`);
        certObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  certObserver.observe(certSection);
}

// ==================== CONSOLE LOG WELCOME MESSAGE ====================
console.log('%c👋 Welcome to my portfolio!', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with HTML5, CSS Grid, Flexbox, and JavaScript', 'color: #7c3aed; font-size: 14px;');
console.log('%cWeek 5 Project - Advanced CSS & Modern Layouts', 'color: #b8bcc8; font-size: 12px;');

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});