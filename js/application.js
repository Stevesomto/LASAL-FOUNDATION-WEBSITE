document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scholarship-application-wizard');
    if (!form) return;
  
    const steps = form.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
  
    let currentStep = 0;
  
    // Global application data state object ready for future REST API POST
    const applicationData = {
      personalInfo: {},
      educationalInfo: {},
      scholarshipInfo: {},
      documents: {},
      submittedAt: null,
      status: "pending_review"
    };
  
    function updateWizard() {
      steps.forEach((step, index) => {
        step.style.display = index === currentStep ? 'block' : 'none';
      });
  
      progressSteps.forEach((pStep, index) => {
        if (index === currentStep) {
          pStep.classList.add('active');
        } else {
          pStep.classList.remove('active');
        }
      });
  
      prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
      nextBtn.style.display = currentStep === steps.length - 2 ? 'inline-flex' : (currentStep === steps.length - 1 ? 'none' : 'inline-flex');
      submitBtn.style.display = currentStep === steps.length - 2 ? 'inline-flex' : 'none';
  
      if (currentStep === steps.length - 2) {
        populateReviewSummary();
      }
    }
  
    function validateCurrentStep() {
      const currentStepElem = steps[currentStep];
      const inputs = currentStepElem.querySelectorAll('input, select, textarea');
      let isValid = true;
  
      inputs.forEach(input => {
        const group = input.closest('.form-group');
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          if (group) group.classList.add('error');
        } else {
          if (group) group.classList.remove('error');
        }
      });
  
      return isValid;
    }
  
    nextBtn.addEventListener('click', () => {
      if (!validateCurrentStep()) {
        showInlineNotification('Please fill in all required fields correctly before proceeding.', 'error');
        return;
      }
      clearNotification();
      saveStepData();
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateWizard();
      }
    });
  
    prevBtn.addEventListener('click', () => {
      clearNotification();
      if (currentStep > 0) {
        currentStep--;
        updateWizard();
      }
    });
  
    function saveStepData() {
      if (currentStep === 0) {
        applicationData.personalInfo = {
          fullName: document.getElementById('fullName').value,
          dob: document.getElementById('dob').value,
          gender: document.getElementById('gender').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          address: document.getElementById('address').value
        };
      } else if (currentStep === 1) {
        applicationData.educationalInfo = {
          institution: document.getElementById('institution').value,
          course: document.getElementById('course').value,
          level: document.getElementById('level').value,
          studentId: document.getElementById('studentId').value,
          gpa: document.getElementById('gpa').value
        };
      } else if (currentStep === 2) {
        applicationData.scholarshipInfo = {
          scholarshipSelected: document.getElementById('scholarshipSelected').value,
          whyApplying: document.getElementById('whyApplying').value,
          careerGoals: document.getElementById('careerGoals').value,
          financialNeed: document.getElementById('financialNeed').value
        };
      } else if (currentStep === 3) {
        applicationData.documents = {
          passportPhoto: document.getElementById('passportPhoto').files[0]?.name || 'Not attached',
          studentIdDoc: document.getElementById('studentIdDoc').files[0]?.name || 'Not attached',
          academicDoc: document.getElementById('academicDoc').files[0]?.name || 'Not attached',
          supportingDoc: document.getElementById('supportingDoc').files[0]?.name || 'Not attached'
        };
      }
    }
  
    function populateReviewSummary() {
      const summaryContainer = document.getElementById('review-summary-content');
      if (!summaryContainer) return;
  
      summaryContainer.innerHTML = `
        <div style="margin-bottom: var(--spacing-md);">
          <h4 style="color: var(--secondary-color); margin-bottom: 0.25rem;">1. Personal Information</h4>
          <p><strong>Name:</strong> ${applicationData.personalInfo.fullName}</p>
          <p><strong>DOB:</strong> ${applicationData.personalInfo.dob} | <strong>Gender:</strong> ${applicationData.personalInfo.gender}</p>
          <p><strong>Email:</strong> ${applicationData.personalInfo.email} | <strong>Phone:</strong> ${applicationData.personalInfo.phone}</p>
          <p><strong>Address:</strong> ${applicationData.personalInfo.address}</p>
        </div>
        <div style="margin-bottom: var(--spacing-md);">
          <h4 style="color: var(--secondary-color); margin-bottom: 0.25rem;">2. Educational Information</h4>
          <p><strong>Institution:</strong> ${applicationData.educationalInfo.institution}</p>
          <p><strong>Course:</strong> ${applicationData.educationalInfo.course} (${applicationData.educationalInfo.level})</p>
          <p><strong>Student ID:</strong> ${applicationData.educationalInfo.studentId} | <strong>GPA / Standing:</strong> ${applicationData.educationalInfo.gpa}</p>
        </div>
        <div style="margin-bottom: var(--spacing-md);">
          <h4 style="color: var(--secondary-color); margin-bottom: 0.25rem;">3. Scholarship & Statements</h4>
          <p><strong>Selected Grant:</strong> ${applicationData.scholarshipInfo.scholarshipSelected}</p>
          <p><strong>Why Applying:</strong> ${applicationData.scholarshipInfo.whyApplying}</p>
          <p><strong>Career Goals:</strong> ${applicationData.scholarshipInfo.careerGoals}</p>
        </div>
        <div>
          <h4 style="color: var(--secondary-color); margin-bottom: 0.25rem;">4. Uploaded Documents</h4>
          <p>📸 Passport: ${applicationData.documents.passportPhoto}</p>
          <p>🆔 Student ID: ${applicationData.documents.studentIdDoc}</p>
          <p>📜 Academic Record: ${applicationData.documents.academicDoc}</p>
        </div>
      `;
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Application...';
  
      // Simulated API POST payload structure
      applicationData.submittedAt = new Date().toISOString();
  
      setTimeout(() => {
        // Mock API integration structure
        /*
        fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(applicationData)
        })
        */
        
        currentStep++;
        updateWizard();
        const refNumber = 'VER-APP-' + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('mock-ref-number').textContent = refNumber;
      }, 1200);
    });
  
    function showInlineNotification(message, type) {
      let notif = document.getElementById('wizard-notification');
      if (!notif) {
        notif = document.createElement('div');
        notif.id = 'wizard-notification';
        notif.style.padding = '0.75rem';
        notif.style.marginBottom = 'var(--spacing-md)';
        notif.style.borderRadius = 'var(--radius-md)';
        notif.style.fontSize = '0.9rem';
        form.prepend(notif);
      }
      notif.textContent = message;
      notif.style.backgroundColor = type === 'error' ? '#fee2e2' : '#dcfce7';
      notif.style.color = type === 'error' ? '#991b1b' : '#166534';
    }
  
    function clearNotification() {
      const notif = document.getElementById('wizard-notification');
      if (notif) notif.remove();
    }
  
    updateWizard();
  });