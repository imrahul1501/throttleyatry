/**
 * ThrotalYatry — Main JavaScript
 * Premium vehicle rental website — vanilla JS, no dependencies.
 * All features initialize on DOMContentLoaded.
 */

/* ==========================================================================
   Configuration
   ========================================================================== */
const PHONE = 'tel:+917739486797';
const WHATSAPP = 'https://wa.me/917739486797';
const WHATSAPP_MSG = encodeURIComponent('Hi ThrotalYatry! I would like to inquire about vehicle rental.');
const NEWSLETTER_EMAIL = 'rahulmail0128@gmail.com';

/* ==========================================================================
   Reusable Components — Header & Footer
   ========================================================================== */

/**
 * Returns the site header HTML string.
 * Injected into #site-header if present.
 */
function injectHeader() {
  return `
    <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
    <header class="header" id="navbar" role="banner">
      <div class="container">
        <div class="navbar">
        <a href="index.html" class="logo navbar__logo" aria-label="ThrotalYatry Home">
          <span class="logo-text navbar__logo-text">Throtal<span>Yatry</span></span>
        </a>

        <nav class="nav-menu" aria-label="Main navigation">
          <ul class="nav-menu-list">
            <li class="nav-item"><a href="index.html" class="nav-link navbar__link">Home</a></li>
            <li class="nav-item"><a href="about.html" class="nav-link navbar__link">About</a></li>
            <li class="nav-item navbar__dropdown">
              <a href="#" class="nav-link navbar__link navbar__dropdown-btn">Rentals ▾</a>
              <div class="dropdown navbar__dropdown-menu">
                <a href="bike-rental.html" class="dropdown-link">Bike Rental</a>
                <a href="car-rental.html" class="dropdown-link">Car Rental</a>
                <a href="bus-rental.html" class="dropdown-link">Bus Rental</a>
              </div>
            </li>
            <li class="nav-item"><a href="tour-packages.html" class="nav-link navbar__link">Tour Packages</a></li>
            <li class="nav-item"><a href="bike-trips.html" class="nav-link navbar__link">Bike Trips</a></li>
            <li class="nav-item"><a href="gallery.html" class="nav-link navbar__link">Gallery</a></li>
            <li class="nav-item"><a href="contact.html" class="nav-link navbar__link">Contact</a></li>
            <li class="nav-item"><a href="blog.html" class="nav-link navbar__link">Blog</a></li>
          </ul>
        </nav>

        <div class="nav-actions navbar__actions">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" title="Toggle theme">🌓</button>
          <a href="${PHONE}" class="btn btn-primary btn-sm">
            <span aria-hidden="true">📞</span>
            <span>Call Now</span>
          </a>
          <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
            <span></span><span></span><span></span>
          </button>
        </div>
        </div>
      </div>
    </header>

    <!-- Mobile navigation overlay -->
    <div class="nav-overlay" id="navOverlay" aria-hidden="true"></div>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation" aria-hidden="true">
      <div class="mobile-nav__header">
        <a href="index.html" class="navbar__logo">
          <span class="navbar__logo-icon" aria-hidden="true">🛣️</span>
          <span class="navbar__logo-text">ThrotalYatry</span>
        </a>
        <button class="mobile-nav__close" id="mobileNavClose" aria-label="Close menu">&times;</button>
      </div>
      <ul class="mobile-nav__links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li>
          <button class="mobile-nav__toggle" data-submenu="rentalsSubmenu" aria-expanded="false">
            Rentals
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          </button>
          <ul class="mobile-nav__submenu" id="rentalsSubmenu">
            <li><a href="bike-rental.html">Bike Rental</a></li>
            <li><a href="car-rental.html">Car Rental</a></li>
            <li><a href="bus-rental.html">Bus Rental</a></li>
          </ul>
        </li>
        <li><a href="tour-packages.html">Tour Packages</a></li>
        <li><a href="bike-trips.html">Bike Trips</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        // <li><a href="testimonials.html">Testimonials</a></li>
        // <li><a href="faq.html">FAQ</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="blog.html">Blog</a></li>
      </ul>
      <div class="mobile-nav__footer">
        <a href="${PHONE}" class="btn btn-primary ripple">Call Now</a>
        <a href="${WHATSAPP}?text=${WHATSAPP_MSG}" class="btn btn-outline ripple" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </nav>
  `;
}

