# KLOT — E-Commerce Website

## Deployment Instructions

1. Upload the entire folder to your web host (Netlify, Vercel, cPanel, etc.)
2. The entry point is `index.html`
3. Keep the folder structure intact:

```
klot/
├── index.html          ← Main entry point
├── css/
│   └── style.css       ← All styles
├── js/
│   └── app.js          ← All functionality
├── assets/             ← Add product images here
└── README.md
```

## Admin Access
- URL: Click the "Admin" button (bottom-right corner)
- Username: admin
- Password: Klot@2025

## Features
- Storefront: Home, Shop, Collections, About, Contact
- Dual currency toggle (₦ NGN / $ USD)
- Shopping cart with size selection
- Admin dashboard with:
  - Overview stats (live from data)
  - Orders: search, filter, edit status, Export/Import Excel+CSV
  - Inventory: per-size breakdown, adjust stock, Export/Import Excel+CSV
  - Products: full CRUD, sort, filter, paginate, bulk ops, Export/Import Excel+CSV
  - Import Engine: drag-drop, column mapping, validation, progress bar
