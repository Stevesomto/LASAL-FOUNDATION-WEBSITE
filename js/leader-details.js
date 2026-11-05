import { leadersData } from './data/leaders.js';
import { refreshScrollReveal } from './motion.js';
import { updatePageMeta } from './seo-utils.js';

document.addEventListener('DOMContentLoaded', () => {
  renderLeaderDetail();
  refreshScrollReveal();
});

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderLeaderDetail() {
  const container = document.getElementById('leader-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const leader = leadersData.find((l) => l.id === id);

  if (!leader) {
    container.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-xl) 0;">
        <h1 style="font-size: 1.75rem; color: var(--primary-color); margin-bottom: var(--spacing-md);">Profile not found</h1>
        <p style="color: var(--text-muted); margin-bottom: var(--spacing-lg);">We couldn&rsquo;t find that leadership profile.</p>
        <a href="about.html#governance" class="btn btn-primary">View Governance</a>
        <a href="about.html#leadership" class="btn btn-outline1" style="margin-left: var(--spacing-sm);">View Leadership</a>
      </div>`;
    return;
  }

  const section = leader.group === 'governance'
    ? { href: 'about.html#governance', label: 'Governance' }
    : { href: 'about.html#leadership', label: 'Leadership' };
  const backLink = document.getElementById('leader-back-link');
  if (backLink) {
    backLink.href = section.href;
    backLink.innerHTML = `&larr; Back to ${section.label}`;
  }

  const paragraphs = Array.isArray(leader.bio) ? leader.bio : [leader.bio];

  updatePageMeta({
    title: `${leader.name} | LASAL Foundation`,
    description: paragraphs[0],
    path: `/leader-details.html?id=${encodeURIComponent(leader.id)}`,
    image: `https://lasalfoundation.org/${leader.image.replace(/^\//, '')}`,
  });

  const fitClass = leader.imageFit === 'contain' ? ' is-contain' : '';
  const position = leader.imagePosition ? ` style="object-position: ${esc(leader.imagePosition)};"` : '';

  container.innerHTML = `
    <article class="leader-profile">
      <img src="${esc(leader.image)}" alt="${esc(leader.imageAlt || leader.name)}" class="leader-profile-photo${fitClass}"${fitClass ? '' : position} width="640" height="800" decoding="async">
      <div class="leader-profile-body">
        <span class="badge badge-teal">${esc(leader.role)}</span>
        <h1 style="font-size: 2.25rem; color: var(--primary-color); margin: var(--spacing-sm) 0 var(--spacing-xs);">${esc(leader.name)}</h1>
        <p style="color: var(--secondary-color); font-weight: 600; font-size: 1.05rem; margin-bottom: var(--spacing-lg);">${esc(leader.role)}, LASAL Foundation</p>
        ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
        <p style="margin-top: var(--spacing-xl);">
          <a href="${section.href}" class="btn btn-outline1">&larr; All ${section.label}</a>
        </p>
      </div>
    </article>
  `;
}