/**
 * Returns the site footer HTML string.
 * Injected into #site-footer if present.
 */
function injectFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <span class="logo-text">Throtal<span>Yatry</span></span>
            </a>
            <p class="footer-desc">
              Premium bike, car &amp; bus rentals in Ahmedabad, Gujarat. Explore Gujarat with comfort, safety, and the best fleet for every journey.
            </p>
            <div class="footer__social">
              <a href="#" aria-label="Facebook" class="footer__social-link">Facebook</a>
              <a href="#" aria-label="Instagram" class="footer__social-link">Instagram</a>
              <a href="#" aria-label="YouTube" class="footer__social-link">YouTube</a>
              <a href="${WHATSAPP}?text=${WHATSAPP_MSG}" aria-label="WhatsApp" class="footer__social-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>

          <div class="footer__column">
            <h3 class="footer__column-title">Quick Links</h3>
            <ul class="footer__links">
              <li><a href="index.html" class="footer__link">Home</a></li>
              <li><a href="about.html" class="footer__link">About Us</a></li>
              <li><a href="gallery.html" class="footer__link">Gallery</a></li>
              <li><a href="testimonials.html" class="footer__link">Testimonials</a></li>
              <li><a href="faq.html" class="footer__link">FAQ</a></li>
              <li><a href="contact.html" class="footer__link">Contact</a></li>
              <li><a href="blog.html" class="footer__link">Blog</a></li>
            </ul>
          </div>

          <div class="footer__column">
            <h3 class="footer__column-title">Vehicle Categories</h3>
            <ul class="footer__links">
              <li><a href="bike-rental.html" class="footer__link">Bike Rental</a></li>
              <li><a href="car-rental.html" class="footer__link">Car Rental</a></li>
              <li><a href="bus-rental.html" class="footer__link">Bus Rental</a></li>
              <li><a href="bike-trips.html" class="footer__link">Bike Adventure Trips</a></li>
            </ul>
            <h3 class="footer__column-title footer__column-title--spaced">Popular Destinations</h3>
            <ul class="footer__links">
              <li><a href="tour-packages.html#statue-of-unity" class="footer__link">Statue of Unity</a></li>
              <li><a href="tour-packages.html#dwarka" class="footer__link">Dwarka</a></li>
              <li><a href="tour-packages.html#somnath" class="footer__link">Somnath</a></li>
              <li><a href="tour-packages.html#kutch" class="footer__link">Rann of Kutch</a></li>
              <li><a href="tour-packages.html#gir" class="footer__link">Gir National Park</a></li>
            </ul>
          </div>

          <div class="footer__column">
            <h3 class="footer__column-title">Tour Packages</h3>
            <ul class="footer__links">
              <li><a href="tour-packages.html" class="footer__link">Ahmedabad City Tour</a></li>
              <li><a href="tour-packages.html" class="footer__link">Saputara Hill Station</a></li>
              <li><a href="tour-packages.html" class="footer__link">Polo Forest</a></li>
              <li><a href="tour-packages.html" class="footer__link">Mount Abu</a></li>
              <li><a href="bike-trips.html" class="footer__link">Upcoming Bike Trips</a></li>
            </ul>
            <div class="footer__newsletter">
              <h3 class="footer__column-title footer__column-title--spaced">Newsletter</h3>
              <p class="footer__newsletter-text">Get travel tips &amp; exclusive offers from Gujarat.</p>
              <form class="footer__newsletter-form" id="newsletterForm" novalidate>
                <input type="email" name="email" placeholder="Your email address" aria-label="Email for newsletter" required>
                <button type="submit" class="btn btn-primary ripple">Subscribe</button>
                <span class="form-feedback" aria-live="polite"></span>
              </form>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copyright">&copy; ${year} ThrotalYatry. All rights reserved. Ahmedabad, Gujarat.</p>
          <div class="footer__legal">
            <a href="privacy-policy.html" class="footer__link">Privacy Policy</a>
            <span aria-hidden="true">|</span>
            <a href="terms.html" class="footer__link">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Floating action button -->
    <div class="floating-buttons">
      <button type="button" class="floating-btn call ripple" aria-label="Open chat" title="Chat" data-open-chatbot="true">💬</button>
    </div>

    <div class="chatbot-backdrop" id="chatbotBackdrop" hidden></div>
    <div class="chatbot-panel" id="chatbotPanel" role="dialog" aria-modal="true" aria-labelledby="chatbotTitle" hidden>
      <div class="chatbot-panel__header">
        <h3 class="chatbot-panel__title" id="chatbotTitle">Quick enquiry</h3>
        <button type="button" class="chatbot-panel__close" id="closeChatbot" aria-label="Close enquiry form">×</button>
      </div>
      <div class="chatbot-panel__body">
        <p class="chatbot-panel__text">Share a few details and we’ll take you straight to WhatsApp.</p>
        <form class="chatbot-form" id="chatbotForm">
          <label>
            <span>Name</span>
            <input type="text" name="name" placeholder="Your name" required>
          </label>
          <label>
            <span>Phone</span>
            <input type="tel" name="phone" placeholder="Your phone number" required>
          </label>
          <label>
            <span>Trip / Vehicle</span>
            <input type="text" name="service" placeholder="Bike rental, car rental, etc.">
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Tell us your plans"></textarea>
          </label>
          <button type="submit" class="btn btn-primary ripple">Continue to WhatsApp</button>
        </form>
      </div>
    </div>

    <button class="scroll-top" id="scrollTopBtn" aria-label="Scroll to top" title="Back to top">↑</button>

    <!-- Sticky booking CTA -->
    <aside class="sticky-booking" id="stickyBookingCta" aria-label="Quick booking">
      <div class="container sticky-booking-inner">
        <div class="sticky-booking-text">
          <strong>Ready to explore Gujarat?</strong>
          <span>Call now for the best rental price!</span>
        </div>
        <div class="sticky-booking-actions">
          <a href="${PHONE}" class="btn btn-primary btn-sm ripple">Call Now for Best Price</a>
          <a href="contact.html" class="btn btn-outline btn-sm ripple">Enquire</a>
        </div>
      </div>
    </aside>
  `;
}

/* ==========================================================================
   Component Injection
   ========================================================================== */
function initComponentInjection() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) {
    headerEl.innerHTML = injectHeader();
  }
  if (footerEl) {
    footerEl.innerHTML = injectFooter();
  }
}

/* ==========================================================================
   2. Loader — hide on window load
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
}

/* ==========================================================================
   3. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   4. Sticky Navbar with scrolled class
   ========================================================================== */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const threshold = 60;

  const onScroll = () => {
    if (window.scrollY > threshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   Redirect relevant call buttons to WhatsApp
   ========================================================================== */
function initWhatsAppButtonRedirect() {
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    const text = (link.textContent || '').trim().toLowerCase();
    const label = `${link.getAttribute('aria-label') || ''} ${link.getAttribute('title') || ''}`.trim().toLowerCase();
    const classes = (link.className || '').toLowerCase();
    const isCallButton =
      text.includes('call now') ||
      text.includes('call to join') ||
      text.includes('call for itinerary') ||
      label.includes('call') ||
      classes.includes('btn-call') ||
      classes.includes('call');

    if (isCallButton) {
      link.setAttribute('href', `${WHATSAPP}?text=${WHATSAPP_MSG}`);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    } else {
      link.setAttribute('target', '_self');
    }
  });
}

/* ==========================================================================
   WhatsApp enquiry widget
   ========================================================================== */
function initWhatsAppEnquiryWidget() {
  const triggerButtons = document.querySelectorAll('[data-open-chatbot]');
  const panel = document.getElementById('chatbotPanel');
  const backdrop = document.getElementById('chatbotBackdrop');
  const closeButton = document.getElementById('closeChatbot');
  const form = document.getElementById('chatbotForm');

  if (!panel || !backdrop || !form) return;

  const openPanel = () => {
    panel.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add('chatbot-open');
  };

  const closePanel = () => {
    panel.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove('chatbot-open');
    form.reset();
  };

  triggerButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openPanel();
    });
  });

  backdrop.addEventListener('click', closePanel);
  closeButton?.addEventListener('click', closePanel);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closePanel();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const service = (formData.get('service') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    let text = 'Hi ThrotalYatry!';
    if (name) text += ` My name is ${name}.`;
    if (phone) text += ` My phone number is ${phone}.`;
    if (service) text += ` I am looking for ${service}.`;
    if (message) text += ` Message: ${message}`;

    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    closePanel();
  });
}

/* ==========================================================================
   5. Mobile Hamburger Menu
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!hamburger || !mobileNav || !overlay) return;

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    overlay.classList.add('is-active');
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    overlay.classList.remove('is-active');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  };

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* Mobile submenu toggles */
  mobileNav.querySelectorAll('.mobile-nav__toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const submenuId = toggle.getAttribute('data-submenu');
      const submenu = document.getElementById(submenuId);
      if (!submenu) return;

      const isOpen = submenu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* Desktop dropdown */
  document.querySelectorAll('.navbar__dropdown').forEach((dropdown) => {
    const btn = dropdown.querySelector('.navbar__dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.navbar__dropdown.is-open').forEach((d) => {
      d.classList.remove('is-open');
      d.querySelector('.navbar__dropdown-btn')?.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   6. Theme Switcher (localStorage)
   ========================================================================== */
function initThemeSwitcher() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('throtalyatry-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('throtalyatry-theme', theme);
  };

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  }

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ==========================================================================
   7. Smooth Scroll for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   8. Intersection Observer Reveal Animations with Stagger
   ========================================================================== */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal, [data-reveal]');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const stagger = parseInt(el.dataset.stagger || el.dataset.revealDelay || '0', 10);
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('reveal--visible', 'is-visible', 'active');
        }, stagger + delay);

        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el, index) => {
    if (!el.dataset.stagger && !el.dataset.revealDelay) {
      el.dataset.stagger = String((index % 6) * 100);
    }
    observer.observe(el);
  });
}

/* ==========================================================================
   9. Counter Animation for Statistics
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter], .counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter || el.dataset.target || el.textContent, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration || '2000', 10);
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted) return;
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ==========================================================================
   10. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item, [data-faq-item]');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-item__question, .faq-question, [data-faq-question]');
    const answer = item.querySelector('.faq-item__answer, .faq-answer, [data-faq-answer]');
    if (!question || !answer) return;

    question.setAttribute('aria-expanded', 'false');
    answer.setAttribute('aria-hidden', 'true');
    answer.style.maxHeight = '0';

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      /* Close all others (single-open mode) */
      faqItems.forEach((other) => {
        if (other === item) return;
        other.classList.remove('is-open');
        const q = other.querySelector('.faq-item__question, .faq-question, [data-faq-question]');
        const a = other.querySelector('.faq-item__answer, .faq-answer, [data-faq-answer]');
        q?.setAttribute('aria-expanded', 'false');
        a?.setAttribute('aria-hidden', 'true');
        if (a) a.style.maxHeight = '0';
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

/* ==========================================================================
   11. Gallery Filter + Lightbox
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter__btn, [data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item, [data-gallery-item]');
  const lightbox = document.getElementById('lightbox');

  /* Filter */
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.galleryFilter || btn.dataset.filter || 'all';

        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        galleryItems.forEach((item) => {
          const category = item.dataset.category || item.dataset.filter || '';
          const show = filter === 'all' || category === filter;
          item.style.display = show ? '' : 'none';
          if (show) {
            item.classList.add('reveal--visible');
          }
        });
      });
    });
  }

  /* Lightbox */
  if (!lightbox && galleryItems.length) {
    createLightbox();
  }

  const lb = document.getElementById('lightbox');
  if (!lb) return;

  let currentIndex = 0;
  const items = Array.from(galleryItems);
  const lbImg = lb.querySelector('.lightbox__img');
  const lbCaption = lb.querySelector('.lightbox__caption');
  const lbClose = lb.querySelector('.lightbox__close');
  const lbPrev = lb.querySelector('.lightbox__prev');
  const lbNext = lb.querySelector('.lightbox__next');

  const openLightbox = (index) => {
    currentIndex = index;
    const item = items[index];
    const img = item.querySelector('img');
    if (!img || !lbImg) return;

    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt || '';
    if (lbCaption) lbCaption.textContent = img.alt || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showSlide = (dir) => {
    currentIndex = (currentIndex + dir + items.length) % items.length;
    openLightbox(currentIndex);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => showSlide(-1));
  lbNext?.addEventListener('click', () => showSlide(1));
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showSlide(-1);
    if (e.key === 'ArrowRight') showSlide(1);
  });
}

function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Image lightbox');
  lightbox.innerHTML = `
    <div class="lightbox__content">
      <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox__nav lightbox__prev" aria-label="Previous image">&#8249;</button>
      <img class="lightbox__img" src="" alt="">
      <button class="lightbox__nav lightbox__next" aria-label="Next image">&#8250;</button>
      <p class="lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);
}

