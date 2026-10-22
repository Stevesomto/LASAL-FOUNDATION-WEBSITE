import { storiesData } from './data/stories.js';
import { refreshScrollReveal } from './motion.js';
import { updatePageMeta } from './seo-utils.js';

document.addEventListener('DOMContentLoaded', () => {
  renderStoryDetail();
  refreshScrollReveal();
});

function renderStoryDetail() {
  const container = document.getElementById('story-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || storiesData[0]?.id;
  const story = storiesData.find((s) => s.id === id) || storiesData[0];

  if (!story) {
    container.innerHTML = '<p>No story found.</p>';
    return;
  }

  updatePageMeta({
    title: `${story.title} | LASAL Foundation`,
    description: story.excerpt,
    path: `/story-details.html?id=${encodeURIComponent(story.id)}`,
    image: story.image.startsWith('http') ? story.image : `https://lasalfoundation.org/${story.image.replace(/^\//, '')}`,
  });

  const heading = story.author ? story.title : story.title;
  const byline = story.author
    ? `<p style="color: var(--secondary-color); font-weight: 600; font-size: 1.05rem; margin-bottom: 0.25rem;">${story.author}</p>${
        story.subtitle ? `<p style="color: var(--text-muted); margin-bottom: var(--spacing-md);">${story.subtitle}</p>` : ''
      }`
    : '';

  container.innerHTML = `
    <article>
      <img src="${story.image}" alt="${story.author || story.title}" style="width: 100%; max-height: 420px; object-fit: cover; object-position: ${story.imagePosition || 'center top'}; border-radius: var(--radius-lg); margin-bottom: var(--spacing-lg);">
      <span class="badge badge-teal">${story.category}</span>
      <h1 style="font-size: 2.25rem; color: var(--primary-color); margin: var(--spacing-sm) 0 var(--spacing-md);">${heading}</h1>
      ${byline}
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-lg);">${story.date}</p>
      <div class="story-detail-body" style="color: var(--text-main); font-size: 1.05rem; line-height: 1.85;">${story.body || `<p>${story.excerpt}</p>`}</div>
      <p style="margin-top: var(--spacing-xl);">
        <a href="stories.html#photos-videos" class="btn btn-outline1">Photos &amp; Videos</a>
        <a href="stories.html" class="btn btn-primary" style="margin-left: var(--spacing-sm); background-color: var(--secondary-color);">All Stories</a>
      </p>
    </article>
  `;
}
