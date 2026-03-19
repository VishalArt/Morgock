// ─── NAV HAMBURGER ───
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (nav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// Close menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    const spans = hamburger && hamburger.querySelectorAll('span');
    if (spans) { spans[0].style.transform=''; spans[1].style.opacity=''; spans[2].style.transform=''; }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('open') && !nav.contains(e.target)) {
    nav.classList.remove('open');
    const spans = hamburger && hamburger.querySelectorAll('span');
    if (spans) { spans[0].style.transform=''; spans[1].style.opacity=''; spans[2].style.transform=''; }
  }
});

// ─── TABS ───
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    const target = btn.dataset.tab;
    document.querySelectorAll(`[data-group="${group}"].tab-btn`).forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`[data-group="${group}"].tab-content`).forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tc = document.querySelector(`[data-group="${group}"][data-tab-content="${target}"]`);
    if (tc) tc.classList.add('active');
  });
});

// ─── BACK TO TOP ───
const btn = document.getElementById('back-top');
if (btn) {
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── SCROLL ANIMATION ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('fade-up'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .section-header, .features-split, .team-card, .blog-card, .pricing-card').forEach(el => {
  el.style.opacity = '0'; observer.observe(el);
});

// ─── ACTIVE NAV LINK ───
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.style.color = 'var(--accent)';
});
