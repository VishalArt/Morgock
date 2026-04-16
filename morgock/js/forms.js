// ============================================================
// MORGOCK.AI — Google Sheets Form Handler
// After deploying google-apps-script.js as a Web App,
// paste the Web App URL below:
// ============================================================

var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiS1vMFD6s7rixcYbss167idad7rocIVNMmut6yhK790uesvsfCtOPUltO6W3RG1St/exec";
// Example: "https://script.google.com/macros/s/AKfycbXXXXXXXXX/exec"

// ─── Generic submit to Google Sheets ──────────────────────
async function submitToSheets(payload, buttonEl, successMsg) {
  if (SCRIPT_URL === "YOUR_SCRIPT_URL_HERE" || SCRIPT_URL === "") {
    showToast("Setup needed: Add your Script URL in js/forms.js", "warn");
    return;
  }

  var original = buttonEl.innerHTML;
  buttonEl.innerHTML = '<span style="opacity:0.7">Submitting...</span>';
  buttonEl.disabled = true;

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    showToast(successMsg, "success");
    // Clear form fields
    var form = buttonEl.closest(".contact-form");
    if (form) {
      form.querySelectorAll("input:not([type=checkbox]), textarea").forEach(function(el) { el.value = ""; });
      form.querySelectorAll("select").forEach(function(el) { el.selectedIndex = 0; });
    }
  } catch (err) {
    showToast("Something went wrong. Please try again.", "error");
  } finally {
    buttonEl.innerHTML = original;
    buttonEl.disabled = false;
  }
}

