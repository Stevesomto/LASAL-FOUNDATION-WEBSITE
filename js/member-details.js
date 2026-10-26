import { scholarsData } from './data/scholars.js';
import { alumniData } from './data/alumni.js';
import { refreshScrollReveal } from './motion.js';
import { updatePageMeta } from './seo-utils.js';

document.addEventListener('DOMContentLoaded', () => {
  renderMemberDetail();
  refreshScrollReveal();
});

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMemberDetail() {
  const container = document.getElementById('member-detail-container');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const member = [...scholarsData, ...alumniData].find((m) => m.id === id);

  if (!member) {
    container.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-xl) 0;">
        <h1 style="font-size: 1.75rem; color: var(--primary-color); margin-bottom: var(--spacing-md);">Profile not found</h1>
        <p style="color: var(--text-muted); margin-bottom: var(--spacing-lg);">We couldn&rsquo;t find that community member.</p>
        <a href="community.html" class="btn btn-primary">Back to Our Community</a>
      </div>`;
    return;
  }

  const name = member.name.trim();
  const isCurrent = member.status === 'current';

  const facts = (isCurrent
    ? [
        ['Programme', member.program],
        ['Level', member.level],
        ['Institution', member.institution],
        ['Location', member.location],
        ['Scholarship', member.scholarship],
      ]
    : [
        ['Course', member.course],
        ['Graduation year', member.graduationYear],
        ['Institution', member.institution],
        ['Location', member.location],
        ['Profession', member.profession],
      ]
  ).filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '');

  updatePageMeta({
    title: `${name} | LASAL Foundation`,
    description: `${name} — ${isCurrent ? member.program : member.course}, ${String(member.institution).trim()}. A member of the LASAL Foundation community.`,
    path: `/member-details.html?id=${encodeURIComponent(member.id)}`,
    image: `https://lasalfoundation.org/${member.image.replace(/^\//, '')}`,
  });

  container.innerHTML = `
    <article class="leader-profile">
      <img src="${esc(member.image)}" alt="${esc(name)}" class="leader-profile-photo" style="object-position: center 20%;" width="640" height="800" decoding="async">
      <div class="leader-profile-body">
        <span class="${isCurrent ? 'badge badge-teal' : 'badge'}">${isCurrent ? 'CURRENT SCHOLAR' : 'ALUMNI'}</span>
        <h1 style="font-size: 2.25rem; color: var(--primary-color); margin: var(--spacing-sm) 0 var(--spacing-xs);">${esc(name)}</h1>
        <p style="color: var(--secondary-color); font-weight: 600; font-size: 1.05rem;">${esc(isCurrent ? `${member.program} • ${member.level}` : `${member.course} (${member.graduationYear})`)}</p>
        <dl class="member-facts">
          ${facts.map(([k, v]) => `<div class="member-fact"><dt>${esc(k)}</dt><dd>${esc(String(v).trim())}</dd></div>`).join('')}
        </dl>
        ${member.quote ? `<blockquote class="member-quote">&ldquo;${esc(member.quote.trim())}&rdquo;</blockquote>` : ''}
        <p style="margin-top: var(--spacing-xl);">
          <a href="community.html" class="btn btn-outline1">&larr; All Members</a>
        </p>
      </div>
    </article>
  `;
}
