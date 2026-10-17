/**
 * IBRAHIM ENTERPRISE - ENTERPRISE ADMIN MANAGEMENT SYSTEM
 * Powers the trade operations dashboard, B2B lead CRM, catalog manager, insights editor & settings.
 */

// Initial Seed Inquiries for demo/first load if empty
const INITIAL_INQUIRIES = [
  {
    id: "INQ-9482A",
    fullName: "Tariq Al-Mansoor",
    companyName: "Al-Khaleej Spice & Food Imports LLC",
    email: "t.mansoor@alkhaleejfoods.ae",
    phone: "+971 50 839 2011",
    country: "United Arab Emirates",
    inquiryType: "Hing Import Inquiry",
    product: "Pure Hing / Asafoetida",
    quantity: "10",
    unit: "Metric Tons (MT)",
    destination: "Jebel Ali Port, Dubai",
    message: "Seeking direct supply of Grade-A raw Afghan Asafoetida tears. Please share CIF Jebel Ali quotation and COA for volatile oil content.",
    status: "Quoted",
    notes: "Quotation sent on 14 Oct 2026. CIF USD 4,200/MT for raw crystalline tears. Awaiting buyer confirmation of irrevocable LC.",
    timestamp: "2026-10-14T09:30:00.000Z"
  },
  {
    id: "INQ-8823B",
    fullName: "Marcus Vance",
    companyName: "Vance & Sterling Commodity Brokers",
    email: "m.vance@vs-commodities.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    inquiryType: "Export Consignment",
    product: "Basmati Rice",
    quantity: "5",
    unit: "Containers (FCL)",
    destination: "Port of Felixstowe, UK",
    message: "Looking for 1121 Golden Sella Basmati in 20kg private-label BOPP bags. Require UK MRL compliance certificate and fumigation guarantee.",
    status: "In Review",
    notes: "Reviewing miller batch test reports for EU/UK MRL compliance. Trade desk preparing FOB Chennai & CIF Felixstowe pricing.",
    timestamp: "2026-10-15T11:45:00.000Z"
  },
  {
    id: "INQ-7719C",
    fullName: "Dinesh Perera",
    companyName: "Lanka Wholesale Food Distributors",
    email: "dinesh@lankafoods.lk",
    phone: "+94 77 123 4567",
    country: "Sri Lanka",
    inquiryType: "Export Consignment",
    product: "Fresh Agricultural Produce & Vegetables",
    quantity: "2",
    unit: "Containers (FCL)",
    destination: "Colombo Port",
    message: "Urgent shipment of Nashik/Tamil Nadu red onions and green chillies in 40ft reefer containers. Target shipment within 7 days.",
    status: "New",
    notes: "",
    timestamp: "2026-10-16T08:15:00.000Z"
  },
  {
    id: "INQ-6604D",
    fullName: "Sarah Chen",
    companyName: "Pacific Marine & Frozen Provisions",
    email: "sarah.chen@pacificmarine.sg",
    phone: "+65 6789 0123",
    country: "Singapore",
    inquiryType: "Export Consignment",
    product: "Export Marine Seafood",
    quantity: "1",
    unit: "Containers (FCL)",
    destination: "Jurong Port, Singapore",
    message: "Need 20 MT blast-frozen Vannamei Prawns 30/40 count and cuttlefish whole cleaned. Delivery needed by mid-November.",
    status: "Closed",
    notes: "Contract finalized. 30% advance received, balance against BL copy. Reefer booking confirmed on Maersk line.",
    timestamp: "2026-10-12T14:20:00.000Z"
  },
  {
    id: "INQ-5521E",
    fullName: "Heinrich Weber",
    companyName: "Hanseatic Spice Imports GmbH",
    email: "h.weber@hanseatic-spices.de",
    phone: "+49 40 555 0192",
    country: "Germany",
    inquiryType: "Export Consignment",
    product: "Black Pepper",
    quantity: "15",
    unit: "Metric Tons (MT)",
    destination: "Port of Hamburg",
    message: "Interested in Tellicherry bold sun-dried black peppercorns (TGSEB grade). Need lab certificate with piperine and moisture levels.",
    status: "New",
    notes: "",
    timestamp: "2026-10-16T14:10:00.000Z"
  }
];

// Default Company Settings
const DEFAULT_SETTINGS = {
  companyName: "Ibrahim Enterprise",
  tagline: "International Agricultural Food Commodity Import & Export",
  phonePrimary: "(0091) 80561 03146",
  phoneSecondary: "+91 80561 03146",
  emailTrade: "ibraexim@gmail.com",
  whatsappNumber: "+918056103146",
  addressHeadquarters: "16/7, F1 Azeez Mulk 7th Street, Thousand Lights, Chennai - 600 006, Tamil Nadu, India.",
  addressCorridor: "Kabul & Herat Sourcing Hubs, Afghanistan (Direct Import Custody)",
  operatingCurrency: "USD ($)",
  monthlyImportCapacity: "20 Metric Tons Pure Hing",
  monthlyExportPortfolio: "100+ Containers / Month"
};

class AdminApp {
  constructor() {
    this.currentTab = 'dashboard';
    this.inquiryFilter = 'all';
    this.searchQuery = '';
    this.selectedInquiry = null;
    this.deleteTarget = null; // { type: 'product'|'inquiry'|'insight', id: ... }

    this.initData();
    this.initAuth();
  }

  // --- DATA INITIALIZATION & SYNC ---
  initData() {
    // 1. Inquiries
    if (!localStorage.getItem('ibrahim_inquiries')) {
      localStorage.setItem('ibrahim_inquiries', JSON.stringify(INITIAL_INQUIRIES));
    }

    // 2. Products
    if (!localStorage.getItem('ibrahim_custom_products') && typeof DEFAULT_PRODUCTS !== 'undefined') {
      localStorage.setItem('ibrahim_custom_products', JSON.stringify(DEFAULT_PRODUCTS));
    }

    // 3. Insights
    if (!localStorage.getItem('ibrahim_custom_insights') && typeof DEFAULT_INSIGHTS !== 'undefined') {
      localStorage.setItem('ibrahim_custom_insights', JSON.stringify(DEFAULT_INSIGHTS));
    }

    // 4. Settings
    const existingSettings = localStorage.getItem('ibrahim_admin_settings');
    if (!existingSettings || existingSettings.includes('ibrahimgroupss@gmail.com') || existingSettings.includes('Neelangarai')) {
      localStorage.setItem('ibrahim_admin_settings', JSON.stringify(DEFAULT_SETTINGS));
    }
  }

  getInquiries() {
    try {
      return JSON.parse(localStorage.getItem('ibrahim_inquiries') || '[]');
    } catch (e) {
      return [];
    }
  }

  saveInquiries(list) {
    localStorage.setItem('ibrahim_inquiries', JSON.stringify(list));
    this.updateNotificationBadge();
  }

