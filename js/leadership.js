import { leadersData } from './data/leaders.js';

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Short text for the card: `summary` if given, otherwise the first paragraph of `bio`. */
function previewText(leader) {
  if (leader.summary) return leader.summary;
  return Array.isArray(leader.bio) ? leader.bio[0] : leader.bio;
}

function leaderCard(leader) {
  const isContain = leader.imageFit === 'contain';
  const position = !isContain && leader.imagePosition ? ` style="object-position: ${esc(leader.imagePosition)};"` : '';
  const photo = `<img src="${esc(leader.image)}" alt="${esc(leader.imageAlt || leader.name)}" class="leadership-card-photo${isContain ? ' is-contain' : ''}"${position} loading="lazy" decoding="async">`;

  return `
    <div class="card leader-card">
      ${photo}
      <div class="card-body">
        <h3 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 0.25rem;">${esc(leader.name)}</h3>
        <p style="color: var(--secondary-color); font-weight: 600; font-size: 0.9rem; margin-bottom: var(--spacing-sm);">${esc(leader.role)}</p>
        <p class="leader-bio-clamp" style="color: var(--text-muted); font-size: 0.9rem;">${esc(previewText(leader))}</p>
        <a href="leader-details.html?id=${encodeURIComponent(leader.id)}" class="btn btn-outline1 leader-read-more" aria-label="Read more about ${esc(leader.name)}">Read More &rarr;</a>
      </div>
    </div>`;
}

function renderGroup(gridId, group) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = leadersData
    .filter((leader) => (leader.group || 'leadership') === group)
    .map(leaderCard)
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderGroup('governance-grid', 'governance');
  renderGroup('leadership-grid', 'leadership');
});
