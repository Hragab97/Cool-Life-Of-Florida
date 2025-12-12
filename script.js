// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const mobileLinks = document.querySelectorAll(".mobile-link");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
overlay.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", toggleMobileMenu);
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".section-header, .service-card, .quote-container, .about-card, .why-card, .resistance-box, .comparison-grid, .color-card, .application-card, .before-after-placeholder, .faq-item, .benefits-header, .benefits-card"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Stagger service card animations
document.querySelectorAll(".service-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Form submission
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert(
    "Thank you for your quote request! We will contact you within 24 hours."
  );
  this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
