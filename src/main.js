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

// Number Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      
      const inc = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCount();
  });
};

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('stats')) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
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

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  if (themeToggleBtn) themeToggleBtn.innerText = '☀️';
} else {
  if (themeToggleBtn) themeToggleBtn.innerText = '🌙';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggleBtn.innerText = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.innerText = '☀️';
    }
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
