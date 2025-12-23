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

document.getElementById("quickQuoteForm").addEventListener("submit", function (e) {
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

// Form Callrail integration

var form = document.querySelector('#quoteForm');
form.addEventListener(
 'submit',
 function() {
   CallTrk.captureForm('#quoteForm');
 }
);

var form = document.querySelector('#quickQuoteForm');
form.addEventListener(
 'submit',
 function() {
   CallTrk.captureForm('#quickQuoteForm');
 }
);

// Before/After Image Slider with Touch Support
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const sliderWrapper = document.querySelector('.slider-wrapper');

function showSlide(index) {
    // Wrap around if out of bounds
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });

    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === currentSlide) {
            indicator.classList.add('active');
        }
    });

    // Update slide counter if it exists
    const slideCounter = document.getElementById('currentSlideNumber');
    const totalSlides = document.getElementById('totalSlides');
    if (slideCounter && totalSlides) {
        slideCounter.textContent = currentSlide + 1;
        totalSlides.textContent = slides.length;
    }
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    showSlide(index);
}

// Touch/Swipe Support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = Math.abs(touchEndY - touchStartY);
    
    // Only process horizontal swipes (ignore vertical scrolling)
    if (Math.abs(swipeDistanceX) > swipeThreshold && swipeDistanceY < 100) {
        if (swipeDistanceX > 0) {
            // Swiped right - go to previous slide
            changeSlide(-1);
        } else {
            // Swiped left - go to next slide
            changeSlide(1);
        }
    }
}

if (sliderWrapper) {
    // Touch events
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    // Mouse drag support (for desktop testing)
    let isDragging = false;
    let dragStartX = 0;

    sliderWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        sliderWrapper.style.cursor = 'grabbing';
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    sliderWrapper.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        sliderWrapper.style.cursor = 'grab';
        
        const dragDistance = e.clientX - dragStartX;
        if (Math.abs(dragDistance) > 50) {
            if (dragDistance > 0) {
                changeSlide(-1);
            } else {
                changeSlide(1);
            }
        }
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            sliderWrapper.style.cursor = 'grab';
        }
    });
}

// Auto-advance slider every 5 seconds
let autoSlide = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause auto-slide when hovering or touching
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });

    // Pause on touch
    sliderContainer.addEventListener('touchstart', () => {
        clearInterval(autoSlide);
    }, { passive: true });

    sliderContainer.addEventListener('touchend', () => {
        autoSlide = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }, { passive: true });
}

// Initialize slide counter on page load
document.addEventListener('DOMContentLoaded', function() {
    const totalSlidesElement = document.getElementById('totalSlides');
    if (totalSlidesElement && slides.length > 0) {
        totalSlidesElement.textContent = slides.length;
        document.getElementById('currentSlideNumber').textContent = '1';
    }
});

// Keyboard navigation (bonus feature)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});
