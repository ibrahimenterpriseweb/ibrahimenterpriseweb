# Ibrahim Enterprise — International Food Commodity Trading Web Platform

Official B2B digital platform for **Ibrahim Enterprise**, an international food commodity import and export trading house headquartered in Chennai, Tamil Nadu, India.

---

## 1. Business Profile & Identity

- **Registered Business Name**: Ibrahim Enterprise
- **Business Focus**: International food commodity import & export, agricultural supply chains, and B2B trade execution.
- **Key Sourcing & Import**: Pure Hing / Asafoetida directly imported from Afghanistan harvest hubs (approx. 20 Metric Tons/month capacity).
- **Core Export Portfolio**:
  - **Spices**: Pure Afghanistan Hing, Bold Tellicherry Black Pepper, Whole Green Cardamom
  - **Rice & Food Products**: Traditional & 1121 Basmati Rice, Desiccated Coconut Powder (Fine & Medium), Dehydrated White & Red Onion Powder and Flakes
  - **Fresh Agricultural Produce**: Farm-fresh export vegetables (onions, shallots, green chillies, okra)
  - **Marine Seafood**: Export-grade coastal marine seafood
- **Target Export Markets**: Sri Lanka, Malaysia, Singapore, China, Thailand, Middle East, United States, United Kingdom, and Europe.
- **Logistics Roadmap**: Planned dedicated bonded warehouse facility in Dubai for strategic regional buffer stocks and expedited turnaround.

### Official Contact Information
- **Corporate Address**: 16/7, F1 Azeez Mulk 7th Street, Thousand Lights, Chennai - 600 006, Tamil Nadu, India.
- **Telephone**: `(0091) 80561 03146` (`tel:+918056103146`)
- **Direct WhatsApp Desk**: `+91 80561 03146` (`https://wa.me/918056103146`)
- **Official Email**: `ibraexim@gmail.com`

---

## 2. Platform Architecture & Tech Stack

This project is built as a high-performance, ultra-low-latency static web application optimized for international enterprise buyers:
- **Core Framework**: Semantic HTML5, Vanilla JavaScript (ES6+ modular controllers), Vanilla CSS Design System (`assets/css/style.css`).
- **Styling & Responsive Engine**: Tailwind CSS via CDN with customized corporate brand design tokens (`#0fa14a` leaf green, `#095226` forest green, `#231f20` charcoal).
- **Interactive SVG Visualizations**: Interactive global destination trade map (`assets/js/markets-map.js`) rendering shipping corridors from Chennai to all 9 target markets.
- **Trade Assistant Chatbot**: Interactive client-side B2B assistant with approved trade FAQ answers and instant WhatsApp / Quote form escalation.
- **Admin Management Portal (`admin.html`)**: Complete authenticated trade operations portal for product catalog updates, market insights, and lead management with persistent browser storage and full JSON export/import.

---

## 3. Local Development

### Prerequisites
- Python 3.8+ (for local HTTP preview server) or Node.js 18+

### Running the Application
```bash
# Clone or navigate into the project root
cd /path/to/ibrahimenterpriseweb

# Start local server via npm
npm run dev

# Or directly via Python
python3 -m http.server 8080
```
Open your browser at `http://localhost:8080`.

---

## 4. Admin Management Portal (`admin.html`)

The website includes an administrative dashboard enabling non-technical operators to manage product listings, trade leads, and corporate content without modifying source code.

- **URL**: `http://localhost:8080/admin.html`
- **Access**: Secured via Google Firebase Authentication. Login using the registered admin account created in the Firebase Console (Authentication > Users).
- **Capabilities**:
  1. **Trade Inquiries CRM**: View, filter, review notes, and download buyer trade leads as `.csv` or `.json`.
  2. **Product Catalog Manager**: Add, edit, toggle visibility, and update descriptions, images, or origins. Changes immediately reflect across public product pages.
  3. **Trade Insights Manager**: Publish market intelligence articles and supply chain reports.
  4. **Data Backup & Restore**: One-click download of full system data backups and restore capabilities.

---

## 5. Deployment Guide (Cloudflare Pages / Workers)

The project includes `wrangler.toml` pre-configured for Cloudflare Static Asset hosting:

```toml
name = "ibrahimenterpriseweb"
compatibility_date = "2026-10-14"

[assets]
directory = "."
```

### Deploying to Cloudflare
```bash
# Login to Cloudflare account
npx wrangler login

# Deploy static assets directly
npx wrangler pages deploy . --project-name=ibrahimenterprise
```

### Custom Domain & HTTPS
1. In Cloudflare Dashboard, navigate to **Pages** > **ibrahimenterprise** > **Custom Domains**.
2. Add the client's confirmed production domain (e.g. `ibrahimenterprise.com` or `www.ibrahimexim.com`).
3. Cloudflare will automatically provision Universal SSL/TLS (HTTPS) certificates.
4. Verify root to `www` redirection.

---

## 6. Pending Client Inputs & External Account Setup

The following items require client confirmation or external third-party accounts:
1. **Domain Purchase & Ownership**: Confirmation of registered domain name (`.com` or `.in`) and DNS management access.
2. **Google Analytics 4 / Google Tag Manager**: Provide Measurement ID (e.g., `G-XXXXXXXXXX`) to track buyer traffic and geography.
3. **Heatmap & Session Analysis**: Provide Microsoft Clarity or Hotjar tracking script ID to visualize user attention on commodity cards.
4. **Third-Party Email SMTP / Webhook**: If automated server-side email dispatch of trade inquiries is required (e.g. via Resend, SendGrid, or Cloudflare Worker API), provide API credentials.
