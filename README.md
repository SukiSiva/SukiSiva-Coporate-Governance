# GOVERNORA — Corporate Governance & Compliance Advisory Website Template

A premium, modern, enterprise-grade corporate governance, risk management, regulatory compliance, and board advisory website template. Designed for top-tier consulting firms, international legal advisors, and commercial marketplace distribution (ThemeForest, TemplateMonster).

---

## 1. TECHNOLOGIES USED

* **HTML5** — Semantic, clean, accessible markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **CSS3** — Custom design tokens, dark/light theme overrides, CSS logical properties for complete RTL support.
* **Bootstrap 5 (v5.3.3)** — Responsive grid architecture, dropdown navigation, accordions, and utilities.
* **Tailwind CSS (CDN)** — Utility-first styling with disabled preflight to prevent Bootstrap class conflicts.
* **Vanilla JavaScript (ES6+)** — Interactive widgets, theme switching, direction toggle, client-side search, filtering, and form validations. No jQuery, React, or framework runtimes required.

---

## 2. PROJECT FOLDER STRUCTURE

```
governora/
├── index.html                 # Home 1 — General Corporate Services Landing
├── home-2.html                # Home 2 — Regulatory Compliance & Risk Advisory
├── about.html                 # About Us, Leadership & Certifications
├── services.html              # Complete Advisory Practice Directory (8 Practices)
├── service-details.html       # Detailed Service Template with Methodology & FAQs
├── case-studies.html          # Filterable Case Study Scenarios Grid
├── case-study-details.html    # In-Depth Case Study Analysis
├── blog.html                  # Policy Briefings & Live Search / Category Filter
├── blog-details.html          # Structured Article Layout with TOC & Sidebar
├── pricing.html               # 3 Advisory Packages & Full Comparison Table
├── contact.html               # Consultation Form & Headquarters Map Section
├── 404.html                   # Premium Branded 404 Error Page
├── coming-soon.html           # Maintenance / Client Portal Countdown
├── assets/
│   ├── css/
│   │   ├── styles.css         # Main stylesheet (Design tokens, components, Dark Mode)
│   │   └── responsive.css     # Mobile-first adaptive breakpoints & print styles
│   ├── js/
│   │   ├── main.js            # Sticky nav, back-to-top, cookie consent, countdown timer
│   │   ├── theme.js           # Light/Dark mode switcher & RTL direction manager
│   │   ├── filters.js         # Case study & Insights category filtering and live search
│   │   └── form-validation.js # Vanilla JS consultation & newsletter validation
│   └── images/                # Local SVG vector illustrations & photographic frames
├── README.md                  # Complete documentation and customization guide
└── LICENSE.txt                # Commercial & template redistribution license
```

---

## 3. KEY FEATURES & FUNCTIONALITY

1. **Dual Landing Pages**:
   * **Home 1**: Strategic overview of board advisory, fiduciary governance, enterprise risk, and why global boards partner with Governora.
   * **Home 2**: Niche-specific layout targeting C-level compliance officers, SOX 404 audit readiness, AML remediation, and sector-specific compliance matrices.
2. **Light & Dark Mode**:
   * One-click theme switcher in topbar.
   * Smooth CSS custom property transitions.
   * Persistent choice saved via `localStorage`.
   * Automatically detects system `prefers-color-scheme` on first visit.
3. **Right-to-Left (RTL) Layout Support**:
   * Fully compatible with Arabic and Hebrew reading directions.
   * Built with modern logical CSS properties (`margin-inline-start`, `inset-inline-end`, etc.).
   * Interactive live RTL / LTR toggle button in topbar.
4. **Interactive Vanilla JavaScript**:
   * **Filters**: Instant client-side filtering on Case Studies by sector (Financial Services, Healthcare, Enterprise Tech, Energy/Industrial).
   * **Live Search**: Instant keyword filtering and category selection on the Blog / Insights page with dynamic empty state.
   * **Form Validation**: Clean validation for all required fields on the Consultation form and newsletter subscription boxes with feedback banners.
   * **Cookie Consent**: Floating confidentiality & cookie banner with user acceptance persisted in `localStorage`.
   * **Countdown Timer**: Configurable JavaScript countdown on the `coming-soon.html` portal page.
   * **Smooth Back-to-Top**: Scroll-triggered floating button.

---

## 4. HOW TO RUN & TEST LOCALLY

Because Governora is a pure static frontend template, you do not need Node.js, PHP, Python, or a local server to test it:

1. Double click any `.html` file (e.g., `index.html`) in your file explorer to open it in Google Chrome, Edge, Firefox, or Safari.
2. Alternatively, run any simple local HTTP server:
   ```bash
   # Using Python:
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your web browser.

---

## 5. CUSTOMIZATION GUIDE

### Brand Colors & Typography
Open `assets/css/styles.css` to customize the primary CSS variables:
* Primary Navy: `--gov-primary: #101D32;`
* Accent Gold: `--gov-accent: #C6A66B;`
* Dark Surface: `--gov-secondary: #0A1220;`
* Headings Font: `--gov-font-heading: 'Cinzel', Georgia, serif;`
* Body Font: `--gov-font-body: 'Plus Jakarta Sans', sans-serif;`

### Connecting the Consultation Form
The consultation form in `contact.html` is fully validated via frontend JavaScript (`assets/js/form-validation.js`). To connect to a live email service or backend endpoint:
1. Set the form's `action` attribute:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
2. Or connect your own REST API endpoint within the submit handler in `assets/js/form-validation.js`.

---

## 6. ASSET CREDITS & LICENSING

* Icons: [Bootstrap Icons](https://icons.getbootstrap.com/) (MIT License).
* Fonts: [Google Fonts](https://fonts.google.com/) — *Cinzel* & *Plus Jakarta Sans* (SIL Open Font License).
* Vector Assets: Proprietary SVG illustrations created specifically for Governora.

&copy; 2026 Governora Advisory Partners LLP. All rights reserved.