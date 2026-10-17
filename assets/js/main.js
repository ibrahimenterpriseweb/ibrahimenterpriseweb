/**
 * IBRAHIM ENTERPRISE - MAIN SCRIPT
 * Handles navigation, mobile drawer, scroll animations, modals, and dynamic rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initActiveNavLink();
  initQuoteTriggers();
  initFloatingCommsAndChatbot();
  initScrollReveal();
});

// Sticky Header logic
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Accessible Mobile Navigation Drawer
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    menuBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
      closeDrawer();
    }
  });
}

// Active Link Highlight
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Quote Modal / Trigger Buttons
function initQuoteTriggers() {
  const quoteBtns = document.querySelectorAll('[data-open-quote]');
  const quoteModal = document.getElementById('quote-modal');
  const modalClose = document.getElementById('quote-modal-close');
  const modalBackdrop = document.getElementById('quote-modal-backdrop');
  const productSelect = document.getElementById('inquiry-product');

  if (!quoteModal) return;

  quoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillProduct = btn.getAttribute('data-product');
      if (prefillProduct && productSelect) {
        productSelect.value = prefillProduct;
      }
      quoteModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeModal = () => {
    quoteModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
}

// =========================================================================
// Floating Communication Suite & B2B Trade Assistant Chatbot
// =========================================================================
function initFloatingCommsAndChatbot() {
  // Do not show public consumer chatbot on admin portal
  if (window.location.pathname.includes('admin.html')) return;

  const suite = document.createElement('div');
  suite.className = 'floating-comms-suite';
  suite.setAttribute('aria-label', 'Trade Communication Tools');

  suite.innerHTML = `
    <!-- Floating WhatsApp Button -->
    <a 
      href="https://wa.me/918056103146?text=Hello%20Ibrahim%20Enterprise%2C%20I%20would%20like%20to%20inquire%20about%20commodity%20trade." 
      target="_blank" 
      rel="noopener noreferrer" 
      class="whatsapp-float-btn" 
      title="Chat with Ibrahim Enterprise on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <span class="whatsapp-float-badge" aria-hidden="true"></span>
      <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.589 1.93.916 2.796.917h.005c3.179 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.988-1.688-4.079-1.09-1.089-2.538-1.685-4.08-1.685zm9.969 5.766c0 5.514-4.486 10-10 10-1.741 0-3.376-.452-4.802-1.243l-6.198 1.625 1.658-6.059c-.878-1.47-1.358-3.174-1.358-4.948 0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10z"/>
      </svg>
    </a>

    <!-- Trade Assistant Chat Trigger -->
    <button 
      type="button" 
      id="trade-bot-toggle" 
      class="chat-trigger-btn" 
      aria-expanded="false" 
      aria-controls="trade-bot-widget"
      title="Open Ibrahim Enterprise B2B Trade Assistant"
    >
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
      </svg>
      <span>Trade Assistant</span>
    </button>

    <!-- Trade Assistant Chat Window -->
    <div id="trade-bot-widget" class="trade-bot-widget" role="dialog" aria-modal="true" aria-label="Trade Assistant Chatbot">
      <div class="trade-bot-header">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs tracking-wider">
            IE
          </div>
          <div>
            <div class="font-bold text-sm tracking-tight">Ibrahim Enterprise</div>
            <div class="text-[11px] text-emerald-100 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              Trade Intelligence Desk
            </div>
          </div>
        </div>
        <button type="button" id="trade-bot-close" class="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10" aria-label="Close Trade Assistant">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Messages Body -->
      <div id="trade-bot-msgs" class="trade-bot-messages">
        <div class="trade-bot-msg bot">
          <p class="font-semibold text-slate-900 mb-1">Welcome to Ibrahim Enterprise.</p>
          <p>We specialize in international agricultural food commodity trading, importing pure Hing from Afghanistan, and exporting premium agricultural products worldwide.</p>
          <p class="mt-2 text-slate-500 text-xs">Select a topic below or type your inquiry:</p>
          <div class="trade-bot-pills">
            <button class="trade-bot-pill" data-faq="hing">🌿 Afghanistan Hing Import</button>
            <button class="trade-bot-pill" data-faq="export">🌾 Export Portfolio</button>
            <button class="trade-bot-pill" data-faq="volume">📦 Trade Volumes</button>
            <button class="trade-bot-pill" data-faq="markets">🌍 Target Export Markets</button>
            <button class="trade-bot-pill" data-faq="dubai">🏢 Dubai Logistics Expansion</button>
            <button class="trade-bot-pill" data-faq="quote">📝 Request a Quote</button>
            <button class="trade-bot-pill" data-faq="contact">📞 Contact Trade Desk</button>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <form id="trade-bot-form" class="trade-bot-input-bar">
        <input 
          type="text" 
          id="trade-bot-input" 
          placeholder="Ask about commodities, volumes, markets..." 
          autocomplete="off"
          aria-label="Type your trade question"
        >
        <button type="submit" class="trade-bot-send-btn" aria-label="Send Message">
          <svg class="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
          </svg>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(suite);

  // Widget toggle logic
  const toggleBtn = document.getElementById('trade-bot-toggle');
  const closeBtn = document.getElementById('trade-bot-close');
  const widget = document.getElementById('trade-bot-widget');
  const form = document.getElementById('trade-bot-form');
  const input = document.getElementById('trade-bot-input');
  const msgsContainer = document.getElementById('trade-bot-msgs');

  const openBot = () => {
    widget.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    input.focus();
  };

  const closeBot = () => {
    widget.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    if (widget.classList.contains('active')) {
      closeBot();
    } else {
      openBot();
    }
  });

  closeBtn.addEventListener('click', closeBot);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('active')) {
      closeBot();
    }
  });

  // Approved B2B Knowledge Base
  const FAQ_RESPONSES = {
    hing: {
      title: "Afghanistan Hing / Asafoetida Import",
      text: "Ibrahim Enterprise coordinates direct imports of authentic Asafoetida (Hing) from harvest regions in Afghanistan. With an indicative import capacity of approximately 20 Metric Tons per month, we handle pure raw gum resin tears, crystalline lumps, and compounded/processed grades for spice blenders and institutional buyers."
    },
    export: {
      title: "Export Product Portfolio",
      text: "Our export portfolio includes:\n• Spices: Pure Hing, Tellicherry Black Pepper, Green Cardamom\n• Rice & Food Products: Traditional & 1121 Basmati Rice, Desiccated Coconut Powder (Fine & Medium), Dehydrated White/Red Onion Powder & Flakes\n• Fresh Agricultural Produce: Farm-fresh export vegetables\n• Marine Seafood: Export-grade marine seafood"
    },
    volume: {
      title: "Trade Volumes & Capacity",
      text: "• Import: Approximately 20 MT/month of pure Hing from Afghanistan.\n• Export: Client-discussed export portfolio of approximately 100 containers per month across agricultural commodities, containerized via southern Indian coastal ports."
    },
    markets: {
      title: "Target Global Markets",
      text: "Ibrahim Enterprise targets global food commodity corridors, including:\n• Sri Lanka & Southeast Asia (Malaysia, Singapore, Thailand)\n• China & East Asia\n• Middle East & Gulf Cooperations\n• United States, United Kingdom, and Europe"
    },
    dubai: {
      title: "Dubai Warehouse Expansion",
      text: "A dedicated bonded warehouse facility in Dubai is a planned future expansion by Ibrahim Enterprise to maintain strategic buffer inventories and accelerate cargo turnaround for Gulf, European, and Western trading partners."
    },
    quote: {
      title: "Submitting a Trade Inquiry",
      text: "To receive commercial specifications and FOB/CIF price indications, click 'Request a Quote' on our website or reach our Trade Desk directly via WhatsApp (+91 80561 03146) or email (ibraexim@gmail.com)."
    },
    contact: {
      title: "Trade Desk Contact Details",
      text: "• Office Address: 16/7, F1 Azeez Mulk 7th Street, Thousand Lights, Chennai - 600 006, Tamil Nadu, India\n• Phone: (0091) 80561 03146\n• WhatsApp: +91 80561 03146\n• Email: ibraexim@gmail.com"
    }
  };

  const appendMsg = (text, sender = 'bot', actionHtml = '') => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `trade-bot-msg ${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, '<br>') + (actionHtml ? `<div class="mt-2.5 pt-2 border-t border-slate-200/80 flex flex-wrap gap-2">${actionHtml}</div>` : '');
    msgsContainer.appendChild(msgDiv);
    msgsContainer.scrollTop = msgsContainer.scrollHeight;
  };

  // Click on FAQ pills
  msgsContainer.addEventListener('click', (e) => {
    const pill = e.target.closest('[data-faq]');
    if (!pill) return;
    const key = pill.getAttribute('data-faq');
    const item = FAQ_RESPONSES[key];
    if (item) {
      appendMsg(pill.textContent, 'user');
      setTimeout(() => {
        const actionHtml = `
          <button data-open-quote class="text-xs bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-emerald-800 transition-colors">Request a Quote</button>
          <a href="https://wa.me/918056103146?text=Hello%20Ibrahim%20Enterprise%2C%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(item.title)}." target="_blank" rel="noopener noreferrer" class="text-xs bg-green-600 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-green-700 transition-colors">Chat on WhatsApp</a>
        `;
        appendMsg(`<strong>${item.title}</strong><br>${item.text}`, 'bot', actionHtml);
        // rebind any newly rendered quote button
        initQuoteTriggers();
      }, 250);
    }
  });

  // Handle free text query
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendMsg(query, 'user');
    input.value = '';

    const lower = query.toLowerCase();

    setTimeout(() => {
      let matchedKey = null;

      if (lower.includes('hing') || lower.includes('asafoetida') || lower.includes('afghan')) {
        matchedKey = 'hing';
      } else if (lower.includes('rice') || lower.includes('basmati') || lower.includes('coconut') || lower.includes('onion') || lower.includes('pepper') || lower.includes('cardamom') || lower.includes('spice') || lower.includes('seafood') || lower.includes('vegetable') || lower.includes('product')) {
        matchedKey = 'export';
      } else if (lower.includes('volume') || lower.includes('container') || lower.includes('metric') || lower.includes('capacity') || lower.includes('mt')) {
        matchedKey = 'volume';
      } else if (lower.includes('market') || lower.includes('destination') || lower.includes('country') || lower.includes('export to') || lower.includes('malaysia') || lower.includes('singapore') || lower.includes('sri lanka') || lower.includes('europe') || lower.includes('usa')) {
        matchedKey = 'markets';
      } else if (lower.includes('dubai') || lower.includes('warehouse') || lower.includes('expansion') || lower.includes('hub')) {
        matchedKey = 'dubai';
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('address') || lower.includes('location')) {
        matchedKey = 'contact';
      } else if (lower.includes('quote') || lower.includes('inquiry') || lower.includes('price') || lower.includes('rate') || lower.includes('order') || lower.includes('moq')) {
        matchedKey = 'quote';
      }

      if (matchedKey) {
        const item = FAQ_RESPONSES[matchedKey];
        const actionHtml = `
          <button data-open-quote class="text-xs bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-emerald-800 transition-colors">Request a Quote</button>
          <a href="https://wa.me/918056103146?text=Hello%20Ibrahim%20Enterprise%2C%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(query)}." target="_blank" rel="noopener noreferrer" class="text-xs bg-green-600 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-green-700 transition-colors">Chat on WhatsApp</a>
        `;
        appendMsg(`<strong>${item.title}</strong><br>${item.text}`, 'bot', actionHtml);
        initQuoteTriggers();
      } else {
        const fallbackText = "Thank you for your question. For specific commercial inquiries, contract volumes, or customized commodity specifications, our Trade Directors are available directly via WhatsApp (+91 80561 03146) or our Trade Inquiry Form.";
        const fallbackActions = `
          <button data-open-quote class="text-xs bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-emerald-800 transition-colors">Submit Trade Inquiry</button>
          <a href="https://wa.me/918056103146?text=Hello%20Ibrahim%20Enterprise%2C%20I%20would%20like%20to%20discuss%20${encodeURIComponent(query)}." target="_blank" rel="noopener noreferrer" class="text-xs bg-green-600 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-green-700 transition-colors">Chat on WhatsApp</a>
          <a href="tel:+918056103146" class="text-xs bg-slate-800 text-white font-semibold px-2.5 py-1 rounded-md hover:bg-slate-900 transition-colors">Call Trade Desk</a>
        `;
        appendMsg(fallbackText, 'bot', fallbackActions);
        initQuoteTriggers();
      }
    }, 300);
  });
}

// =========================================================================
// Card & Text Scroll Reveal Controller
// =========================================================================
function initScrollReveal() {
  // If user prefers reduced motion or IntersectionObserver is unsupported, show everything immediately
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    document.documentElement.classList.add('reveal-ready');
    document.querySelectorAll('.reveal-card, .reveal-text, .reveal-fade, .product-card').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Activate CSS rules safely
  document.documentElement.classList.add('reveal-ready');

  // Automatic smart detection:
  // 1. Tag any untagged product cards
  document.querySelectorAll('.product-card:not(.reveal-card)').forEach(card => {
    card.classList.add('reveal-card');
  });

  // 2. Tag cards inside grids across main content (e.g. metrics, value propositions, steps)
  document.querySelectorAll('main section .grid > div, main section .grid > article').forEach(card => {
    if (!card.classList.contains('reveal-card') && !card.classList.contains('reveal-text') && !card.id.includes('container') && !card.classList.contains('contents')) {
      card.classList.add('reveal-card');
    }
  });

  // 3. Tag section headings across main content
  document.querySelectorAll('main section h2:not(.reveal-text), main section .section-title:not(.reveal-text)').forEach(heading => {
    if (!heading.closest('.reveal-card') && !heading.closest('.product-card')) {
      heading.classList.add('reveal-text');
    }
  });

  // 4. Automatically calculate stagger delays for sibling cards in the same grid
  document.querySelectorAll('.grid').forEach(grid => {
    const cards = Array.from(grid.children).filter(el => el.classList.contains('reveal-card'));
    if (cards.length > 1) {
      cards.forEach((card, idx) => {
        // if no explicit delay class or data-delay exists
        if (!card.dataset.delay && !card.className.includes('delay-')) {
          const delay = Math.min((idx % 4) * 85, 340); // cascade in waves per row
          if (delay > 0) {
            card.style.transitionDelay = `${delay}ms`;
          }
        }
      });
    }
  });

  // IntersectionObserver configuration
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.reveal-card:not(.is-visible), .reveal-text:not(.is-visible), .reveal-fade:not(.is-visible)');
  targets.forEach(target => observer.observe(target));
}

// Make accessible globally so dynamic pages (products.html, insights.html) can re-trigger on render
window.initScrollReveal = initScrollReveal;
