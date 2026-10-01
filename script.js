/* ========================================
   JJJ SkillForge Academy — Main JavaScript
   ======================================== */

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
const paymentForm = document.getElementById("paymentForm");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const counters = document.querySelectorAll(".counter");
const courseEnrollButtons = document.querySelectorAll(".course-enroll-btn");
const registrationCourse = document.getElementById("course");

const copyUpiBtn = document.getElementById("copyUpiBtn");
const upiIdText = document.getElementById("upiIdText");

const particlesContainer = document.getElementById("particles");
const rainContainer = document.getElementById("rainContainer");

/* ========================================
   Loading Screen
   ======================================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
  }, 1500);
});

/* ========================================
   Background Particles
   ======================================== */

function createParticles() {
  if (!particlesContainer) return;

  const isMobile = window.innerWidth < 700;
  const particleCount = isMobile ? 0 : 25;

  if (particleCount === 0) return;

  const colors = [
    "rgba(129, 140, 248, 0.6)",
    "rgba(6, 182, 212, 0.6)",
    "rgba(167, 139, 250, 0.6)",
    "rgba(34, 211, 238, 0.5)"
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = (100 + Math.random() * 20) + "%";

    const size = 2 + Math.random() * 4;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;

    const duration = 15 + Math.random() * 20;
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = "-" + Math.random() * duration + "s";

    particlesContainer.appendChild(particle);
  }
}

createParticles();

/* ========================================
   Rain Falling Effect — Full Page
   ======================================== */

function createRain() {
  if (!rainContainer) return;

  const isMobile = window.innerWidth < 700;
  const dropCount = isMobile ? 45 : 130;

  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement("div");

    const roll = Math.random();
    let layerClass = "mid";
    let heightMin = 50;
    let heightMax = 110;
    let speedMin = 0.9;
    let speedMax = 1.6;

    if (roll < 0.4) {
      layerClass = "far";
      heightMin = 30;
      heightMax = 70;
      speedMin = 1.5;
      speedMax = 2.4;
    } else if (roll < 0.75) {
      layerClass = "mid";
      heightMin = 50;
      heightMax = 110;
      speedMin = 0.9;
      speedMax = 1.6;
    } else {
      layerClass = "near";
      heightMin = 80;
      heightMax = 150;
      speedMin = 0.5;
      speedMax = 1.0;
    }

    drop.className = "raindrop " + layerClass;

    drop.style.left = Math.random() * 100 + "%";

    const height = heightMin + Math.random() * (heightMax - heightMin);
    drop.style.height = height + "px";

    const duration = speedMin + Math.random() * (speedMax - speedMin);
    drop.style.animationDuration = duration.toFixed(2) + "s";

    drop.style.animationDelay = "-" + (Math.random() * 3).toFixed(2) + "s";

    rainContainer.appendChild(drop);
  }
}

createRain();

/* ========================================
   Sticky Navbar / Scroll Features
   ======================================== */

function handleScroll() {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 70);
  if (backToTopBtn) backToTopBtn.classList.toggle("visible", window.scrollY > 500);
  updateActiveNavigation();
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
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink && currentScroll >= top && currentScroll < bottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
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
    if (navMenu) navMenu.classList.remove("active");
    if (hamburger) {
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu && hamburger && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
});

/* ========================================
   Smooth Scrolling
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ========================================
   Scroll Reveal Animations
   ======================================== */

const revealElements = document.querySelectorAll(
  ".about-card, .highlight-item, .course-card, .why-card, .process-step, .registration-form-container, .info-card, .payment-container, .payment-confirmation, .contact-card, .contact-cta, .location-info, .location-map, .gallery-item"
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
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    revealObserver.observe(element);
  });
}