  getProducts() {
    try {
      const raw = localStorage.getItem('ibrahim_custom_products');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : [];
  }

  saveProducts(list) {
    localStorage.setItem('ibrahim_custom_products', JSON.stringify(list));
  }

  getInsights() {
    try {
      const raw = localStorage.getItem('ibrahim_custom_insights');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return typeof DEFAULT_INSIGHTS !== 'undefined' ? DEFAULT_INSIGHTS : [];
  }

  saveInsights(list) {
    localStorage.setItem('ibrahim_custom_insights', JSON.stringify(list));
  }

  getSettings() {
    try {
      const raw = localStorage.getItem('ibrahim_admin_settings');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return DEFAULT_SETTINGS;
  }

  saveSettings(obj) {
    localStorage.setItem('ibrahim_admin_settings', JSON.stringify(obj));
  }

  // --- AUTHENTICATION ---
  initAuth() {
    const isAuth = sessionStorage.getItem('ibrahim_admin_logged_in') === 'true' || 
                   localStorage.getItem('ibrahim_admin_remember') === 'true';

    const loginSection = document.getElementById('login-section');
    const appSection = document.getElementById('app-section');

    if (isAuth) {
      if (loginSection) loginSection.classList.add('hidden');
      if (appSection) appSection.classList.remove('hidden');
      this.initDashboard();
    } else {
      if (loginSection) loginSection.classList.remove('hidden');
      if (appSection) appSection.classList.add('hidden');
      this.bindLoginForm();
    }

    // Auto-sync with Firebase Auth state
    if (window.SERVICES_CONFIG && window.SERVICES_CONFIG.readyPromise) {
      window.SERVICES_CONFIG.readyPromise.then(() => {
        if (window.SERVICES_CONFIG.auth && window.SERVICES_CONFIG.authMod) {
          const { onAuthStateChanged } = window.SERVICES_CONFIG.authMod;
          if (typeof onAuthStateChanged === 'function') {
            onAuthStateChanged(window.SERVICES_CONFIG.auth, (user) => {
              if (user && !isAuth) {
                sessionStorage.setItem('ibrahim_admin_logged_in', 'true');
                if (loginSection) loginSection.classList.add('hidden');
                if (appSection) appSection.classList.remove('hidden');
                this.initDashboard();
              }
            });
          }
        }
      });
    }
  }

  bindLoginForm() {
    const form = document.getElementById('admin-login-form');
    const demoBtn = document.getElementById('btn-demo-login');
    const errorMsg = document.getElementById('login-error');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value;
        const remember = document.getElementById('login-remember')?.checked;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Sign In';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">◌</span> Authenticating...';
        }

        let authenticated = false;

        // 1. Try Firebase Official Authentication if available
        try {
          if (window.SERVICES_CONFIG && window.SERVICES_CONFIG.readyPromise) {
            await window.SERVICES_CONFIG.readyPromise;
          }
          if (window.SERVICES_CONFIG && window.SERVICES_CONFIG.auth && window.SERVICES_CONFIG.authMod) {
            const { signInWithEmailAndPassword } = window.SERVICES_CONFIG.authMod;
            if (typeof signInWithEmailAndPassword === 'function') {
              const userCredential = await signInWithEmailAndPassword(window.SERVICES_CONFIG.auth, email, pass);
              if (userCredential && userCredential.user) {
                authenticated = true;
                console.log("[Firebase] Authenticated staff user:", userCredential.user.email);
              }
            }
          }
        } catch (firebaseErr) {
          console.warn("[Firebase] Cloud authentication note:", firebaseErr.code || firebaseErr.message);
        }

        // 2. Local fallback credentials check (for offline/demo preview)
        const validEmails = ['admin@ibrahimexim.com', 'admin@ibrahimenterprise.com', 'ibraexim@gmail.com'];
        if (!authenticated && validEmails.includes(email.toLowerCase()) && pass === 'admin123') {
          authenticated = true;
          console.log("[Admin] Logged in via local development credentials.");
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        if (authenticated) {
          sessionStorage.setItem('ibrahim_admin_logged_in', 'true');
          if (remember) {
            localStorage.setItem('ibrahim_admin_remember', 'true');
          }
          this.showToast('Login successful. Welcome back, Director.', 'success');
          this.initAuth();
        } else {
          if (errorMsg) {
            errorMsg.classList.remove('hidden');
            errorMsg.textContent = 'Invalid credentials. Please verify your email and password.';
          }
        }
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        document.getElementById('login-email').value = 'admin@ibrahimenterprise.com';
        document.getElementById('login-password').value = 'admin123';
        sessionStorage.setItem('ibrahim_admin_logged_in', 'true');
        this.showToast('Logged in via Quick Demo access.', 'success');
        this.initAuth();
      });
    }
  }

