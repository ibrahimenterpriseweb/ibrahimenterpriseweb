/**
 * IBRAHIM ENTERPRISE - CLOUD SERVICES CONFIGURATION & SECURITY MODULE
 * Centralized credentials & clients for Firebase (App, Firestore, Analytics) and Cloudinary.
 * 
 * Security Architecture:
 * 1. Firebase API Key is locked to project domain HTTP referrers.
 * 2. Firestore operations are restricted by security rules (public create-only for inquiries).
 * 3. Cloudinary uses an Unsigned Upload Preset ('Ibrahim Enterprise') with restricted folder 'images'.
 *    The Cloudinary API Secret is NEVER exposed to client-side code.
 */

(function () {
  'use strict';

  // 1. Firebase Official Configuration
  const defaultFirebaseConfig = {
    apiKey: "AIzaSyBkLGoNdaqWXpsxVeCMnJCq7Cxrmw16Y2A",
    authDomain: "ibrahim-enterprise-6c8c8.firebaseapp.com",
    projectId: "ibrahim-enterprise-6c8c8",
    storageBucket: "ibrahim-enterprise-6c8c8.firebasestorage.app",
    messagingSenderId: "738271947953",
    appId: "1:738271947953:web:24f85ed97dd97cbb74c690",
    measurementId: "G-TX6JMCYXMR"
  };

  // Allow environment override if injected via Cloudflare Pages / server
  const firebaseConfig = Object.assign(
    {},
    defaultFirebaseConfig,
    (window.ENV_FIREBASE_CONFIG && typeof window.ENV_FIREBASE_CONFIG === 'object') ? window.ENV_FIREBASE_CONFIG : {}
  );

  // 2. Cloudinary Official Configuration
  const defaultCloudinaryConfig = {
    cloudName: "dun5uome",
    uploadPreset: "Ibrahim Enterprise",
    assetFolder: "images",
    uploadUrl: "https://api.cloudinary.com/v1_1/dun5uome/image/upload"
  };

  const cloudinaryConfig = Object.assign(
    {},
    defaultCloudinaryConfig,
    (window.ENV_CLOUDINARY_CONFIG && typeof window.ENV_CLOUDINARY_CONFIG === 'object') ? window.ENV_CLOUDINARY_CONFIG : {}
  );

  // Expose global services namespace
  window.SERVICES_CONFIG = {
    firebaseConfig: Object.freeze(firebaseConfig),
    cloudinaryConfig: Object.freeze(cloudinaryConfig),
    isInitialized: false,
    app: null,
    db: null,
    analytics: null,
    readyPromise: null
  };

  /**
   * Initializes Firebase App, Firestore, and Analytics using CDN ESM
   */
  async function initFirebaseServices() {
    try {
      // Dynamic import of Firebase modules
      const [appMod, firestoreMod, analyticsMod] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js"),
        import("https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js").catch(e => {
          console.warn("[Firebase] Analytics module optional or blocked:", e.message);
          return null;
        })
      ]);

      const app = appMod.initializeApp(firebaseConfig);
      const db = firestoreMod.getFirestore(app);

      let analytics = null;
      if (analyticsMod && typeof analyticsMod.isSupported === 'function') {
        const supported = await analyticsMod.isSupported().catch(() => false);
        if (supported) {
          analytics = analyticsMod.getAnalytics(app);
          console.log("[Firebase] Analytics initialized successfully with ID:", firebaseConfig.measurementId);
        }
      }

      window.SERVICES_CONFIG.app = app;
      window.SERVICES_CONFIG.db = db;
      window.SERVICES_CONFIG.analytics = analytics;
      window.SERVICES_CONFIG.firestoreMod = firestoreMod;
      window.SERVICES_CONFIG.analyticsMod = analyticsMod;
      window.SERVICES_CONFIG.isInitialized = true;

      // Dispatch event for components listening for Firebase readiness
      window.dispatchEvent(new CustomEvent('firebase:ready', {
        detail: { app, db, analytics, config: firebaseConfig }
      }));

      return { app, db, analytics };
    } catch (err) {
      console.warn("[Firebase] Initialization notice (running in offline/fallback mode):", err.message);
      return null;
    }
  }

  // Start initialization immediately
  window.SERVICES_CONFIG.readyPromise = initFirebaseServices();

})();