/* ========================================
   Animated Counter
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

    if (progress < 1) requestAnimationFrame(update);
    else counterElement.textContent = String(target);
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

function showToast(message, type = "success", customHeading = "") {
  if (!toast || !toastText) {
    alert(message);
    return;
  }

  const toastHeading = toast.querySelector(".toast-message h4");
  const iconBox = toast.querySelector(".toast-icon");
  const icon = toast.querySelector(".toast-icon i");

  toastText.textContent = message;

  if (type === "error") {
    if (toastHeading) toastHeading.textContent = customHeading || "Unable to submit";
    if (iconBox) {
      iconBox.style.background = "rgba(239, 68, 68, 0.18)";
      iconBox.style.color = "#f87171";
    }
    if (icon) icon.className = "fas fa-circle-exclamation";
  } else {
    if (toastHeading) toastHeading.textContent = customHeading || "Success!";
    if (iconBox) {
      iconBox.style.background = "rgba(39, 201, 63, 0.16)";
      iconBox.style.color = "#4ade80";
    }
    if (icon) icon.className = "fas fa-circle-check";
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

async function sendToGoogleSheets(data) {
  const encodedData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    encodedData.append(key, value ?? "");
  });

  await fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    body: encodedData,
  });
}

/* ========================================
   Course Enroll Buttons
   ======================================== */

courseEnrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCourse = button.dataset.course;
    if (registrationCourse && selectedCourse) {
      registrationCourse.value = selectedCourse;
    }
  });
});

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

    if (!batch) {
      showToast("Please select your preferred batch day & time.", "error");
      document.getElementById("batch").focus();
      return;
    }

    const registrationData = {
      type: "registration",
      studentName,
      phone,
      email,
      course,
      mode,
      batch,
      message,
      registrationFee: "500",
      courseFee: "1500",
      totalPayable: "2000",
      amountToPayNow: "500",
      paymentStatus: "Registration Fee Pending",
    };

    const submitButton = registrationForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    try {
      await sendToGoogleSheets(registrationData);
      registrationForm.reset();

      showToast(
        `Thank you ${studentName}! You have been successfully registered. A confirmation email with all details has been sent to ${email}.`,
        "success",
        "Successfully Registered!"
      );
    } catch (error) {
      console.error("Registration form error:", error);
      showToast("The registration could not be submitted. Please try again.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

/* ========================================
   Payment Confirmation Form
   ======================================== */

if (paymentForm) {
  paymentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentName = document.getElementById("paymentStudentName").value.trim();
    const phone = document.getElementById("paymentPhone").value.trim();
    const course = document.getElementById("paymentCourse").value;
    const paymentAmount = document.getElementById("paymentAmount").value;
    const utrNumber = document.getElementById("utrNumber").value.trim();

    if (!studentName) {
      showToast("Please enter the student name.", "error");
      document.getElementById("paymentStudentName").focus();
      return;
    }

    if (!isValidPhone(phone)) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      document.getElementById("paymentPhone").focus();
      return;
    }

    if (!course) {
      showToast("Please select the course.", "error");
      document.getElementById("paymentCourse").focus();
      return;
    }

    if (!paymentAmount) {
      showToast("Please select the amount paid.", "error");
      document.getElementById("paymentAmount").focus();
      return;
    }

    if (!utrNumber) {
      showToast("Please enter the UTR or transaction ID.", "error");
      document.getElementById("utrNumber").focus();
      return;
    }

    const paymentData = {
      type: "payment_confirmation",
      studentName,
      phone,
      course,
      paymentAmount,
      utrNumber,
      paymentStatus: "Pending Verification",
    };

    const submitButton = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Payment Details...';

    try {
      await sendToGoogleSheets(paymentData);
      paymentForm.reset();

      showToast(
        "Payment details submitted successfully. Your payment is pending academy verification.",
        "success",
        "Payment Details Submitted!"
      );
    } catch (error) {
      console.error("Payment confirmation error:", error);
      showToast("Payment details could not be submitted. Please try again.", "error");
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
      showToast("Could not copy automatically. Please copy the UPI ID manually.", "error");
    }
  });
}

console.log("JJJ SkillForge Academy website initialized successfully.");
