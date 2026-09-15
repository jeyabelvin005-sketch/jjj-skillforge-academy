/* ========================================
   JJJ SkillForge Academy
   Main JavaScript
   ======================================== */

/*
  IMPORTANT:
  This is your deployed Google Apps Script Web App URL.
  It must end with /exec.
*/
const API_URL =
  "https://script.google.com/macros/s/AKfycbxG-rbeR0rBqOwBT6Wi3MELYkaLZHreqZZX8aYonx_kGbZ0t-ucPGVSVDGoAZfwOMc6/exec";

/* ========================================
   DOM Elements
   ======================================== */

const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("nav-menu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const loader = document.getElementById("loader");
const backToTopBtn = document.getElementById("backToTop");
const registrationForm = document.getElementById("registrationForm");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");
const counters = document.querySelectorAll(".counter");
const copyUpiBtn = document.getElementById("copyUpiBtn");
const upiIdText = document.getElementById("upiIdText");

/* ========================================
   Loading Screen
   ======================================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hidden");
    }
  }, 900);
});

/* ========================================
   Navbar / Scroll Features
   ======================================== */

function handleScroll() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 70);
  }

  if (backToTopBtn) {
    backToTopBtn.classList.toggle("visible", window.scrollY > 500);
  }

  updateActiveNavigation();
  handleHeroParallax();
}

