import { scholarsData } from './data/scholars.js';
import { alumniData } from './data/alumni.js';

document.addEventListener('DOMContentLoaded', () => {
  const combinedCommunity = [...scholarsData, ...alumniData];
  renderCommunityGrid(combinedCommunity);
  initCommunityFilters(combinedCommunity);
});

function renderCommunityGrid(data) {
  const container = document.getElementById('community-grid');
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem 0;">No community members found matching your search or filter criteria.</p>`;
    return;
  }

  container.innerHTML = data.map(member => {
    const isCurrent = member.status === 'current';
    const badgeClass = isCurrent ? 'badge badge-teal' : 'badge';
    const badgeText = isCurrent ? 'CURRENT SCHOLAR' : 'ALUMNI';
    const subtitle = isCurrent ? `${member.program} • ${member.level}` : `${member.course} (${member.graduationYear})`;
    const detailMeta = isCurrent ? `Scholarship: ${member.scholarship}` : `Profession: ${member.profession}`;

    return `
      <div class="card community-card" data-id="${member.id}" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="position: relative;">
            <img src="${member.image}" alt="${member.name}" style="height: 240px; width: 100%; object-fit: cover;">
            <div style="position: absolute; top: 12px; right: 12px;">
              <span class="${badgeClass}" style="box-shadow: var(--shadow-sm);">${badgeText}</span>
            </div>
          </div>
          <div class="card-body">
            <h3 style="font-size: 1.25rem; color: var(--primary-color); margin-bottom: 0.25rem;">${member.name}</h3>
            <p style="color: var(--secondary-color); font-weight: 600; font-size: 0.9rem; margin-bottom: var(--spacing-sm);">${subtitle}</p>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: var(--spacing-md);">📍 ${member.institution} • ${member.location}</p>
            <p style="color: var(--text-main); font-size: 0.9rem; font-style: italic; margin-bottom: var(--spacing-md);">"${member.quote}"</p>
            <p style="font-size: 0.85rem; font-weight: 600; color: var(--primary-color);">${detailMeta}</p>
          </div>
        </div>
        <div style="padding: 0 var(--spacing-lg) var(--spacing-lg); border-top: 1px solid var(--border-color); padding-top: var(--spacing-md);">
          <button class="btn btn-outline1 view-profile-btn" data-id="${member.id}" style="width: 100%; padding: 0.5rem; font-size: 0.85rem;">View Profile</button>
        </div>
      </div>
    `;
  }).join('');

  // Attach event listeners to profile view buttons (Ready for future REST API routing /modal)
  document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      alert(`API Endpoint Ready: /api/community/${id}\n(Dynamic profile modal or detail view will load here upon backend activation).`);
    });
  });
}

function initCommunityFilters(allData) {
  const filterButtons = document.querySelectorAll('.community-filter-btn');
  const searchInput = document.getElementById('community-search');
  const programSelect = document.getElementById('program-filter');

  // Populate program/course filter dropdown dynamically
  const programs = [...new Set(allData.map(m => m.program || m.course))];
  if (programSelect) {
    programs.forEach(prog => {
      const option = document.createElement('option');
      option.value = prog;
      option.textContent = prog;
      programSelect.appendChild(option);
    });
  }

  let currentType = 'all';
  let searchTerm = '';
  let selectedProgram = 'all';

  function applyFilters() {
    let filtered = allData;

    if (currentType === 'current') {
      filtered = filtered.filter(m => m.status === 'current');
    } else if (currentType === 'alumni') {
      filtered = filtered.filter(m => m.status === 'alumni');
    }

    if (searchTerm) {
      filtered = filtered.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    (m.institution && m.institution.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    if (selectedProgram !== 'all') {
      filtered = filtered.filter(m => (m.program === selectedProgram || m.course === selectedProgram));
    }

    renderCommunityGrid(filtered);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('btn-primary', 'active'));
      filterButtons.forEach(b => b.classList.add('btn-outline'));

      e.target.classList.remove('btn-outline');
      e.target.classList.add('btn-primary', 'active');

      currentType = e.target.getAttribute('data-type');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      applyFilters();
    });
  }

  if (programSelect) {
    programSelect.addEventListener('change', (e) => {
      selectedProgram = e.target.value;
      applyFilters();
    });
  }
}