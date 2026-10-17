# Security Architecture & API Key Protection Guide
## Ibrahim Enterprise Trade Platform

This guide outlines the security hardening implemented for **Firebase** (`ibrahim-enterprise-6c8c8`) and **Cloudinary** (`dun5uome`), ensuring all client-side operations are secure, resilient, and enterprise-grade.

---

### 1. Firebase API Key & Project Hardening

#### Understanding Firebase Web API Keys
In Firebase web apps, `apiKey: "AIzaSyBkLGoNdaqWXpsxVeCMnJCq7Cxrmw16Y2A"` is a **public identifier**, not a private root secret. It identifies your project to Google backend services. Security is enforced through **Google Cloud API Key Restrictions** and **Firestore Security Rules**.

#### Step 1: Restrict HTTP Referrers in Google Cloud Console
To prevent unauthorized domains from consuming your Firebase quota:
1. Navigate to [Google Cloud API Credentials](https://console.cloud.google.com/apis/credentials?project=ibrahim-enterprise-6c8c8).
2. Select your Firebase Web API Key (named `Browser key (auto created by Firebase)` or similar).
3. Under **Set application restrictions**, choose **Websites** (HTTP referrers).
4. Add your authorized domains:
   - `https://ibrahimenterprise.com/*`
   - `https://*.pages.dev/*` *(Cloudflare Pages staging & preview)*
   - `https://*.web.app/*`
   - `https://*.firebaseapp.com/*`
   - `http://localhost:*` *(Local development)*
5. Under **API restrictions**, select **Restrict key** and allow only:
   - **Cloud Firestore API**
   - **Firebase Installations API**
   - **Google Analytics API**
6. Click **Save**.

#### Step 2: Cloud Firestore Security Rules (`firestore.rules`)
We have defined strict rules in [`firestore.rules`](file:///Users/admin/Documents/Flyggo/Ibrahim/firestore.rules):
- **Public Visitors**: Can **ONLY create** genuine trade quotes. Every submission is strictly validated:
  - Must include `fullName`, `email`, `phone`, `product`.
  - Email format and length bounds are enforced.
  - Consent must be explicitly `true`.
- **Read & Delete Protection**: Public users **CANNOT read, list, update, or delete** any customer inquiries. Only authenticated staff sessions can access leads.
- **Default Deny**: All other database collections are completely inaccessible.

**To apply in Firebase Console**:
1. Open [Firebase Console](https://console.firebase.google.com/project/ibrahim-enterprise-6c8c8/firestore/rules).
2. Copy the contents of [`firestore.rules`](file:///Users/admin/Documents/Flyggo/Ibrahim/firestore.rules).
3. Paste into the **Rules** tab and click **Publish**.

---

### 2. Cloudinary Media CDN & Unsigned Preset Security

#### Cloud Credentials
- **Cloud Name**: `dun5uome`
- **Upload Preset**: `Ibrahim Enterprise`
- **Signing Mode**: `Unsigned`
- **Target Asset Folder**: `images`
- **Settings**:
  - `overwrite: false` *(prevents tampering with or replacing existing assets)*
  - `type: upload`
  - `unique filename: false`
  - `use filename as display name: true`

#### Security Architecture
- **Zero API Secret Exposure**: By using Cloudinary's dedicated **Unsigned Upload Preset**, the secret API key (`api_secret`) is **never deployed or exposed** to the browser.
- **Scoped Upload Directory**: All uploads are strictly constrained to the `images` asset directory.
- **Client-Side Validation** (`assets/js/cloudinary-upload.js`):
  - Strict MIME type verification (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`).
  - Strict file size cap (maximum 12 MB).

---

### 3. Integrated Platform Features

| Feature | Service | Location in Codebase |
| :--- | :--- | :--- |
| **Inquiry Logging** | Firebase Firestore | [`assets/js/inquiry-form.js`](file:///Users/admin/Documents/Flyggo/Ibrahim/assets/js/inquiry-form.js) |
| **Traffic & Lead Metrics** | Firebase Analytics (`G-TX6JMCYXMR`) | [`assets/js/services-config.js`](file:///Users/admin/Documents/Flyggo/Ibrahim/assets/js/services-config.js) |
| **Commodity Photo Upload** | Cloudinary Unsigned CDN | [`admin.html`](file:///Users/admin/Documents/Flyggo/Ibrahim/admin.html#L1070-L1110) |
| **Article Cover Upload** | Cloudinary Unsigned CDN | [`admin.html`](file:///Users/admin/Documents/Flyggo/Ibrahim/admin.html#L1190-L1230) |
| **Direct Media Desk** | Cloudinary Unsigned CDN | [`admin.html`](file:///Users/admin/Documents/Flyggo/Ibrahim/admin.html#L750-L800) |
| **Cloud Lead Sync** | Firebase Firestore | [`assets/js/admin.js`](file:///Users/admin/Documents/Flyggo/Ibrahim/assets/js/admin.js) |

---
&copy; 2026 Ibrahim Enterprise. All rights reserved.
