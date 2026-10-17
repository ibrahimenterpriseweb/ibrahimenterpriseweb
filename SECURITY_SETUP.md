# Security Architecture & API Key Protection Guide
## Ibrahim Enterprise Trade Platform

This guide outlines the security hardening implemented for **Firebase** (`ibrahim-enterprise-6c8c8`) and **Cloudinary** (`dun5uome`), ensuring all client-side operations are secure, resilient, and enterprise-grade.

---

### 1. Firebase API Key & Project Hardening

#### Understanding Firebase Web API Keys
In Firebase web apps, `apiKey: "AIzaSyBkLGoNdaqWXpsxVeCMnJCq7Cxrmw16Y2A"` is a **public identifier**, not a private root secret. It identifies your project to Google backend services. Security is enforced through **Google Cloud API Key Restrictions**, **Firebase Authentication**, and **Firestore Security Rules**.

#### Step 1: Restrict HTTP Referrers in Google Cloud Console
To prevent unauthorized domains from consuming your Firebase quota:
1. Navigate to **[Google Cloud API Credentials](https://console.cloud.google.com/apis/credentials?project=ibrahim-enterprise-6c8c8)**.
2. Select your Firebase Web API Key (named `Browser key (auto created by Firebase)` or similar).
3. Under **Set application restrictions**, choose **Websites** (HTTP referrers).
4. Add your authorized domains:
   - `https://www.ibrahimexim.com/*`
   - `https://ibrahimexim.com/*`
   - `https://*.pages.dev/*` *(Cloudflare Pages staging & preview)*
   - `https://*.web.app/*`
   - `https://*.firebaseapp.com/*`
   - `http://localhost:*` *(Local development)*
   - `http://127.0.0.1:*`
5. Under **API restrictions**, select **Restrict key** and allow ONLY:
   - **Identity Toolkit API** *(Firebase Authentication)*
   - **Cloud Firestore API**
   - **Firebase Installations API**
   - **Google Analytics API**
6. Click **Save**.

---

### 2. Firebase Authentication Setup

We have integrated real **Firebase Authentication** into `assets/js/services-config.js` and `assets/js/admin.js`.

#### How to Enable in Firebase Console:
1. Open **[Firebase Console > Authentication](https://console.firebase.google.com/project/ibrahim-enterprise-6c8c8/authentication)**.
2. Click **Get Started** (if not already enabled).
3. Go to the **Sign-in method** tab.
4. Click on **Email/Password** and toggle **Enable**, then click **Save**.
5. Go to the **Users** tab and click **Add user**:
   - **Email**: `admin@ibrahimenterprise.com` *(or `ibraexim@gmail.com`)*
   - **Password**: Create a strong password (minimum 8-12 characters).

*(Note: The admin panel also includes a development fallback so you can continue testing offline or before the online user is created).*

---

### 3. Cloud Firestore Security Rules (`firestore.rules`)

We have defined strict rules in [`firestore.rules`](firestore.rules):
- **Public Visitors**: Can **ONLY create** genuine trade quotes. Every submission is strictly validated:
  - Must include `fullName`, `email`, `phone`, `product`.
  - Email format and length bounds are enforced.
  - Consent must be explicitly `true`.
- **Read & Delete Protection**: Public users **CANNOT read, list, update, or delete** any customer inquiries. Only authenticated trade desk staff (`admin@ibrahimenterprise.com`, `ibraexim@gmail.com`) can access leads.
- **Default Deny**: All other database collections are completely inaccessible.

**To apply in Firebase Console**:
1. Open **[Firebase Console > Firestore Rules](https://console.firebase.google.com/project/ibrahim-enterprise-6c8c8/firestore/rules)**.
2. Copy the contents of [`firestore.rules`](firestore.rules).
3. Paste into the **Rules** tab and click **Publish**.

---

### 4. Cloudinary Media CDN & Unsigned Preset Security

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
  - Strict MIME type verification (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`, `image/avif`).
  - Strict file size cap (maximum 12 MB).

---

### 5. Security Audit Checklist

| Item | Status | Action Required |
| :--- | :---: | :--- |
| **API Secret Exposure** | Passed | No private backend API secrets or service accounts exposed in frontend. |
| **Cloudinary Signing** | Passed | Uses unsigned upload preset with MIME type & 12 MB size check. |
| **Firestore Write Schema** | Passed | Strict validation on inquiry fields, lengths, and consent in `firestore.rules`. |
| **Firestore Read Protection** | Hardened | Restricts read/delete to authenticated admin emails. |
| **Firebase Auth Integration** | Implemented | Real `firebase/auth` integrated in `services-config.js` and `admin.js`. |
| **Google Cloud HTTP Referrers** | Pending User Console Action | Follow Step 1 above to restrict allowed domains in Google Cloud Console. |
| **Email/Password Provider** | Pending User Console Action | Follow Step 2 above to enable Email/Password in Firebase Authentication. |

---
&copy; 2026 Ibrahim Enterprise. All rights reserved.
