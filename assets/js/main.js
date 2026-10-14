/**
 * IBRAHIM GROUPS - MAIN SCRIPT
 * Handles navigation, mobile drawer, scroll animations, modals, and dynamic rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initActiveNavLink();
  initQuoteTriggers();
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
