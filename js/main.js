import { initNavigation } from './navigation.js';
import { initThemeToggle } from './theme.js';
import { initSiteForms } from './forms.js';
import { initSiteContact } from './site-contact.js';
import { initMotion, refreshScrollReveal } from './motion.js';
import { initInteractive } from './interactive.js';
import { scholarshipsData } from './data/scholarships.js';
import { storiesData } from './data/stories.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMotion();
  initNavigation();
  initHeroSlider();
  renderFeaturedScholarships();
  renderFeaturedStories();
  refreshScrollReveal();
  initNewsletterForm();
  initSiteForms();
  initSiteContact();
  initInteractive();
});

function renderFeaturedScholarships() {
  const container = document.getElementById('featured-scholarships-grid');
  if (!container) return;

  container.innerHTML = scholarshipsData.map(s => `
    <div class="card scholarship-card">
      <div class="card-body">
        <span class="badge badge-teal">${s.category}</span>
        <h3 style="margin: var(--spacing-sm) 0; font-size: 1.25rem; color: var(--primary-color);">${s.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: var(--spacing-md);">${s.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; font-weight: 600; color: var(--secondary-color);">
          <span>Award: ${s.amount}</span>
          <a href="scholarship-details.html?id=${s.id}" class="btn btn-outline1" style="padding: 0.4rem 1rem; font-size: 0.85rem;">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFeaturedStories() {
  const container = document.getElementById('featured-stories-grid');
  if (!container) return;

  container.innerHTML = storiesData.map((story) => `
    <div class="card story-card">
      <img src="${story.image}" alt="${story.author || story.title}" style="height: 200px; width: 100%; object-fit: cover; object-position: ${story.imagePosition || 'center top'};">
      <div class="card-body">
        <span class="badge" style="margin-bottom: var(--spacing-xs);">${story.category}</span>
        <h3 style="font-size: 1.15rem; margin-bottom: var(--spacing-sm); color: var(--primary-color);">${story.author || story.title}</h3>
        ${story.author ? `<p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: var(--spacing-sm);">${story.title}</p>` : ''}
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-md);">${story.excerpt}</p>
        <a href="story-details.html?id=${story.id}" style="color: var(--secondary-color); font-weight: 600; font-size: 0.9rem;">Read Full Story &rarr;</a>
      </div>
    </div>
  `).join('');
}

function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const feedback = document.getElementById('newsletter-feedback');

    if (!feedback) return;

    if (emailInput.value.trim() === '') {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = 'var(--error-color)';
      return;
    }

    feedback.textContent = 'Thank you for subscribing to our updates!';
    feedback.style.color = 'var(--success-color)';
    emailInput.value = '';
  });
}



/* =========================================================
   HERO IMAGE SLIDER
   ========================================================= */

function initHeroSlider() {

  const slider = document.querySelector('#heroSlider');

  if (!slider) return;


  const slides = slider.querySelectorAll('.hero-slide');

  const prevButton = slider.querySelector('#heroPrev');

  const nextButton = slider.querySelector('#heroNext');

  const dots = slider.querySelectorAll('.hero-dot');


  if (slides.length === 0) return;

  let currentSlide = 0;

  let autoSlideTimer = null;


  /* =========================================================
     SHOW SLIDE
     ========================================================= */

  function showSlide(index) {

    /*
     * Make sure the index always stays between
     * 0 and the number of slides - 1
     */

    if (index >= slides.length) {
      index = 0;
    }

    if (index < 0) {
      index = slides.length - 1;
    }


    currentSlide = index;


    /*
     * Remove active class from all slides
     */

    slides.forEach((slide) => {

      slide.classList.remove('active');

    });


    /*
     * Remove active class from all dots
     */

    dots.forEach((dot) => {

      dot.classList.remove('active');

    });


    /*
     * Add active class to current slide
     */

    slides[currentSlide].classList.add('active');


    /*
     * Add active class to current dot
     */

    if (dots[currentSlide]) {

      dots[currentSlide].classList.add('active');

    }

  }


  /* =========================================================
     NEXT SLIDE
     ========================================================= */

  function nextSlide() {

    showSlide(currentSlide + 1);

  }


  /* =========================================================
     PREVIOUS SLIDE
     ========================================================= */

  function previousSlide() {

    showSlide(currentSlide - 1);

  }


  /* =========================================================
     START AUTOMATIC SLIDER
     ========================================================= */

  function startAutoSlide() {

    stopAutoSlide();


    autoSlideTimer = setInterval(() => {

      nextSlide();

    }, 5000);

  }


  /* =========================================================
     STOP AUTOMATIC SLIDER
     ========================================================= */

  function stopAutoSlide() {

    if (autoSlideTimer !== null) {

      clearInterval(autoSlideTimer);

      autoSlideTimer = null;

    }

  }


  /* =========================================================
     RESET AUTOMATIC SLIDER
     ========================================================= */

  function resetAutoSlide() {

    stopAutoSlide();

    startAutoSlide();

  }


  /* =========================================================
     NEXT BUTTON
     ========================================================= */

  if (nextButton) {

    nextButton.addEventListener('click', function (event) {

      event.preventDefault();

      nextSlide();

      resetAutoSlide();

    });

  }


  /* =========================================================
     PREVIOUS BUTTON
     ========================================================= */

  if (prevButton) {

    prevButton.addEventListener('click', function (event) {

      event.preventDefault();

      previousSlide();

      resetAutoSlide();

    });

  }


  /* =========================================================
     DOT BUTTONS
     ========================================================= */

  dots.forEach((dot, index) => {

    dot.addEventListener('click', function (event) {

      event.preventDefault();

      showSlide(index);

      resetAutoSlide();

    });

  });


  /* =========================================================
     PAUSE WHEN MOUSE ENTERS
     ========================================================= */

  slider.addEventListener('mouseenter', function () {

    stopAutoSlide();

  });


  /* =========================================================
     RESUME WHEN MOUSE LEAVES
     ========================================================= */

  slider.addEventListener('mouseleave', function () {

    startAutoSlide();

  });

  slider.addEventListener('focusin', stopAutoSlide);
  slider.addEventListener('focusout', startAutoSlide);


  /* =========================================================
     KEYBOARD CONTROL
     ========================================================= */

  document.addEventListener('keydown', function (event) {

    if (event.key === 'ArrowRight') {

      nextSlide();

      resetAutoSlide();

    }


    if (event.key === 'ArrowLeft') {

      previousSlide();

      resetAutoSlide();

    }

  });


  /* =========================================================
     MOBILE SWIPE
     ========================================================= */

  let touchStartX = 0;

  let touchEndX = 0;


  slider.addEventListener('touchstart', function (event) {

    touchStartX = event.changedTouches[0].screenX;

  }, { passive: true });


  slider.addEventListener('touchend', function (event) {

    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance =
      touchEndX - touchStartX;


    /*
     * Swipe left
     */

    if (swipeDistance < -50) {

      nextSlide();

      resetAutoSlide();

    }


    /*
     * Swipe right
     */

    if (swipeDistance > 50) {

      previousSlide();

      resetAutoSlide();

    }

  }, { passive: true });


  /* =========================================================
     INITIALIZE FIRST SLIDE
     ========================================================= */

  showSlide(0);

  startAutoSlide();

}