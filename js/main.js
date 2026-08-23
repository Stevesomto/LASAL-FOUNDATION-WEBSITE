import { initNavigation } from './navigation.js';
import { scholarshipsData } from './data/scholarships.js';
import { storiesData } from './data/stories.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation toggle & active path checks
  initNavigation();
  
  // Render dynamic page content if containers exist
  renderFeaturedScholarships();
  renderFeaturedStories();
  initNewsletterForm();
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

  container.innerHTML = storiesData.map(story => `
    <div class="card story-card">
      <img src="${story.image}" alt="${story.title}" style="height: 200px; width: 100%; object-fit: cover;">
      <div class="card-body">
        <span class="badge" style="margin-bottom: var(--spacing-xs);">${story.category}</span>
        <h3 style="font-size: 1.15rem; margin-bottom: var(--spacing-sm); color: var(--primary-color);">${story.title}</h3>
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