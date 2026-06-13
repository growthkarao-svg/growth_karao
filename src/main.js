import './style.css'

// Glow effect on service and offer cards
document.getElementById('app').onmousemove = e => {
  const cards = [...document.getElementsByClassName("service-card"), ...document.getElementsByClassName("offer-card")];
  for(const card of cards) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Number Counter Animation (requestAnimationFrame)
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds uniform duration
    const startTime = performance.now();
    
    const updateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const ease = progress * (2 - progress);
      const currentValue = Math.floor(ease * target);
      
      counter.innerText = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    
    requestAnimationFrame(updateCount);
  });
};

// Intersection Observer for stats scroll triggers
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(statsSection);
      }
    });
  }, observerOptions);
  
  observer.observe(statsSection);
}

// Navbar scroll effect
const handleScroll = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 4rem';
    navbar.style.background = 'var(--navbar-scrolled)';
    if (window.innerWidth <= 768) {
        navbar.style.padding = '0.4rem 1.5rem';
    }
  } else {
    navbar.style.padding = '0.8rem 4rem';
    navbar.style.background = 'var(--navbar-bg)';
    if (window.innerWidth <= 768) {
        navbar.style.padding = '0.6rem 1.5rem';
    }
  }
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
handleScroll(); // Run immediately on execution to catch initial scroll state

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

const updateThemeToggleUI = (theme) => {
  if (!themeToggleBtn) return;
  const iconSpan = themeToggleBtn.querySelector('.theme-icon');
  const labelSpan = themeToggleBtn.querySelector('.theme-label');
  
  if (theme === 'dark') {
    if (iconSpan) {
      iconSpan.innerText = '☀️';
      iconSpan.style.transform = 'rotate(180deg)';
    }
    if (labelSpan) labelSpan.innerText = 'Light Mode';
  } else {
    if (iconSpan) {
      iconSpan.innerText = '🌙';
      iconSpan.style.transform = 'rotate(0deg)';
    }
    if (labelSpan) labelSpan.innerText = 'Dark Mode';
  }
};

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeToggleUI('dark');
} else {
  updateThemeToggleUI('light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    const iconSpan = themeToggleBtn.querySelector('.theme-icon');
    if (iconSpan) {
      iconSpan.style.transform = 'rotate(360deg)';
    }
    
    setTimeout(() => {
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeToggleUI('light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeToggleUI('dark');
      }
    }, 150);
  });
}

// Contact Form Submission
const leadForm = document.getElementById('lead-form');
const formSuccess = document.getElementById('form-success');

if (leadForm && formSuccess) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable submit button & show loading state
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';
    
    // Simulate API request delay
    setTimeout(() => {
      leadForm.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1200);
  });
}

// Interactive Performance Chart Transitions
const metricCards = document.querySelectorAll('.metric-mini-card');
const chartMainTitle = document.getElementById('chart-main-title');
const chartSubTitle = document.getElementById('chart-sub-title');
const chartViews = document.querySelectorAll('.chart-view');
const legendGroups = document.querySelectorAll('.legend-group');

if (metricCards.length > 0) {
  if (chartMainTitle) chartMainTitle.style.transition = 'opacity 0.2s ease-in-out';
  if (chartSubTitle) chartSubTitle.style.transition = 'opacity 0.2s ease-in-out';

  const chartTitlesMap = {
    roas: {
      title: 'ROAS Optimization Trend',
      subtitle: 'Low marketing spend yielding high Return on Ad Spend (ROAS)'
    },
    scaling: {
      title: 'Lead Scale & Cost Optimization',
      subtitle: '5-Month Optimization Trend (Average Client Data)'
    },
    clients: {
      title: 'Campaigns Completed & Scaled',
      subtitle: 'Growth in successfully managed accounts & brands (200+ clients)'
    }
  };

  metricCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const targetView = card.getAttribute('data-target-view');
      if (!targetView || card.classList.contains('active')) return;

      // Update active card
      metricCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Update chart titles with fade transition
      if (chartMainTitle && chartSubTitle && chartTitlesMap[targetView]) {
        chartMainTitle.style.opacity = '0';
        chartSubTitle.style.opacity = '0';
        
        setTimeout(() => {
          chartMainTitle.textContent = chartTitlesMap[targetView].title;
          chartSubTitle.textContent = chartTitlesMap[targetView].subtitle;
          chartMainTitle.style.opacity = '1';
          chartSubTitle.style.opacity = '1';
        }, 200);
      }

      // Update SVG views
      chartViews.forEach(view => {
        if (view.id === `view-${targetView}`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      // Update Legends
      legendGroups.forEach(legend => {
        if (legend.id === `legend-${targetView}`) {
          legend.classList.add('active');
        } else {
          legend.classList.remove('active');
        }
      });
    });
  });
}
