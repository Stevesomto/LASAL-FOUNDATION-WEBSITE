import { scholarshipsData } from './data/scholarships.js';

document.addEventListener('DOMContentLoaded', () => {
  const isDetailsPage = window.location.pathname.includes('scholarship-details.html');
  
  if (isDetailsPage) {
    renderScholarshipDetails();
  } else {
    renderScholarshipsList();
    initFilters();
  }
});

function renderScholarshipsList(filter = 'All') {
  const container = document.getElementById('scholarships-grid');
  if (!container) return;

  const filtered = filter === 'All' 
    ? scholarshipsData 
    : scholarshipsData.filter(s => s.category.includes(filter));

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem 0;">No scholarship opportunities match the selected filter.</p>`;
    return;
  }

  container.innerHTML = filtered.map(s => `
    <div class="card scholarship-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div class="card-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
          <span class="badge badge-teal">${s.category}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Deadline: ${s.deadline}</span>
        </div>
        <h3 style="font-size: 1.25rem; color: var(--primary-color); margin-bottom: var(--spacing-sm);">${s.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: var(--spacing-md);">${s.description}</p>
        <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: var(--spacing-lg);"><strong>Eligibility:</strong> ${s.eligibility}</p>
      </div>
      <div style="padding: 0 var(--spacing-lg) var(--spacing-lg); display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: var(--spacing-md);">
        <span style="font-weight: 700; color: var(--secondary-color); font-size: 1.05rem;">${s.amount}</span>
        <a href="scholarship-details.html?id=${s.id}" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.9rem;">View & Apply</a>
      </div>
    </div>
  `).join('');
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('btn-primary', 'active'));
      filterButtons.forEach(b => b.classList.add('btn-outline'));
      
      e.target.classList.remove('btn-outline');
      e.target.classList.add('btn-primary', 'active');
      
      const filter = e.target.getAttribute('data-filter');
      renderScholarshipsList(filter);
    });
  });
}

function renderScholarshipDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || scholarshipsData[0].id;
  const scholarship = scholarshipsData.find(s => s.id === id) || scholarshipsData[0];

  const container = document.getElementById('scholarship-detail-container');
  if (!container) return;

  container.innerHTML = `
    <div>
      <span class="badge badge-teal" style="margin-bottom: var(--spacing-sm);">${scholarship.category}</span>
      <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: var(--spacing-md);">${scholarship.title}</h1>
      <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: var(--spacing-xl); line-height: 1.6;">${scholarship.description}</p>

      <div class="card" style="padding: var(--spacing-xl); margin-bottom: var(--spacing-xl); background-color: var(--bg-subtle);">
        <h3 style="color: var(--primary-color); margin-bottom: var(--spacing-md); font-size: 1.25rem;">Key Grant Details</h3>
        <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
          <li><strong>Award Value:</strong><br><span style="color: var(--secondary-color); font-weight: 600; font-size: 1.1rem;">${scholarship.amount}</span></li>
          <li><strong>Application Deadline:</strong><br><span style="color: var(--text-main); font-weight: 600;">${scholarship.deadline}</span></li>
          <li><strong>Target Audience:</strong><br><span style="color: var(--text-main);">${scholarship.category} Students</span></li>
        </ul>
      </div>

      <h3 style="color: var(--primary-color); margin-bottom: var(--spacing-sm); font-size: 1.25rem;">Eligibility Criteria</h3>
      <p style="color: var(--text-muted); margin-bottom: var(--spacing-xl); line-height: 1.6;">${scholarship.eligibility}</p>

      <h3 style="color: var(--primary-color); margin-bottom: var(--spacing-sm); font-size: 1.25rem;">Required Application Materials</h3>
      <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-muted); margin-bottom: var(--spacing-xl); line-height: 1.8;">
        <li>Official academic transcripts (minimum 3.5 GPA equivalent).</li>
        <li>Two letters of recommendation (academic or professional).</li>
        <li>Personal statement / essay (500–750 words) detailing career aspirations and community impact goals.</li>
        <li>Proof of enrollment or admission letter from an accredited institution.</li>
      </ul>

      <!-- Future API Submission Form Mockup -->
      <div class="card" style="padding: var(--spacing-xl); border-color: var(--secondary-color);">
        <h3 style="color: var(--primary-color); margin-bottom: var(--spacing-sm);">Ready to Apply?</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: var(--spacing-lg);">Submit your application documents below. Kindly enter the correct information.</p>
                
        <form id="scholarship-application-form">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--spacing-md);">
            <div class="form-group">
              <label class="form-label" for="full-name">Full Name</label>
              <input type="text" id="full-name" class="form-control" required placeholder="Your full name">
            </div>
            <div class="form-group">
              <label class="form-label" for="email">Email Address</label>
              <input type="email" id="email" class="form-control" required placeholder="An active email address">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="university">University / Institution</label>
            <input type="text" id="university" class="form-control" required placeholder="University Name">
          </div>
          <div class="form-group">
            <label class="form-label" for="documents">Upload Supporting Documents (ZIP / PDF)</label>
            <input type="file" id="documents" class="form-control" required accept=".pdf,.zip,.doc,.docx">
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: var(--secondary-color); margin-top: var(--spacing-sm);">Submit Application</button>
          <div id="form-feedback" style="margin-top: var(--spacing-md); font-size: 0.95rem; font-weight: 500;"></div>
        </form>
      </div>
    </div>
  `;

  // Form submission interaction handler
  const form = document.getElementById('scholarship-application-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      feedback.textContent = 'Application submitted successfully! Your submission ID is VER-' + Math.floor(100000 + Math.random() * 900000) + '. Status tracking will be available upon backend activation.';
      feedback.style.color = 'var(--success-color)';
      form.reset();
    });
  }
}
// This frontend is pre-configured to interface with a secure REST API upon backend integration