/* ==========================================================================
   12. Testimonials Auto Carousel / Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider, [data-testimonials-slider]');
  if (!slider) return;

  const track = slider.querySelector('.testimonials-slider__track, .testimonials-track');
  const cards = Array.from(slider.querySelectorAll('.testimonial-card'));
  const prevBtn = slider.querySelector('.testimonials-slider__prev, [data-slider-prev]');
  const nextBtn = slider.querySelector('.testimonials-slider__next, [data-slider-next]');
  const dotsContainer = slider.querySelector('.testimonials-slider__dots, [data-slider-dots]');

  if (!track || !cards.length) return;

  const originals = cards;
  const clonedStart = originals.map((card) => card.cloneNode(true));
  const clonedEnd = originals.map((card) => card.cloneNode(true));

  track.prepend(...clonedStart);
  track.append(...clonedEnd);

  const slides = Array.from(track.children);
  const totalSlides = originals.length;
  let currentIndex = totalSlides;
  let autoplayTimer = null;
  const interval = parseInt(slider.dataset.autoplay || '5000', 10);
  const autoplay = slider.dataset.autoplay !== 'false';
  let slideWidth = 0;
  let gap = 0;

  const updateMetrics = () => {
    if (!originals[0]) return;
    const styles = window.getComputedStyle(track);
    const gapValue = parseFloat(styles.columnGap || styles.gap || 0);
    gap = Number.isNaN(gapValue) ? 0 : gapValue;
    slideWidth = originals[0].getBoundingClientRect().width + gap;
  };

  const updateDots = () => {
    const realIndex = (currentIndex - totalSlides + totalSlides) % totalSlides;
    dotsContainer?.querySelectorAll('.testimonials-slider__dot').forEach((dot, index) => {
      dot.classList.toggle('is-active', index === realIndex);
    });
  };

  const setPosition = (index, animated = true) => {
    track.style.transition = animated ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  const goToSlide = (index) => {
    currentIndex = totalSlides + index;
    setPosition(currentIndex, true);
    updateDots();
  };

  const nextSlide = () => {
    const next = currentIndex + 1;
    if (next === totalSlides * 2) {
      setPosition(next, true);
      window.setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = totalSlides;
        setPosition(currentIndex, false);
      }, 700);
    } else {
      currentIndex = next;
      setPosition(currentIndex, true);
    }
    updateDots();
  };

  const prevSlide = () => {
    const prev = currentIndex - 1;
    if (prev < totalSlides) {
      setPosition(prev, true);
      window.setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = totalSlides * 2 - 1;
        setPosition(currentIndex, false);
      }, 700);
    } else {
      currentIndex = prev;
      setPosition(currentIndex, true);
    }
    updateDots();
  };

  if (dotsContainer && !dotsContainer.children.length) {
    originals.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'testimonials-slider__dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  const startAutoplay = () => {
    if (!autoplay) return;
    clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(() => nextSlide(), interval);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  slider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  slider.addEventListener('mouseleave', startAutoplay);

  window.addEventListener('resize', () => {
    updateMetrics();
    setPosition(currentIndex, false);
  });

  updateMetrics();
  setPosition(currentIndex, false);
  updateDots();
  startAutoplay();
}

/* ==========================================================================
   13. Vehicle / Trip Filter Tabs
   ========================================================================== */
