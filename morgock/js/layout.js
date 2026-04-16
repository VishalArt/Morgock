// Shared layout injected on every page
const NAV_HTML = `
<nav id="main-nav">
  <a href="../index.html" class="nav-logo">morgock.ai</a>
  <ul class="nav-links">
    <li class="dropdown"><a href="#">Solutions ▾</a>
      <div class="dropdown-menu">
        <a href="ai-for-banking.html">AI for Banking</a>
        <a href="ai-for-healthcare.html">AI for Healthcare</a>
        <a href="ai-for-retail.html">AI for Retail</a>
        <a href="ai-for-it.html">AI for IT</a>
        <a href="ai-for-hr.html">AI for HR</a>
      </div>
    </li>
    <li class="dropdown"><a href="#">Platform ▾</a>
      <div class="dropdown-menu">
        <a href="platform.html">Agent Platform</a>
        <a href="ai-for-work.html">AI for Work</a>
        <a href="ai-for-service.html">AI for Service</a>
        <a href="ai-for-process.html">AI for Process</a>
      </div>
    </li>
    <li><a href="pricing.html">Pricing</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <div class="nav-ctas">
    <a href="sign-in.html" class="btn btn-ghost">Sign In</a>
    <a href="demo.html" class="btn btn-primary">Request Demo</a>
  </div>
  <div class="hamburger"><span></span><span></span><span></span></div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="nav-logo">morgock.ai</div>
      <p>Agentic AI applications for the enterprise. Built on the industry-leading, analyst-recognized agent platform.</p>
    </div>
    <div class="footer-col">
      <h5>Solutions</h5>
      <a href="pages/ai-for-banking.html">AI for Banking</a>
      <a href="pages/ai-for-healthcare.html">AI for Healthcare</a>
      <a href="pages/ai-for-retail.html">AI for Retail</a>
      <a href="pages/ai-for-it.html">AI for IT</a>
      <a href="pages/ai-for-hr.html">AI for HR</a>
    </div>
    <div class="footer-col">
      <h5>Platform</h5>
      <a href="pages/platform.html">Agent Platform</a>
      <a href="pages/ai-for-work.html">AI for Work</a>
      <a href="pages/ai-for-service.html">AI for Service</a>
      <a href="pages/ai-for-process.html">AI for Process</a>
    </div>
    <div class="footer-col">
      <h5>Company</h5>
      <a href="pages/about.html">About Us</a>
      <a href="pages/blog.html">Blog</a>
      <a href="pages/careers.html">Careers</a>
      <a href="pages/contact.html">Contact</a>
    </div>
    <div class="footer-col">
      <h5>Resources</h5>
      <a href="pages/pricing.html">Pricing</a>
      <a href="pages/demo.html">Request Demo</a>
      <a href="pages/sign-in.html">Sign In</a>
      <a href="#">Documentation</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 morgock.ai Inc. All rights reserved.</span>
    <span>Privacy Policy · Terms of Service · Security</span>
  </div>
</footer>
<button id="back-top">↑</button>`;

// Inject into page
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
