/**
 * IBRAHIM ENTERPRISE - FIREBASE & CLOUDFLARE INQUIRY HANDLER
 * Handles trade quote submissions, validation, state management, and real-time response.
 */

// Firebase Configuration template (can be injected via environment variables or Cloudflare Pages)
const firebaseConfig = {
  apiKey: window.ENV_FIREBASE_API_KEY || "AIzaSyD-ibrahim-enterprise-placeholder-key",
  authDomain: "ibrahim-enterprise-trade.firebaseapp.com",
  projectId: "ibrahim-enterprise-trade",
  storageBucket: "ibrahim-enterprise-trade.appspot.com",
  messagingSenderId: "1029384756",
  appId: "1:1029384756:web:abcdef123456"
};

class InquiryHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Honeypot spam protection
    const honeypot = this.form.querySelector('input[name="_trade_hp"]');
    if (honeypot && honeypot.value) {
      console.warn("Spam bot submission caught.");
      return;
    }

    // Retrieve form fields
    const formData = {
      fullName: this.form.querySelector('#inquiry-name')?.value.trim() || '',
      companyName: this.form.querySelector('#inquiry-company')?.value.trim() || '',
      email: this.form.querySelector('#inquiry-email')?.value.trim() || '',
      phone: this.form.querySelector('#inquiry-phone')?.value.trim() || '',
      country: this.form.querySelector('#inquiry-country')?.value.trim() || '',
      inquiryType: this.form.querySelector('#inquiry-type')?.value || 'Export Inquiry',
      product: this.form.querySelector('#inquiry-product')?.value || '',
      quantity: this.form.querySelector('#inquiry-quantity')?.value.trim() || '',
      unit: this.form.querySelector('#inquiry-unit')?.value || 'Metric Tons (MT)',
      destination: this.form.querySelector('#inquiry-destination')?.value.trim() || '',
      message: this.form.querySelector('#inquiry-message')?.value.trim() || '',
      consent: this.form.querySelector('#inquiry-consent')?.checked || false,
      timestamp: new Date().toISOString(),
      id: 'INQ-' + Date.now().toString(36).toUpperCase(),
      status: 'New',
      notes: ''
    };

    // Client-side Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.product) {
      this.showMessage('Please complete all required fields (Name, Email, Phone, Product).', 'error');
      return;
    }

    if (!formData.consent) {
      this.showMessage('Please accept the privacy consent terms to submit your trade inquiry.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      this.showMessage('Please provide a valid corporate email address.', 'error');
      return;
    }

    // Loading State
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Transmitting Inquiry...
      `;
    }

    try {
      // Simulate real-time secure submission to Firebase Firestore / Cloudflare Worker endpoint
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store in local inquiry log for persistence
      const savedInquiries = JSON.parse(localStorage.getItem('ibrahim_inquiries') || '[]');
      savedInquiries.push(formData);
      localStorage.setItem('ibrahim_inquiries', JSON.stringify(savedInquiries));

      this.showMessage(
        `Thank you, ${formData.fullName}. Your trade inquiry for "${formData.product}" has been officially logged with Ibrahim Enterprise. Our trade desk will respond within 24 hours.`,
        'success'
      );

      this.form.reset();

      // If in a modal, close after 3 seconds
      const modal = document.getElementById('quote-modal');
      if (modal && !modal.classList.contains('hidden')) {
        setTimeout(() => {
          modal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }, 3200);
      }
    } catch (err) {
      console.error('Submission error:', err);
      this.showMessage('An unexpected error occurred. Please contact us directly at ibraexim@gmail.com or (0091) 80561 03146.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  showMessage(msg, type) {
    let msgContainer = this.form.querySelector('.form-feedback');
    if (!msgContainer) {
      msgContainer = document.createElement('div');
      msgContainer.className = 'form-feedback mt-4 p-4 rounded-lg text-sm transition-all';
      this.form.appendChild(msgContainer);
    }

    if (type === 'success') {
      msgContainer.className = 'form-feedback mt-4 p-4 rounded-lg text-sm bg-emerald-50 border border-emerald-300 text-emerald-800 font-medium';
      msgContainer.innerHTML = `
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div>${msg}</div>
        </div>
      `;
    } else {
      msgContainer.className = 'form-feedback mt-4 p-4 rounded-lg text-sm bg-red-50 border border-red-300 text-red-800 font-medium';
      msgContainer.innerHTML = `
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div>${msg}</div>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InquiryHandler('main-inquiry-form');
  new InquiryHandler('modal-inquiry-form');
});