function initFilterTabs() {
  document.querySelectorAll('.filter-tabs, [data-filter-tabs]').forEach((tabContainer) => {
    const tabs = tabContainer.querySelectorAll('.filter-tab, [data-filter-tab]');
    const targetSelector = tabContainer.dataset.filterTarget || tabContainer.dataset.target;
    const items = targetSelector
      ? document.querySelectorAll(targetSelector)
      : document.querySelectorAll(tabContainer.dataset.items || '.filter-item, [data-filter-item]');

    if (!tabs.length || !items.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter || tab.dataset.filterTab || 'all';

        tabs.forEach((t) => {
          t.classList.remove('is-active', 'active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active', 'active');
        tab.setAttribute('aria-selected', 'true');

        items.forEach((item) => {
          const category = item.dataset.category || item.dataset.filter || '';
          const show = filter === 'all' || category === filter;
          item.style.display = show ? '' : 'none';
          if (show) {
            item.classList.add('reveal--visible');
          }
        });
      });
    });
  });
}

/* ==========================================================================
   14. Form Validation (Contact, Newsletter)
   ========================================================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('#contactForm, #newsletterForm, [data-validate-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const feedback = form.querySelector('.form-feedback') || form.querySelector('[data-form-feedback]');
      let isValid = true;
      const errors = [];

      form.querySelectorAll('[required]').forEach((field) => {
        clearFieldError(field);

        if (!field.value.trim()) {
          isValid = false;
          setFieldError(field, 'This field is required.');
          errors.push(field.name);
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          isValid = false;
          setFieldError(field, 'Please enter a valid email address.');
          errors.push(field.name);
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
          isValid = false;
          setFieldError(field, 'Please enter a valid phone number.');
          errors.push(field.name);
        }
      });

      if (!isValid) {
        showFormFeedback(feedback, 'Please fix the errors above.', 'error');
        form.querySelector('.is-invalid')?.focus();
        return;
      }

      const isNewsletterForm = form.id === 'newsletterForm' || form.classList.contains('newsletter-form') || form.classList.contains('footer__newsletter-form');
      if (isNewsletterForm) {
        const emailField = form.querySelector('input[type="email"]');
        const subscriberEmail = emailField?.value.trim() || '';
        const subject = encodeURIComponent('Newsletter subscription request');
        const body = encodeURIComponent(`Hello ThrotalYatry,\n\nPlease subscribe this email address to your newsletter:\n${subscriberEmail}`);
        window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`;
      }

      showFormFeedback(feedback, 'Thank you! We will get back to you shortly.', 'success');
      form.reset();
    });

    form.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('blur', () => {
        if (field.hasAttribute('required') && !field.value.trim()) {
          setFieldError(field, 'This field is required.');
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
          setFieldError(field, 'Please enter a valid email address.');
        } else {
          clearFieldError(field);
        }
      });
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  return /^[\d\s+\-()]{7,15}$/.test(phone.trim());
}

function setFieldError(field, message) {
  field.classList.add('is-invalid');
  field.setAttribute('aria-invalid', 'true');
  let errorEl = field.parentElement.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.setAttribute('role', 'alert');
    field.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  field.removeAttribute('aria-invalid');
  field.parentElement.querySelector('.field-error')?.remove();
}

function showFormFeedback(el, message, type) {
  if (!el) return;
  el.textContent = message;
  el.className = `form-feedback form-feedback--${type}`;
}

/* ==========================================================================
   15. Lazy Loading Images (loading="lazy" + IntersectionObserver)
   ========================================================================== */
