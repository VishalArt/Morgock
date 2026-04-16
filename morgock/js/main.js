// ─── NAV HAMBURGER ───
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');

function closeNav() {
  nav.classList.remove('open');
  if (hamburger) {
    const s = hamburger.querySelectorAll('span');
    s[0].style.transform = '';
    s[1].style.opacity = '';
    s[2].style.transform = '';
  }
}

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('open');
    const s = hamburger.querySelectorAll('span');
    if (isOpen) {
      s[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      s[0].style.transform = '';
      s[1].style.opacity = '';
      s[2].style.transform = '';
    }
  });
}

// Close when a nav link is tapped
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close when tapping outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('open') && !nav.contains(e.target)) closeNav();
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
const backBtn = document.getElementById('back-top');
if (backBtn) {
  window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 400));
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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