  async logout() {
    try {
      if (window.SERVICES_CONFIG && window.SERVICES_CONFIG.auth && window.SERVICES_CONFIG.authMod) {
        const { signOut } = window.SERVICES_CONFIG.authMod;
        if (typeof signOut === 'function') {
          await signOut(window.SERVICES_CONFIG.auth);
        }
      }
    } catch (e) {
      console.warn("Auth sign-out notice:", e);
    }
    sessionStorage.removeItem('ibrahim_admin_logged_in');
    localStorage.removeItem('ibrahim_admin_remember');
    this.showToast('Logged out securely.', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  // --- DASHBOARD INIT ---
  initDashboard() {
    this.bindNavigation();
    this.bindGlobalSearch();
    this.updateNotificationBadge();
    this.renderCurrentView();

    // Trigger subtle background sync with Cloud Firestore
    this.syncInquiriesFromFirebase(true);

    // Bind logout button
    const logoutBtns = document.querySelectorAll('[data-logout]');
    logoutBtns.forEach(btn => btn.addEventListener('click', () => this.logout()));

    // Bind mobile menu toggle
    const mobileBtn = document.getElementById('admin-mobile-toggle');
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        if (backdrop) backdrop.classList.toggle('hidden');
      });
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          sidebar.classList.add('-translate-x-full');
          backdrop.classList.add('hidden');
        });
      }
    }
  }

  bindNavigation() {
    const navItems = document.querySelectorAll('[data-tab]');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-tab');
        this.switchTab(target);

        // Auto close mobile drawer if open
        const sidebar = document.getElementById('admin-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
          sidebar.classList.add('-translate-x-full');
          if (backdrop) backdrop.classList.add('hidden');
        }
      });
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('[data-tab]').forEach(el => {
      if (el.getAttribute('data-tab') === tabName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Toggle view containers
    document.querySelectorAll('.tab-view').forEach(view => {
      if (view.id === `view-${tabName}`) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    });

    this.renderCurrentView();
  }

  renderCurrentView() {
    switch (this.currentTab) {
      case 'dashboard':
        this.renderOverview();
        break;
      case 'inquiries':
        this.renderInquiries();
        break;
      case 'products':
        this.renderProducts();
        break;
      case 'insights':
        this.renderInsights();
        break;
      case 'analytics':
        this.renderAnalytics();
        break;
      case 'settings':
        this.renderSettings();
        break;
    }
  }

  // --- GLOBAL SEARCH ---
  bindGlobalSearch() {
    const input = document.getElementById('global-search');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderCurrentView();
    });
  }

  updateNotificationBadge() {
    const inquiries = this.getInquiries();
    const newCount = inquiries.filter(i => (i.status || 'New') === 'New').length;
    
    const badges = document.querySelectorAll('.unread-inquiries-badge');
    badges.forEach(b => {
      if (newCount > 0) {
        b.textContent = newCount;
        b.classList.remove('hidden');
      } else {
        b.classList.add('hidden');
      }
    });
  }

  // =========================================================================
  // VIEW 1: DASHBOARD OVERVIEW
  // =========================================================================
  renderOverview() {
    const inquiries = this.getInquiries();
    const products = this.getProducts();
    const insights = this.getInsights();

    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => (i.status || 'New') === 'New').length;
    const quotedInquiries = inquiries.filter(i => i.status === 'Quoted').length;
    const activeProducts = products.length;

    // Stat numbers
    document.getElementById('stat-total-inquiries').textContent = totalInquiries;
    document.getElementById('stat-new-inquiries').textContent = newInquiries;
    document.getElementById('stat-active-products').textContent = activeProducts;
    document.getElementById('stat-published-insights').textContent = insights.length;

    // Recent 5 Inquiries
    const recentContainer = document.getElementById('overview-recent-inquiries');
    if (recentContainer) {
      const topFive = [...inquiries].reverse().slice(0, 5);
      if (topFive.length === 0) {
        recentContainer.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-slate-400">No trade inquiries logged yet.</td></tr>`;
      } else {
        recentContainer.innerHTML = topFive.map(inq => {
          const statusBadge = this.getStatusBadge(inq.status || 'New');
          const dateStr = inq.timestamp ? new Date(inq.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent';
          return `
            <tr>
              <td class="font-medium text-slate-900">
                <div class="font-semibold">${this.escape(inq.fullName)}</div>
                <div class="text-xs text-slate-400">${this.escape(inq.companyName || inq.country || 'Trade Buyer')}</div>
              </td>
              <td>
                <span class="font-medium text-slate-700">${this.escape(inq.product)}</span>
                <span class="text-xs text-slate-400 block">${this.escape(inq.quantity || '')} ${this.escape(inq.unit || '')}</span>
              </td>
              <td>
                <span class="text-slate-600 text-xs">${this.escape(inq.destination || inq.country || 'Global')}</span>
              </td>
              <td>${statusBadge}</td>
              <td class="text-right">
                <button class="text-xs font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md" onclick="adminApp.openInquiryDetail('${inq.id}')">
                  View
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // Draw Inquiries Volume Chart
    this.drawOverviewChart(inquiries);
  }

  drawOverviewChart(inquiries) {
    const canvas = document.getElementById('chart-inquiries-trend');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize for crisp high-DPI display
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    // Mock 6-month historical timeline data culminating in current month
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const values = [12, 18, 22, 29, 36, inquiries.length > 35 ? inquiries.length : 42];

    const padding = { top: 20, right: 20, bottom: 30, left: 35 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...values) * 1.2;

    // Draw gridlines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const label = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(label.toString(), padding.left - 8, y + 3);
    }

    // Draw gradient area
    const step = chartW / (months.length - 1);
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(15, 161, 74, 0.28)');
    gradient.addColorStop(1, 'rgba(15, 161, 74, 0.01)');

    ctx.beginPath();
    months.forEach((m, i) => {
      const x = padding.left + i * step;
      const y = padding.top + chartH - (values[i] / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + (months.length - 1) * step, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    months.forEach((m, i) => {
      const x = padding.left + i * step;
      const y = padding.top + chartH - (values[i] / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#0fa14a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points and month labels
    months.forEach((m, i) => {
      const x = padding.left + i * step;
      const y = padding.top + chartH - (values[i] / maxVal) * chartH;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#095226';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Month text
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(m, x, height - 10);
    });
  }

  // =========================================================================
  // VIEW 2: TRADE INQUIRIES & LEAD CRM
  // =========================================================================
  renderInquiries() {
    let list = this.getInquiries();

    // 1. Status Filter
    if (this.inquiryFilter !== 'all') {
      list = list.filter(item => (item.status || 'New').toLowerCase() === this.inquiryFilter.toLowerCase());
    }

    // 2. Search Query
    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(i => 
        (i.fullName && i.fullName.toLowerCase().includes(q)) ||
        (i.companyName && i.companyName.toLowerCase().includes(q)) ||
        (i.product && i.product.toLowerCase().includes(q)) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        (i.country && i.country.toLowerCase().includes(q)) ||
        (i.destination && i.destination.toLowerCase().includes(q))
      );
    }

    // Sort descending by date
    list.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

    const tbody = document.getElementById('inquiries-table-body');
    const countBadge = document.getElementById('inquiries-filtered-count');
    if (countBadge) countBadge.textContent = `${list.length} leads`;

    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            <svg class="w-10 h-10 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
            No inquiries match your current filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(inq => {
      const dateFormatted = inq.timestamp ? new Date(inq.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';
      const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
      const waLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inq.fullName)},%20greetings%20from%20Ibrahim%20Enterprise%20Trade%20Desk.` : '#';
      const mailLink = inq.email ? `mailto:${inq.email}?subject=Official%20Trade%20Quote%20-%20Ibrahim%20Enterprise&body=Dear%20${encodeURIComponent(inq.fullName)},%0D%0A%0D%0AThank%20you%20for%20your%20inquiry%20regarding%20${encodeURIComponent(inq.product)}.` : '#';

      return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="text-xs text-slate-500 whitespace-nowrap">
            <span class="font-mono text-slate-400 block">${this.escape(inq.id || 'INQ')}</span>
            ${dateFormatted}
          </td>
          <td>
            <div class="font-bold text-slate-900">${this.escape(inq.fullName)}</div>
            <div class="text-xs text-slate-500">${this.escape(inq.companyName || 'Private Buyer')}</div>
            <div class="text-xs text-emerald-700">${this.escape(inq.country || '')}</div>
          </td>
          <td>
            <div class="font-semibold text-slate-800">${this.escape(inq.product)}</div>
            <div class="text-xs text-slate-500">
              ${this.escape(inq.quantity || '-')} ${this.escape(inq.unit || '')}
            </div>
          </td>
          <td>
            <div class="text-xs text-slate-700 font-medium">${this.escape(inq.destination || inq.country || 'FOB Basis')}</div>
            <div class="text-[11px] text-slate-400">${this.escape(inq.inquiryType || 'Trade Inquiry')}</div>
          </td>
          <td>
            <select onchange="adminApp.updateInquiryStatus('${inq.id}', this.value)" class="text-xs font-semibold py-1 px-2.5 rounded-full border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option value="New" ${inq.status === 'New' ? 'selected' : ''}>🟢 New</option>
              <option value="In Review" ${inq.status === 'In Review' ? 'selected' : ''}>🟡 In Review</option>
              <option value="Quoted" ${inq.status === 'Quoted' ? 'selected' : ''}>🔵 Quoted</option>
              <option value="Closed" ${inq.status === 'Closed' ? 'selected' : ''}>🟣 Closed</option>
              <option value="Archived" ${inq.status === 'Archived' ? 'selected' : ''}>⚪ Archived</option>
            </select>
          </td>
          <td>
            <div class="flex items-center gap-2">
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" title="WhatsApp Message" class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
              </a>
              <a href="${mailLink}" title="Send Email" class="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <button onclick="adminApp.openInquiryDetail('${inq.id}')" title="Inspect Lead Details" class="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button onclick="adminApp.confirmDelete('inquiry', '${inq.id}')" title="Delete Inquiry" class="p-1.5 rounded-lg text-red-500 hover:bg-red-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  setInquiryFilter(filterName) {
    this.inquiryFilter = filterName;
    document.querySelectorAll('.inquiry-filter-btn').forEach(b => {
      if (b.getAttribute('data-filter') === filterName) {
        b.className = 'inquiry-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0fa14a] text-white shadow-sm';
      } else {
        b.className = 'inquiry-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50';
      }
    });
    this.renderInquiries();
  }

  updateInquiryStatus(id, newStatus) {
    const list = this.getInquiries();
    const item = list.find(i => i.id === id);
    if (item) {
      item.status = newStatus;
      this.saveInquiries(list);
      this.showToast(`Inquiry ${id} status updated to ${newStatus}`, 'success');
      this.renderInquiries();
    }
  }

  openInquiryDetail(id) {
    const list = this.getInquiries();
    const inq = list.find(i => i.id === id);
    if (!inq) return;

    this.selectedInquiry = inq;
    const modal = document.getElementById('modal-inquiry-detail');
    if (!modal) return;

    document.getElementById('modal-inq-id').textContent = inq.id || 'INQ';
    document.getElementById('modal-inq-date').textContent = inq.timestamp ? new Date(inq.timestamp).toLocaleString() : 'N/A';
    document.getElementById('modal-inq-name').textContent = inq.fullName || '';
    document.getElementById('modal-inq-company').textContent = inq.companyName || 'Not specified';
    document.getElementById('modal-inq-email').textContent = inq.email || '';
    document.getElementById('modal-inq-email').href = `mailto:${inq.email}`;
    document.getElementById('modal-inq-phone').textContent = inq.phone || '';
    document.getElementById('modal-inq-phone').href = `tel:${inq.phone}`;
    document.getElementById('modal-inq-country').textContent = inq.country || 'N/A';
    document.getElementById('modal-inq-type').textContent = inq.inquiryType || 'Commercial Quote';
    document.getElementById('modal-inq-product').textContent = inq.product || '';
    document.getElementById('modal-inq-quantity').textContent = `${inq.quantity || ''} ${inq.unit || ''}`;
    document.getElementById('modal-inq-destination').textContent = inq.destination || 'Unspecified Port';
    document.getElementById('modal-inq-message').textContent = inq.message || 'No additional specifications provided.';
    
    // Status select
    const statusSelect = document.getElementById('modal-inq-status-select');
    if (statusSelect) statusSelect.value = inq.status || 'New';

    // Staff Notes
    const notesInput = document.getElementById('modal-inq-notes');
    if (notesInput) notesInput.value = inq.notes || '';

    // Action buttons
    const waBtn = document.getElementById('modal-inq-wa-btn');
    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
    if (waBtn) {
      waBtn.href = cleanPhone ? `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inq.fullName)},%20this%20is%20Ibrahim%20Enterprise%20Trade%20Desk%20regarding%20your%20inquiry%20for%20${encodeURIComponent(inq.product)}.` : '#';
    }

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  saveInquiryNotes() {
    if (!this.selectedInquiry) return;
    const notesInput = document.getElementById('modal-inq-notes');
    const statusSelect = document.getElementById('modal-inq-status-select');

    const list = this.getInquiries();
    const item = list.find(i => i.id === this.selectedInquiry.id);
    if (item) {
      if (notesInput) item.notes = notesInput.value.trim();
      if (statusSelect) item.status = statusSelect.value;
      this.saveInquiries(list);
      this.showToast('Inquiry dossier & notes updated successfully.', 'success');
      this.closeModal('modal-inquiry-detail');
      this.renderInquiries();
    }
  }

  openAddInquiryModal() {
    const form = document.getElementById('form-add-inquiry');
    if (form) form.reset();
    const modal = document.getElementById('modal-add-inquiry');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  submitManualInquiry(e) {
    e.preventDefault();
    const form = e.target;
    const newInq = {
      id: 'INQ-' + Date.now().toString(36).toUpperCase(),
      fullName: form.querySelector('#manual-inq-name').value.trim(),
      companyName: form.querySelector('#manual-inq-company').value.trim(),
      email: form.querySelector('#manual-inq-email').value.trim(),
      phone: form.querySelector('#manual-inq-phone').value.trim(),
      country: form.querySelector('#manual-inq-country').value.trim(),
      inquiryType: form.querySelector('#manual-inq-type').value,
      product: form.querySelector('#manual-inq-product').value,
      quantity: form.querySelector('#manual-inq-quantity').value.trim(),
      unit: form.querySelector('#manual-inq-unit').value,
      destination: form.querySelector('#manual-inq-destination').value.trim(),
      message: form.querySelector('#manual-inq-message').value.trim(),
      status: form.querySelector('#manual-inq-status').value || 'New',
      notes: form.querySelector('#manual-inq-notes').value.trim(),
      timestamp: new Date().toISOString()
    };

    const list = this.getInquiries();
    list.unshift(newInq);
    this.saveInquiries(list);
    this.showToast('New commercial trade lead logged.', 'success');
    this.closeModal('modal-add-inquiry');
    this.renderInquiries();
  }

  exportInquiriesCSV() {
    const list = this.getInquiries();
    if (!list.length) {
      this.showToast('No inquiries to export.', 'info');
      return;
    }

    const headers = ['Inquiry ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone', 'Country', 'Type', 'Commodity', 'Quantity', 'Unit', 'Destination', 'Status', 'Notes'];
    const rows = list.map(i => [
      `"${i.id || ''}"`,
      `"${i.timestamp ? new Date(i.timestamp).toISOString() : ''}"`,
      `"${(i.fullName || '').replace(/"/g, '""')}"`,
      `"${(i.companyName || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.country || '').replace(/"/g, '""')}"`,
      `"${(i.inquiryType || '').replace(/"/g, '""')}"`,
      `"${(i.product || '').replace(/"/g, '""')}"`,
      `"${(i.quantity || '').replace(/"/g, '""')}"`,
      `"${(i.unit || '').replace(/"/g, '""')}"`,
      `"${(i.destination || '').replace(/"/g, '""')}"`,
      `"${(i.status || 'New').replace(/"/g, '""')}"`,
      `"${(i.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ibrahim_Enterprise_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Exported CSV spreadsheet of all trade leads.', 'success');
  }

  exportInquiriesJSON() {
    const list = this.getInquiries();
    this.downloadJSON(list, `Ibrahim_Enterprise_Inquiries_${new Date().toISOString().slice(0, 10)}.json`);
  }

  // =========================================================================
  // VIEW 3: PRODUCT CATALOG MANAGER
  // =========================================================================
  renderProducts() {
    let list = this.getProducts();

    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.origin && p.origin.toLowerCase().includes(q)) ||
        (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }

    const grid = document.getElementById('products-admin-grid');
    const countBadge = document.getElementById('products-count-badge');
    if (countBadge) countBadge.textContent = `${list.length} commodities`;

    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          No commodities found matching your criteria.
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(prod => `
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div class="relative aspect-[16/9] bg-slate-100 overflow-hidden">
            <img src="${this.escape(prod.image)}" alt="${this.escape(prod.name)}" class="w-full h-full object-cover">
            <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded text-[11px] font-bold ${prod.tradeType === 'Import' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                ${this.escape(prod.tradeType)}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
                ${this.escape(prod.origin)}
              </span>
            </div>
          </div>
          <div class="p-4">
            <div class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">${this.escape(prod.category)}</div>
            <h4 class="font-bold text-slate-900 text-base mt-0.5">${this.escape(prod.name)}</h4>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">${this.escape(prod.shortDesc || prod.tagline || '')}</p>
            <div class="mt-3 text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
              <span class="font-semibold text-slate-700">Volume:</span> ${this.escape(prod.reportedVolume || 'On Request')}
            </div>
          </div>
        </div>
        <div class="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
          <a href="product-detail.html?slug=${this.escape(prod.slug)}" target="_blank" class="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
            <span>View Live</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
          <div class="flex items-center gap-1.5">
            <button onclick="adminApp.openEditProductModal('${prod.id}')" class="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
              Edit
            </button>
            <button onclick="adminApp.confirmDelete('product', '${prod.id}')" class="p-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Delete Commodity">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  openAddProductModal() {
    const form = document.getElementById('form-product-editor');
    if (form) form.reset();
    document.getElementById('product-modal-title').textContent = 'Add New Trade Commodity';
    document.getElementById('edit-product-id').value = '';
    document.getElementById('product-image-preview').src = 'assets/images/hing-afghanistan.jpg';

    const statusEl = document.getElementById('prod-upload-status');
    if (statusEl) statusEl.textContent = '';
    const prog = document.getElementById('prod-upload-progress-container');
    if (prog) prog.classList.add('hidden');

    // Clear highlights
    this.renderHighlightInputs(['Authentic Origin Sourcing', 'Strict Phyto-sanitary Compliance', 'Export Standard Packaging']);

    const modal = document.getElementById('modal-product-editor');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  openEditProductModal(id) {
    const list = this.getProducts();
    const prod = list.find(p => p.id === id);
    if (!prod) return;

    document.getElementById('product-modal-title').textContent = `Edit Commodity: ${prod.name}`;
    document.getElementById('edit-product-id').value = prod.id;
    document.getElementById('prod-name').value = prod.name || '';
    document.getElementById('prod-slug').value = prod.slug || '';
    document.getElementById('prod-category').value = prod.category || 'Spices';
    document.getElementById('prod-tradetype').value = prod.tradeType || 'Export';
    document.getElementById('prod-origin').value = prod.origin || 'India';
    document.getElementById('prod-volume').value = prod.reportedVolume || '';
    document.getElementById('prod-image').value = prod.image || '';
    document.getElementById('product-image-preview').src = prod.image || 'assets/images/hing-afghanistan.jpg';
    document.getElementById('prod-tagline').value = prod.tagline || '';
    document.getElementById('prod-shortdesc').value = prod.shortDesc || '';
    document.getElementById('prod-description').value = prod.description || '';
    document.getElementById('prod-packaging').value = prod.packaging || '';
    document.getElementById('prod-applications').value = prod.applications || '';

    const statusEl = document.getElementById('prod-upload-status');
    if (statusEl) statusEl.textContent = '';
    const prog = document.getElementById('prod-upload-progress-container');
    if (prog) prog.classList.add('hidden');

    // Render highlights
    this.renderHighlightInputs(prod.highlights || ['Premium Sourcing']);

    const modal = document.getElementById('modal-product-editor');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  renderHighlightInputs(highlights) {
    const container = document.getElementById('prod-highlights-container');
    if (!container) return;

    container.innerHTML = highlights.map((h, idx) => `
      <div class="flex items-center gap-2 mb-2 highlight-row">
        <input type="text" class="form-input flex-1 text-xs prod-highlight-val" value="${this.escape(h)}" placeholder="e.g. Pure Natural Oleoresin">
        <button type="button" onclick="this.parentElement.remove()" class="p-1 text-slate-400 hover:text-red-500 rounded">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');
  }

  addHighlightInput() {
    const container = document.getElementById('prod-highlights-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 mb-2 highlight-row';
    div.innerHTML = `
      <input type="text" class="form-input flex-1 text-xs prod-highlight-val" placeholder="e.g. Grade A Certified Batch">
      <button type="button" onclick="this.parentElement.remove()" class="p-1 text-slate-400 hover:text-red-500 rounded">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;
    container.appendChild(div);
  }

  saveProductForm(e) {
    e.preventDefault();
    const id = document.getElementById('edit-product-id').value;
    const name = document.getElementById('prod-name').value.trim();
    let slug = document.getElementById('prod-slug').value.trim();
    if (!slug) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Collect highlights
    const highlightInputs = document.querySelectorAll('.prod-highlight-val');
    const highlights = Array.from(highlightInputs).map(i => i.value.trim()).filter(Boolean);

    const productObj = {
      id: id || slug,
      slug: slug,
      name: name,
      category: document.getElementById('prod-category').value,
      tradeType: document.getElementById('prod-tradetype').value,
      tagline: document.getElementById('prod-tagline').value.trim(),
      origin: document.getElementById('prod-origin').value.trim(),
      reportedVolume: document.getElementById('prod-volume').value.trim(),
      image: document.getElementById('prod-image').value.trim() || 'assets/images/hing-afghanistan.jpg',
      shortDesc: document.getElementById('prod-shortdesc').value.trim(),
      description: document.getElementById('prod-description').value.trim(),
      highlights: highlights,
      packaging: document.getElementById('prod-packaging').value.trim(),
      applications: document.getElementById('prod-applications').value.trim(),
      relatedSlugs: []
    };

    const list = this.getProducts();
    if (id) {
      // Update
      const index = list.findIndex(p => p.id === id);
      if (index !== -1) {
        list[index] = productObj;
      } else {
        list.push(productObj);
      }
      this.showToast(`Updated product "${name}". Changes live on website.`, 'success');
    } else {
      // Add new
      list.push(productObj);
      this.showToast(`Added new commodity "${name}". Published to catalog.`, 'success');
    }

    this.saveProducts(list);
    this.closeModal('modal-product-editor');
    this.renderProducts();
  }

  resetProductsToDefault() {
    if (confirm('Are you sure you want to reset all products back to official factory defaults?')) {
      if (typeof DEFAULT_PRODUCTS !== 'undefined') {
        localStorage.setItem('ibrahim_custom_products', JSON.stringify(DEFAULT_PRODUCTS));
        this.showToast('Products catalog reset to verified default specification.', 'info');
        this.renderProducts();
      }
    }
  }

  exportProductsJSON() {
    const list = this.getProducts();
    this.downloadJSON(list, 'ibrahim_products_catalog.json');
  }

  // =========================================================================
  // VIEW 4: MARKET INSIGHTS & ARTICLES
  // =========================================================================
  renderInsights() {
    let list = this.getInsights();

    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(ins => 
        (ins.title && ins.title.toLowerCase().includes(q)) ||
        (ins.category && ins.category.toLowerCase().includes(q)) ||
        (ins.excerpt && ins.excerpt.toLowerCase().includes(q))
      );
    }

    const container = document.getElementById('insights-admin-list');
    const badge = document.getElementById('insights-count-badge');
    if (badge) badge.textContent = `${list.length} articles`;

    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<div class="py-12 text-center text-slate-400">No insight articles published yet.</div>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-200 transition-colors">
        <div class="flex items-start gap-4">
          <img src="${this.escape(item.image)}" alt="${this.escape(item.title)}" class="w-20 h-16 rounded-lg object-cover bg-slate-100 flex-shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">${this.escape(item.category)}</span>
              <span class="text-xs text-slate-400">${this.escape(item.date)} &bull; ${this.escape(item.readTime)}</span>
            </div>
            <h4 class="font-bold text-slate-900 text-base mt-1">${this.escape(item.title)}</h4>
            <p class="text-xs text-slate-500 mt-1 line-clamp-1 max-w-2xl">${this.escape(item.excerpt)}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 self-end md:self-center flex-shrink-0">
          <a href="insight-detail.html?slug=${this.escape(item.slug)}" target="_blank" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
            Preview
          </a>
          <button onclick="adminApp.openEditInsightModal('${item.id}')" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            Edit
          </button>
          <button onclick="adminApp.confirmDelete('insight', '${item.id}')" class="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  openAddInsightModal() {
    const form = document.getElementById('form-insight-editor');
    if (form) form.reset();
    document.getElementById('insight-modal-title').textContent = 'Publish New Commodity Insight';
    document.getElementById('edit-insight-id').value = '';
    document.getElementById('insight-date').value = 'October 2026';
    document.getElementById('insight-author').value = 'Trade Intelligence Desk • Ibrahim Enterprise';
    const preview = document.getElementById('insight-image-preview');
    if (preview) preview.src = 'assets/images/hing-afghanistan.jpg';

    const statusEl = document.getElementById('insight-upload-status');
    if (statusEl) statusEl.textContent = '';
    const prog = document.getElementById('insight-upload-progress-container');
    if (prog) prog.classList.add('hidden');

    const modal = document.getElementById('modal-insight-editor');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  openEditInsightModal(id) {
    const list = this.getInsights();
    const item = list.find(i => i.id === id);
    if (!item) return;

    document.getElementById('insight-modal-title').textContent = 'Edit Market Insight Article';
    document.getElementById('edit-insight-id').value = item.id;
    document.getElementById('insight-title').value = item.title || '';
    document.getElementById('insight-slug').value = item.slug || '';
    document.getElementById('insight-category').value = item.category || 'Trade Analysis';
    document.getElementById('insight-date').value = item.date || 'October 2026';
    document.getElementById('insight-readtime').value = item.readTime || '4 min read';
    document.getElementById('insight-image').value = item.image || 'assets/images/hing-afghanistan.jpg';
    const preview = document.getElementById('insight-image-preview');
    if (preview) preview.src = item.image || 'assets/images/hing-afghanistan.jpg';
    document.getElementById('insight-author').value = item.author || 'Trade Intelligence Desk • Ibrahim Enterprise';
    document.getElementById('insight-excerpt').value = item.excerpt || '';
    document.getElementById('insight-content').value = item.content || '';

    const statusEl = document.getElementById('insight-upload-status');
    if (statusEl) statusEl.textContent = '';
    const prog = document.getElementById('insight-upload-progress-container');
    if (prog) prog.classList.add('hidden');

    const modal = document.getElementById('modal-insight-editor');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  saveInsightForm(e) {
    e.preventDefault();
    const id = document.getElementById('edit-insight-id').value;
    const title = document.getElementById('insight-title').value.trim();
    let slug = document.getElementById('insight-slug').value.trim();
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const itemObj = {
      id: id || slug,
      slug: slug,
      title: title,
      category: document.getElementById('insight-category').value.trim(),
      date: document.getElementById('insight-date').value.trim(),
      readTime: document.getElementById('insight-readtime').value.trim(),
      image: document.getElementById('insight-image').value.trim() || 'assets/images/hing-afghanistan.jpg',
      author: document.getElementById('insight-author').value.trim(),
      excerpt: document.getElementById('insight-excerpt').value.trim(),
      content: document.getElementById('insight-content').value.trim()
    };

    const list = this.getInsights();
    if (id) {
      const idx = list.findIndex(i => i.id === id);
      if (idx !== -1) list[idx] = itemObj;
      else list.push(itemObj);
      this.showToast('Insight article updated successfully.', 'success');
    } else {
      list.push(itemObj);
      this.showToast('New insight article published.', 'success');
    }

    this.saveInsights(list);
    this.closeModal('modal-insight-editor');
    this.renderInsights();
  }

  // =========================================================================
  // VIEW 5: ANALYTICS & CORRIDORS
  // =========================================================================
  renderAnalytics() {
    const inquiries = this.getInquiries();
    
    // Status breakdown
    const total = inquiries.length || 1;
    const countNew = inquiries.filter(i => (i.status || 'New') === 'New').length;
    const countReview = inquiries.filter(i => i.status === 'In Review').length;
    const countQuoted = inquiries.filter(i => i.status === 'Quoted').length;
    const countClosed = inquiries.filter(i => i.status === 'Closed').length;

    document.getElementById('funnel-new').style.width = `${Math.round((countNew / total) * 100)}%`;
    document.getElementById('funnel-review').style.width = `${Math.round((countReview / total) * 100)}%`;
    document.getElementById('funnel-quoted').style.width = `${Math.round((countQuoted / total) * 100)}%`;
    document.getElementById('funnel-closed').style.width = `${Math.round((countClosed / total) * 100)}%`;

    document.getElementById('funnel-new-txt').textContent = `${countNew} (${Math.round((countNew / total) * 100)}%)`;
    document.getElementById('funnel-review-txt').textContent = `${countReview} (${Math.round((countReview / total) * 100)}%)`;
    document.getElementById('funnel-quoted-txt').textContent = `${countQuoted} (${Math.round((countQuoted / total) * 100)}%)`;
    document.getElementById('funnel-closed-txt').textContent = `${countClosed} (${Math.round((countClosed / total) * 100)}%)`;
  }

  // =========================================================================
  // VIEW 6: TRADE DESK & SYSTEM SETTINGS
  // =========================================================================
  renderSettings() {
    const s = this.getSettings();
    document.getElementById('set-company-name').value = s.companyName || '';
    document.getElementById('set-tagline').value = s.tagline || '';
    document.getElementById('set-phone-primary').value = s.phonePrimary || '';
    document.getElementById('set-phone-secondary').value = s.phoneSecondary || '';
    document.getElementById('set-email-trade').value = s.emailTrade || '';
    document.getElementById('set-whatsapp').value = s.whatsappNumber || '';
    document.getElementById('set-address-hq').value = s.addressHeadquarters || '';
    document.getElementById('set-address-corridor').value = s.addressCorridor || '';
  }

  saveSettingsForm(e) {
    e.preventDefault();
    const obj = {
      companyName: document.getElementById('set-company-name').value.trim(),
      tagline: document.getElementById('set-tagline').value.trim(),
      phonePrimary: document.getElementById('set-phone-primary').value.trim(),
      phoneSecondary: document.getElementById('set-phone-secondary').value.trim(),
      emailTrade: document.getElementById('set-email-trade').value.trim(),
      whatsappNumber: document.getElementById('set-whatsapp').value.trim(),
      addressHeadquarters: document.getElementById('set-address-hq').value.trim(),
      addressCorridor: document.getElementById('set-address-corridor').value.trim()
    };
    this.saveSettings(obj);
    this.showToast('Company profile & trade desk settings saved.', 'success');
  }

  downloadFullBackup() {
    const backup = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      inquiries: this.getInquiries(),
      products: this.getProducts(),
      insights: this.getInsights(),
      settings: this.getSettings()
    };
    this.downloadJSON(backup, `Ibrahim_Enterprise_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    this.showToast('Full system backup downloaded.', 'success');
  }

  triggerRestoreFile() {
    const input = document.getElementById('restore-file-input');
    if (input) input.click();
  }

  handleRestoreFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.inquiries && Array.isArray(data.inquiries)) {
          this.saveInquiries(data.inquiries);
        }
        if (data.products && Array.isArray(data.products)) {
          this.saveProducts(data.products);
        }
        if (data.insights && Array.isArray(data.insights)) {
          this.saveInsights(data.insights);
        }
        if (data.settings && typeof data.settings === 'object') {
          this.saveSettings(data.settings);
        }
        this.showToast('System data successfully restored from backup file.', 'success');
        this.renderCurrentView();
      } catch (err) {
        this.showToast('Failed to parse backup JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // --- DELETE CONFIRMATION MODAL ---
  confirmDelete(type, id) {
    this.deleteTarget = { type, id };
    const modal = document.getElementById('modal-confirm-delete');
    const desc = document.getElementById('delete-modal-desc');

    if (desc) {
      if (type === 'inquiry') desc.textContent = `Are you sure you want to delete inquiry "${id}"? This action cannot be reversed.`;
      else if (type === 'product') desc.textContent = `Are you sure you want to remove commodity "${id}" from the active trade catalog?`;
      else if (type === 'insight') desc.textContent = `Are you sure you want to unpublish and delete article "${id}"?`;
    }

    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  executeDelete() {
    if (!this.deleteTarget) return;
    const { type, id } = this.deleteTarget;

    if (type === 'inquiry') {
      let list = this.getInquiries();
      list = list.filter(i => i.id !== id);
      this.saveInquiries(list);
      this.showToast(`Inquiry ${id} deleted.`, 'info');
      this.renderInquiries();
      this.renderOverview();
    } else if (type === 'product') {
      let list = this.getProducts();
      list = list.filter(p => p.id !== id);
      this.saveProducts(list);
      this.showToast(`Commodity removed from catalog.`, 'info');
      this.renderProducts();
      this.renderOverview();
    } else if (type === 'insight') {
      let list = this.getInsights();
      list = list.filter(ins => ins.id !== id);
      this.saveInsights(list);
      this.showToast(`Article deleted.`, 'info');
      this.renderInsights();
      this.renderOverview();
    }

    this.closeModal('modal-confirm-delete');
    this.deleteTarget = null;
  }

  // --- UTILITIES ---
  getStatusBadge(status) {
    switch (status) {
      case 'New':
        return `<span class="badge-status badge-new"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>New</span>`;
      case 'In Review':
        return `<span class="badge-status badge-review"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>In Review</span>`;
      case 'Quoted':
        return `<span class="badge-status badge-quoted"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Quoted</span>`;
      case 'Closed':
        return `<span class="badge-status badge-closed"><span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Closed</span>`;
      default:
        return `<span class="badge-status badge-archived">${this.escape(status)}</span>`;
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  downloadJSON(obj, filename) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '';
    if (type === 'success') {
      icon = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    } else if (type === 'error') {
      icon = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
    } else {
      icon = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }

    toast.innerHTML = `
      ${icon}
      <span class="flex-1">${this.escape(message)}</span>
      <button onclick="this.parentElement.remove()" class="opacity-70 hover:opacity-100 p-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // =========================================================================
  // CLOUD SERVICES INTEGRATION: CLOUDINARY & FIREBASE
  // =========================================================================

  async handleProductImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('prod-upload-status');
    const progContainer = document.getElementById('prod-upload-progress-container');
    const progBar = document.getElementById('prod-upload-progress-bar');
    const previewImg = document.getElementById('product-image-preview');
    const inputUrl = document.getElementById('prod-image');

    if (progContainer) progContainer.classList.remove('hidden');
    if (progBar) progBar.style.width = '10%';
    if (statusEl) statusEl.textContent = 'Uploading to Cloudinary...';

    try {
      if (typeof window.uploadToCloudinary !== 'function') {
        throw new Error('Cloudinary uploader library not loaded.');
      }

      const res = await window.uploadToCloudinary(file, {
        onProgress: (pct) => {
          if (progBar) progBar.style.width = `${pct}%`;
          if (statusEl) statusEl.textContent = `Uploading: ${pct}%`;
        }
      });

      if (inputUrl) inputUrl.value = res.secure_url;
      if (previewImg) previewImg.src = res.secure_url;
      if (statusEl) {
        statusEl.innerHTML = `<span class="text-emerald-700 font-bold">✓ Uploaded to Cloudinary</span>`;
      }
      this.showToast('Commodity image uploaded to Cloudinary successfully.', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      if (statusEl) statusEl.innerHTML = `<span class="text-red-600 font-bold">Upload failed: ${err.message}</span>`;
      this.showToast(err.message, 'error');
    } finally {
      setTimeout(() => {
        if (progContainer) progContainer.classList.add('hidden');
      }, 1500);
    }
  }

  async handleInsightImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('insight-upload-status');
    const progContainer = document.getElementById('insight-upload-progress-container');
    const progBar = document.getElementById('insight-upload-progress-bar');
    const previewImg = document.getElementById('insight-image-preview');
    const inputUrl = document.getElementById('insight-image');

    if (progContainer) progContainer.classList.remove('hidden');
    if (progBar) progBar.style.width = '10%';
    if (statusEl) statusEl.textContent = 'Uploading cover to Cloudinary...';

    try {
      if (typeof window.uploadToCloudinary !== 'function') {
        throw new Error('Cloudinary uploader library not loaded.');
      }

      const res = await window.uploadToCloudinary(file, {
        onProgress: (pct) => {
          if (progBar) progBar.style.width = `${pct}%`;
          if (statusEl) statusEl.textContent = `Uploading: ${pct}%`;
        }
      });

      if (inputUrl) inputUrl.value = res.secure_url;
      if (previewImg) previewImg.src = res.secure_url;
      if (statusEl) {
        statusEl.innerHTML = `<span class="text-emerald-700 font-bold">✓ Uploaded to Cloudinary</span>`;
      }
      this.showToast('Insight cover image uploaded to Cloudinary.', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      if (statusEl) statusEl.innerHTML = `<span class="text-red-600 font-bold">Upload failed: ${err.message}</span>`;
      this.showToast(err.message, 'error');
    } finally {
      setTimeout(() => {
        if (progContainer) progContainer.classList.add('hidden');
      }, 1500);
    }
  }

  async handleStandaloneMediaUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('standalone-upload-status');
    const progContainer = document.getElementById('standalone-progress-container');
    const progBar = document.getElementById('standalone-progress-bar');
    const resultBox = document.getElementById('standalone-result-box');
    const resultImg = document.getElementById('standalone-result-img');
    const resultUrl = document.getElementById('standalone-result-url');

    if (progContainer) progContainer.classList.remove('hidden');
    if (progBar) progBar.style.width = '15%';
    if (statusEl) statusEl.textContent = `Uploading "${file.name}" to Cloudinary (images folder)...`;

    try {
      if (typeof window.uploadToCloudinary !== 'function') {
        throw new Error('Cloudinary uploader library not loaded.');
      }

      const res = await window.uploadToCloudinary(file, {
        onProgress: (pct) => {
          if (progBar) progBar.style.width = `${pct}%`;
          if (statusEl) statusEl.textContent = `Uploading: ${pct}% (${(file.size / 1024).toFixed(0)} KB)`;
        }
      });

      if (resultBox) resultBox.classList.remove('hidden');
      if (resultImg) resultImg.src = res.secure_url;
      if (resultUrl) resultUrl.value = res.secure_url;
      if (statusEl) {
        statusEl.innerHTML = `<span class="text-emerald-700 font-bold">✓ Upload complete! Asset stored in Cloudinary folder: images</span>`;
      }
      this.showToast('Asset uploaded to Cloudinary successfully!', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      if (statusEl) statusEl.innerHTML = `<span class="text-red-600 font-bold">Upload failed: ${err.message}</span>`;
      this.showToast(err.message, 'error');
    } finally {
      setTimeout(() => {
        if (progContainer) progContainer.classList.add('hidden');
      }, 1500);
    }
  }

  copyStandaloneUrl() {
    const input = document.getElementById('standalone-result-url');
    if (!input || !input.value) return;
    navigator.clipboard.writeText(input.value).then(() => {
      this.showToast('Cloudinary CDN URL copied to clipboard!', 'success');
    }).catch(() => {
      input.select();
      document.execCommand('copy');
      this.showToast('CDN URL copied to clipboard!', 'success');
    });
  }

  async syncInquiriesFromFirebase(isSilent = false) {
    const syncBtn = document.getElementById('btn-sync-firebase');
    const originalHtml = syncBtn ? syncBtn.innerHTML : '';
    if (syncBtn && !isSilent) {
      syncBtn.disabled = true;
      syncBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-1.5 h-4 w-4 text-emerald-700 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Connecting Cloud...</span>
      `;
    }

    try {
      if (window.SERVICES_CONFIG && window.SERVICES_CONFIG.readyPromise) {
        await window.SERVICES_CONFIG.readyPromise;
      }

      if (!window.SERVICES_CONFIG || !window.SERVICES_CONFIG.db || !window.SERVICES_CONFIG.firestoreMod) {
        if (!isSilent) {
          this.showToast("Firebase cloud connection offline or initializing. Local database active.", "info");
        }
        return;
      }

      const { collection, getDocs, query } = window.SERVICES_CONFIG.firestoreMod;
      const q = query(collection(window.SERVICES_CONFIG.db, "inquiries"));
      const snapshot = await getDocs(q);

      const cloudItems = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        cloudItems.push(Object.assign({ id: docSnap.id }, data));
      });

      if (cloudItems.length > 0) {
        const localList = this.getInquiries();
        let newCount = 0;
        cloudItems.forEach(cloudItem => {
          const exists = localList.some(l => l.id === cloudItem.id || (l.email === cloudItem.email && l.timestamp === cloudItem.timestamp));
          if (!exists) {
            localList.unshift(cloudItem);
            newCount++;
          }
        });

        if (newCount > 0) {
          this.saveInquiries(localList);
          this.renderInquiries();
          this.updateDashboardStats();
          if (!isSilent) {
            this.showToast(`Merged ${newCount} new trade leads from Cloud Firestore.`, "success");
          }
        } else if (!isSilent) {
          this.showToast("Inquiries up to date with Cloud Firestore.", "info");
        }
      } else if (!isSilent) {
        this.showToast("Cloud connection verified. Inquiries table up to date.", "info");
      }
    } catch (err) {
      console.warn("[Admin Sync] Firebase notice:", err.message);
      if (!isSilent) {
        this.showToast(`Cloud Sync note: ${err.message}. Local leads preserved.`, "info");
      }
    } finally {
      if (syncBtn && !isSilent) {
        syncBtn.disabled = false;
        syncBtn.innerHTML = originalHtml;
      }
    }
  }

  escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

// Global instance
let adminApp;
document.addEventListener('DOMContentLoaded', () => {
  adminApp = new AdminApp();

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-window:not(.hidden)').forEach(modal => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }
  });
});