function initLazyLoading() {
  document.querySelectorAll('img:not([loading])').forEach((img) => {
    if (!img.closest('.hero, .hero-slider, .loader')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  const lazyImages = document.querySelectorAll('img[data-src], img.lazy');

  if (!lazyImages.length || !('IntersectionObserver' in window)) {
    lazyImages.forEach((img) => loadLazyImage(img));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadLazyImage(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '200px 0px' }
  );

  lazyImages.forEach((img) => observer.observe(img));
}

function loadLazyImage(img) {
  const src = img.dataset.src;
  if (!src) return;

  img.src = src;
  img.removeAttribute('data-src');
  img.classList.add('is-loaded');

  img.addEventListener('load', () => img.classList.add('lazy-loaded'), { once: true });
}

/* ==========================================================================
   16. Scroll to Top Button
   ========================================================================== */
function initScrollToTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  const showThreshold = 400;

  window.addEventListener('scroll', () => {
    if (window.scrollY > showThreshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   17. Sticky Booking CTA — show after scroll
   ========================================================================== */
function initStickyBookingCta() {
  const cta = document.getElementById('stickyBookingCta');
  if (!cta) return;

  const showThreshold = 600;

  window.addEventListener('scroll', () => {
    if (window.scrollY > showThreshold) {
      cta.classList.add('visible');
    } else {
      cta.classList.remove('visible');
    }
  }, { passive: true });
}

/* ==========================================================================
   18. Hero Particles Generation
   ========================================================================== */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles, [data-particles]');
  if (!container || container.children.length > 0) return;

  const count = parseInt(container.dataset.particleCount || '40', 10);

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'hero-particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      animation-duration: ${4 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 5}s;
      opacity: ${0.2 + Math.random() * 0.5};
    `;
    container.appendChild(particle);
  }
}

/* ==========================================================================
   19. Typing Effect for Hero
   ========================================================================== */
function initTypingEffect() {
  const elements = document.querySelectorAll('.hero__typing, [data-typing]');
  if (!elements.length) return;

  elements.forEach((el) => {
    const words = (el.dataset.typingWords || el.dataset.words || 'Bike Rentals,Car Rentals,Bus Rentals,Gujarat Tours')
      .split(',')
      .map((w) => w.trim());
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = parseInt(el.dataset.typingSpeed || '80', 10);

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? speed / 2 : speed;

      if (!isDeleting && charIndex === currentWord.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      setTimeout(type, delay);
    };

    type();
  });
}

/* ==========================================================================
   20. Parallax on Scroll
   ========================================================================== */
function initParallax() {
  const parallaxEls = document.querySelectorAll('.parallax, [data-parallax]');
  if (!parallaxEls.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const onScroll = () => {
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || el.dataset.speed || '0.3');
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   21. Ripple Effect on Buttons
   ========================================================================== */
function initRippleEffect() {
  document.querySelectorAll('.ripple, .btn, [data-ripple]').forEach((btn) => {
    if (btn.dataset.rippleInit) return;
    btn.dataset.rippleInit = 'true';

    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ==========================================================================
   22. Image Slider for Hero / Featured Section
   ========================================================================== */
function initHeroSlider() {
  document.querySelectorAll('.hero-slider, [data-hero-slider]').forEach((slider) => {
    const slides = slider.querySelectorAll('.hero-slider__slide, .hero-slide');
    const dotsContainer = slider.querySelector('.hero-slider__dots, [data-slider-dots]');
    const prevBtn = slider.querySelector('.hero-slider__prev, [data-slider-prev]');
    const nextBtn = slider.querySelector('.hero-slider__next, [data-slider-next]');

    if (slides.length <= 1) return;

    let current = 0;
    let timer = null;
    const interval = parseInt(slider.dataset.interval || '6000', 10);

    const goTo = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
      dotsContainer?.querySelectorAll('.hero-slider__dot').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
      });
    };

    if (dotsContainer && !dotsContainer.children.length) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'hero-slider__dot';
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => { goTo(i); resetTimer(); });
        dotsContainer.appendChild(dot);
      });
    }

    const next = () => goTo(current + 1);
    const resetTimer = () => {
      clearInterval(timer);
      timer = setInterval(next, interval);
    };

    prevBtn?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', resetTimer);

    goTo(0);
    resetTimer();
  });
}

/* ==========================================================================
   Master Initializer — runs on DOMContentLoaded
   ========================================================================== */
function initThrotalYatry() {
  initComponentInjection();

  /* Re-init features that depend on injected header/footer */
  initLoader();
  initScrollProgress();
  initStickyNavbar();
  initMobileNav();
  initThemeSwitcher();
  initSmoothScroll();
  initRevealAnimations();
  initCounters();
  initFaqAccordion();
  initGallery();
  initWhatsAppButtonRedirect();
  initWhatsAppEnquiryWidget();

  initTestimonialsSlider();
  initFilterTabs();
  initFormValidation();
  initLazyLoading();
  initScrollToTop();
  initStickyBookingCta();
  initHeroParticles();
  initTypingEffect();
  initParallax();
  initRippleEffect();
  initHeroSlider();
}

/* Export for module usage; auto-init on DOM ready */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PHONE,
    WHATSAPP,
    injectHeader,
    injectFooter,
    initThrotalYatry,
  };
}

document.addEventListener('DOMContentLoaded', initThrotalYatry);