// ─── Toast notification ────────────────────────────────────
function showToast(msg, type) {
  type = type || "success";
  var existing = document.getElementById("morgock-toast");
  if (existing) existing.remove();

  var colors = {
    success: { bg: "#16a34a", icon: "✅" },
    error:   { bg: "#dc2626", icon: "❌" },
    warn:    { bg: "#d97706", icon: "⚠️" }
  };
  var c = colors[type] || colors.success;

  var toast = document.createElement("div");
  toast.id = "morgock-toast";
  toast.innerHTML = c.icon + " " + msg;
  toast.style.cssText = [
    "position:fixed","bottom:2rem","left:50%",
    "transform:translateX(-50%) translateY(30px)",
    "background:" + c.bg,"color:#fff",
    "padding:1rem 2rem","border-radius:14px",
    "font-family:'DM Sans',sans-serif","font-size:0.95rem","font-weight:500",
    "z-index:99999","box-shadow:0 12px 40px rgba(0,0,0,0.5)",
    "transition:all 0.3s ease","opacity:0",
    "max-width:90vw","text-align:center","white-space:nowrap"
  ].join(";");
  document.body.appendChild(toast);

  requestAnimationFrame(function() {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(function() {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(30px)";
    setTimeout(function() { toast.remove(); }, 400);
  }, 5000);
}

// ─── Validate email ────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── 1. DEMO REQUEST FORM ─────────────────────────────────
// Writes to: Demo Requests sheet
function initDemoForm() {
  var btn = document.getElementById("demo-submit");
  if (!btn) return;

  btn.addEventListener("click", function() {
    var firstName   = (document.getElementById("d-first")   || {}).value || "";
    var lastName    = (document.getElementById("d-last")    || {}).value || "";
    var email       = (document.getElementById("d-email")   || {}).value || "";
    var company     = (document.getElementById("d-company") || {}).value || "";
    var companySize = (document.getElementById("d-size")    || {}).value || "";
    var industry    = (document.getElementById("d-industry")|| {}).value || "";
    var useCase     = (document.getElementById("d-usecase") || {}).value || "";

    if (!firstName.trim()) { showToast("Please enter your first name.", "warn"); return; }
    if (!email.trim() || !isValidEmail(email)) { showToast("Please enter a valid email address.", "warn"); return; }

    submitToSheets(
      { formType: "demo", firstName: firstName.trim(), lastName: lastName.trim(),
        email: email.trim(), company: company.trim(), companySize, industry, useCase },
      btn,
      "🎉 Demo booked! Our team will reach out within 4 hours."
    );
  });
}

// ─── 2. CONTACT / TALK TO EXPERT FORM ────────────────────
// Writes to: Contact & Expert sheet
function initContactForm() {
  var btn = document.getElementById("contact-submit");
  if (!btn) return;

  btn.addEventListener("click", function() {
    var firstName = (document.getElementById("c-first")   || {}).value || "";
    var lastName  = (document.getElementById("c-last")    || {}).value || "";
    var email     = (document.getElementById("c-email")   || {}).value || "";
    var company   = (document.getElementById("c-company") || {}).value || "";
    var interest  = (document.getElementById("c-interest")|| {}).value || "";
    var message   = (document.getElementById("c-message") || {}).value || "";

    if (!firstName.trim()) { showToast("Please enter your first name.", "warn"); return; }
    if (!email.trim() || !isValidEmail(email)) { showToast("Please enter a valid email address.", "warn"); return; }

    submitToSheets(
      { formType: "contact", firstName: firstName.trim(), lastName: lastName.trim(),
        email: email.trim(), company: company.trim(), interest, message: message.trim() },
      btn,
      "✅ Message sent! Vishal Gautam's team will reply within 1 business day."
    );
  });
}

// ─── 3. SIGN IN / SIGN UP FORM ───────────────────────────
// Writes to: Sign Ups & Logins sheet
function initSignInForm() {
  var btn = document.getElementById("signin-submit");
  if (!btn) return;

  btn.addEventListener("click", function() {
    var email = (document.getElementById("s-email") || {}).value || "";
    if (!email.trim() || !isValidEmail(email)) { showToast("Please enter a valid email address.", "warn"); return; }
    submitToSheets(
      { formType: "signin", email: email.trim(), loginMethod: "Email/Password" },
      btn,
      "✅ Login recorded! (Connect a backend for real authentication.)"
    );
  });

  var msBtn = document.getElementById("signin-microsoft");
  if (msBtn) {
    msBtn.addEventListener("click", function() {
      var email = (document.getElementById("s-email") || {}).value.trim() || "not provided";
      submitToSheets({ formType: "signin", email, loginMethod: "Microsoft SSO" }, msBtn, "Microsoft SSO attempt logged.");
    });
  }

  var gBtn = document.getElementById("signin-google");
  if (gBtn) {
    gBtn.addEventListener("click", function() {
      var email = (document.getElementById("s-email") || {}).value.trim() || "not provided";
      submitToSheets({ formType: "signin", email, loginMethod: "Google SSO" }, gBtn, "Google SSO attempt logged.");
    });
  }
}

// ─── 4. CAREERS FORM ─────────────────────────────────────
// Writes to: Career Applications (inside contact sheet)
function initCareersForm() {
  var btn = document.getElementById("careers-submit");
  if (!btn) return;

  btn.addEventListener("click", function() {
    var name      = (document.getElementById("ca-name")    || {}).value || "";
    var email     = (document.getElementById("ca-email")   || {}).value || "";
    var phone     = (document.getElementById("ca-phone")   || {}).value || "";
    var role      = (document.getElementById("ca-role")    || {}).value || "";
    var linkedin  = (document.getElementById("ca-linkedin")|| {}).value || "";
    var coverNote = (document.getElementById("ca-cover")   || {}).value || "";

    if (!name.trim()) { showToast("Please enter your full name.", "warn"); return; }
    if (!email.trim() || !isValidEmail(email)) { showToast("Please enter a valid email address.", "warn"); return; }

    submitToSheets(
      { formType: "careers", name: name.trim(), email: email.trim(),
        phone: phone.trim(), role, linkedin: linkedin.trim(), coverNote: coverNote.trim() },
      btn,
      "🚀 Application submitted! Vishal will review and get back to you."
    );
  });
}

// ─── Auto-init all forms ───────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  initDemoForm();
  initContactForm();
  initSignInForm();
  initCareersForm();
});