window.addEventListener("scroll", handleScroll);
handleScroll();

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const currentScroll = window.scrollY;

  sections.forEach((section) => {
    const top = section.offsetTop - 145;
    const bottom = top + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    const navLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`
    );

    if (navLink && currentScroll >= top && currentScroll < bottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
}

function handleHeroParallax() {
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && window.scrollY < window.innerHeight) {
    heroVisual.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }
}

/* ========================================
   Mobile Navigation
   ======================================== */

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (hamburger) {
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }

    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navMenu &&
    hamburger &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
});

/* ========================================
   Smooth Anchor Scrolling
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      window.scrollTo({
        top: target.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  });
});

/* ========================================
   Back to Top
   ======================================== */

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ========================================
   Course Filter
   ======================================== */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    courseCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow =
        selectedCategory === "all" || selectedCategory === category;

      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

/* ========================================
   Scroll Reveal
   ======================================== */

const revealElements = document.querySelectorAll(
  ".about-card, .highlight-item, .course-card, .why-card, .process-step, .registration-form-container, .info-card, .payment-container, .contact-card, .contact-form-container"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
    element.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);
  });
}

/* ========================================
   Hero Counter
   ======================================== */

function animateCounter(counterElement) {
  const target = Number(counterElement.dataset.target || 0);
  const duration = 1100;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);

    counterElement.textContent = String(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counterElement.textContent = String(target);
    }
  }

  requestAnimationFrame(update);
}

const heroSection = document.getElementById("home");

if (heroSection && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => animateCounter(counter));
          heroObserver.unobserve(heroSection);
        }
      });
    },
    { threshold: 0.35 }
  );

  heroObserver.observe(heroSection);
}

/* ========================================
   Toast Notifications
   ======================================== */

let toastTimer;

function showToast(message, type = "success") {
  if (!toast || !toastText) {
    window.alert(message);
    return;
  }

  const toastHeading = toast.querySelector(".toast-message h4");
  const iconBox = toast.querySelector(".toast-icon");
  const icon = toast.querySelector(".toast-icon i");

  toastText.textContent = message;

  if (type === "error") {
    if (toastHeading) {
      toastHeading.textContent = "Unable to submit";
    }

    if (iconBox) {
      iconBox.style.background = "rgba(239, 68, 68, 0.18)";
      iconBox.style.color = "#f87171";
    }

    if (icon) {
      icon.className = "fas fa-circle-exclamation";
    }
  } else {
    if (toastHeading) {
      toastHeading.textContent = "Success!";
    }

    if (iconBox) {
      iconBox.style.background = "rgba(39, 201, 63, 0.16)";
      iconBox.style.color = "#4ade80";
    }

    if (icon) {
      icon.className = "fas fa-circle-check";
    }
  }

  clearTimeout(toastTimer);

  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

/* ========================================
   Validation Helpers
   ======================================== */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

/* ========================================
   Google Sheets Submission
   ======================================== */

/*
  This sends URL-encoded form data.

  Do not change this to:
  Content-Type: application/json

  JSON usually triggers an OPTIONS preflight request.
  Google Apps Script Web Apps do not handle that preflight in the
  same way as a normal CORS API.

  Apps Script receives these submitted fields through e.parameter.
*/
async function sendToGoogleSheets(data) {
  const encodedData = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    encodedData.append(key, value ?? "");
  });

  /*
    "no-cors" avoids browser blocking for a Google Apps Script Web App.
    The request can be sent, but the browser cannot read the response.

    Therefore, the website treats a completed fetch request as submitted.
    Confirm actual saving by checking Google Sheets / Apps Script Executions.
  */
  await fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    body: encodedData,
  });
}

/* ========================================
   Registration Form
   ======================================== */

if (registrationForm) {
  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const mode = document.getElementById("mode").value;
    const batch = document.getElementById("batch").value;
    const message = document.getElementById("message").value.trim();

    if (!studentName) {
      showToast("Please enter the student name.", "error");
      document.getElementById("studentName").focus();
      return;
    }

    if (!isValidPhone(phone)) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      document.getElementById("phone").focus();
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.", "error");
      document.getElementById("email").focus();
      return;
    }

    if (!course) {
      showToast("Please select a course.", "error");
      document.getElementById("course").focus();
      return;
    }

    if (!mode) {
      showToast("Please select a learning mode.", "error");
      document.getElementById("mode").focus();
      return;
    }

    const formData = {
      type: "registration",
      studentName,
      phone,
      email,
      course,
      mode,
      batch,
      message,
    };

    const submitButton = registrationForm.querySelector(
      'button[type="submit"]'
    );
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    try {
      await sendToGoogleSheets(formData);

      registrationForm.reset();

      showToast(
        "Registration submitted successfully! We will contact you soon.",
        "success"
      );
    } catch (error) {
      console.error("Registration form error:", error);

      showToast(
        "The registration could not be submitted. Please try again.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

/* ========================================
   Contact Form
   ======================================== */

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name) {
      showToast("Please enter your name.", "error");
      document.getElementById("contactName").focus();
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.", "error");
      document.getElementById("contactEmail").focus();
      return;
    }

    if (phone && !isValidPhone(phone)) {
      showToast(
        "Enter a valid 10-digit phone number or leave it blank.",
        "error"
      );
      document.getElementById("contactPhone").focus();
      return;
    }

    if (!message) {
      showToast("Please enter your message.", "error");
      document.getElementById("contactMessage").focus();
      return;
    }

    const formData = {
      type: "contact",
      name,
      email,
      phone,
      message,
    };

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      await sendToGoogleSheets(formData);

      contactForm.reset();

      showToast(
        "Your message was sent successfully! We will get back to you soon.",
        "success"
      );
    } catch (error) {
      console.error("Contact form error:", error);

      showToast(
        "The message could not be sent. Please try again.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

/* ========================================
   Copy UPI ID
   ======================================== */

if (copyUpiBtn && upiIdText) {
  copyUpiBtn.addEventListener("click", async () => {
    const upiId = upiIdText.textContent.trim();

    if (!upiId || upiId === "your-upi-id@bank") {
      showToast("Please add your real UPI ID in index.html first.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(upiId);

      copyUpiBtn.innerHTML = '<i class="fas fa-check"></i> Copied';

      showToast("UPI ID copied successfully.", "success");

      setTimeout(() => {
        copyUpiBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    } catch (error) {
      console.error("Clipboard error:", error);

      showToast(
        "Could not copy automatically. Please copy the UPI ID manually.",
        "error"
      );
    }
  });
}

console.log("JJJ SkillForge Academy website initialized successfully.");