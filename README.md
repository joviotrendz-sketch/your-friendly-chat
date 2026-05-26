# 🏆 JovioTrendz - Luxury E-Commerce Platform

## ✨ Overview

A complete luxury e-commerce platform combining:
- 🎨 **Cinematic Dark Landing Page** with scroll animations
- 🛍️ **Full-Featured Store** with product showcase & shopping cart
- 👑 **Elite Club** membership program
- 📱 **Fully Responsive** across all devices

**Built with Loveable Stack:**
- React 19 + TypeScript
- TanStack Start + Router
- Tailwind CSS + Framer Motion
- Supabase (Auth & Database)
- Radix UI Components

---

## 🎯 Features

### Landing Page
✅ Dark cinematic hero section
✅ Cormorant Garamond serif typography
✅ Scroll-reveal animations
✅ Limited edition showcase (3 items)
✅ Trust metrics strip
✅ Elite Club callout
✅ Professional footer

### Store Page
✅ Product grid (6+ items)
✅ Category filtering
✅ Sort by price/popularity
✅ Shopping cart system
✅ Product ratings & reviews
✅ Rarity badges
✅ Stock indicators
✅ Add to cart functionality

### Product Catalog
- Watches (Obsidian Crown, Golden Sentinel)
- Jewelry (Celestial Pendant, Platinum Ring)
- Fragrances (Midnight Essence)
- Accessories (Luxury Silk Scarf)

### Additional Features
✅ Shipping zones (Domestic/International)
✅ Payment methods (Shopify Payments, UPI, COD, Credit Card)
✅ Member statistics dashboard
✅ Contact information
✅ Social media links

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:5173

### Routes
- `/` - Landing page
- `/store` - Full store page

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx
│   ├── StorePage.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── LimitedEditionShowcase.tsx
│       ├── TrustStrip.tsx
│       └── EliteClubFooter.tsx
├── data/
│   └── store.ts (Mock product data)
├── routes/
│   ├── __root.tsx
│   ├── index.tsx (Landing page route)
│   └── store.tsx (Store page route)
└── integrations/
    ├── supabase/
    │   ├── client.ts
    │   ├── client.server.ts
    │   ├── auth-middleware.ts
    │   └── types.ts
    └── lovable/
        └── index.ts
```

---

## 🎨 Design System

### Colors
- **Primary**: Slate (#0f172a, #1e293b)
- **Accent**: Amber (#d97706, #b45309, #f59e0b)
- **Text**: White, Slate-400

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)

### Animations
- Scroll-reveal stagger effects
- Hover elevation (hover:y-[-10px])
- Continuous scroll indicator animation
- Page transitions

---

## 💳 E-Commerce Setup

### Products
- 6+ luxury items in inventory
- Rarity classifications (Ultra Rare, Rare, Limited)
- Ratings & reviews system
- Stock tracking

### Shipping
- **Domestic**: 3-5 days, $50
- **International**: 7-14 days, $200

### Payment Methods
1. Shopify Payments (Active)
2. UPI (Active)
3. Cash on Delivery (Active)
4. Credit Card (Active)

### Cart System
- Real-time cart updates
- Quantity management
- Total calculation
- Persistent cart state

---

## 🔐 Authentication

**Supabase Integration:**
- OAuth (Google, Apple, Microsoft, Lovable)
- Email/Password authentication
- User sessions management
- Protected routes with auth middleware

---

## 🌐 Deployment

### Loveable
1. GitHub already connected
2. Auto-deploy enabled
3. Public link available

### Manual Deployment
```bash
# Build
npm run build

# Deploy to Vercel/Netlify
vercel deploy
# or
netlify deploy
```

---

## 📊 Mock Data

All product data is in `src/data/store.ts`:
- Categories: watches, jewelry, accessories, fragrances
- 6+ products with full details
- Pricing, stock, ratings
- Easy to replace with real API

---

## 🔌 API Integration Ready

To connect to real Shopify/backend:
1. Replace mock data in `src/data/store.ts`
2. Add API calls in store component
3. Connect Supabase auth
4. Update payment processing

---

## 📱 Responsive Design

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- All components fully responsive

---

## 🎓 Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript |
| Routing | TanStack Router |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Components | Radix UI |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Build | Vite |
| Hosting | Cloudflare/Loveable |

---

## 🚀 Next Steps

1. **Connect Supabase Database**
   - Add product schema
   - Set up auth

2. **Integrate Payments**
   - Shopify/Stripe API
   - Payment processing

3. **Add Real Data**
   - Import products from CMS
   - Connect inventory

4. **Deploy**
   - Publish on Loveable
   - Setup custom domain

---

**Built with ❤️ for luxury enthusiasts**
