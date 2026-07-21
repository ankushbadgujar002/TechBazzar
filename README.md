# TechBazzar 🛒

> **A modern, feature-rich e-commerce frontend** built with React 18 + Vite — complete with Dark Mode, Scroll Animations, Cart & Wishlist, UPI Checkout, and Order History.

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter)
![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6?style=flat-square&logo=css3)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat-square&logo=netlify)

</div>

---

## 🌐 Live Demo

### 👉 [https://techbazzar-ankush.netlify.app](https://techbazzar-ankush.netlify.app)

> No backend required — all data is handled client-side using `localStorage`.

---

## 📸 Features

| Feature | Details |
|---|---|
| 🔐 **User Auth** | Register & Login with localStorage-based credential validation |
| 🛒 **Cart System** | Add, remove, update quantity; persistent across sessions |
| ❤️ **Wishlist** | Add/remove products to wishlist, visible badge on header |
| 🌙 **Dark Mode** | Full dark theme toggle persists across all pages and components |
| 🔍 **Search** | Instant product search from any page via the navbar |
| 📦 **Order History** | All placed orders saved and viewable with full delivery details |
| 💳 **UPI Checkout** | Scan-to-pay QR code generated live + COD option |
| 🎬 **Scroll Animations** | Intersection Observer-based reveal animations site-wide |
| ⭐ **User Ratings** | Rate individual products — stored in localStorage |
| 🔔 **Toast Notifications** | Elegant multi-type toast system (success, error, info, cart, heart) |
| 🧩 **Skeleton Loaders** | Product grid skeleton while products load |
| 📱 **Responsive Design** | Mobile-first layout, hamburger menu on small screens |

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI with hooks (`useState`, `useEffect`, `useContext`, `useCallback`) |
| **Vite 5** | Blazing-fast build tool and dev server |
| **React Router 6** | Client-side routing with lazy loading and protected routes |
| **Context API** | Global state for Cart, Wishlist, Auth, Toast, Theme |
| **CSS3 + CSS Variables** | Theming system with full Dark / Light mode switching |
| **FontAwesome 6** | Icon library for UI elements |
| **Google Fonts (Poppins)** | Modern, professional typography |
| **Intersection Observer API** | Scroll-triggered reveal animations |
| **localStorage** | Persistent data (cart, orders, wishlist, auth, ratings) |

---

## 🗂️ Project Structure

```
src/
├── components/        # Shared components (Header, Footer, SkeletonCard, ErrorBoundary)
├── context/           # React Contexts (Auth, Cart, Wishlist, Toast, Theme)
├── css/               # Page-specific CSS stylesheets
├── data/              # Products & Categories data
├── hooks/             # Custom hooks (useScrollReveal, useRecentlyViewed, useSectionLink)
├── pages/             # Page components (Home, Products, AddToCard, AboutUs, Register, OrderHistory)
├── index.css          # Global styles, dark mode variables, animations, toast system
└── App.jsx            # Routing, lazy loading, Suspense wrapper
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (required for Vite 5)
- **npm** (comes with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/ankushbadgujar002/TechBazzar.git
cd TechBazzar
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The app will open at **[http://localhost:5173](http://localhost:5173)**

### 4. Build for Production
```bash
npm run build
```
Output is generated in the `dist/` folder.

---

## 🔐 How Authentication Works

TechBazzar uses **localStorage-based authentication** (frontend-only, for learning purposes):

1. **Register** — Create an account at `/register` with your name, email, and password. Credentials are saved to `localStorage`.
2. **Login** — Open the user icon in the top-right navbar, enter your registered email and password.
3. **Protected Routes** — The `/products` page and wishlist require login. Unauthenticated users are redirected and shown a toast warning.
4. **Logout** — Click your user avatar in the header and use the logout button.

> ⚠️ **Note:** This is client-side auth only. Never use this pattern for storing real credentials in production.

---

## 🛍️ Shopping Workflow

1. Browse products on the **Products** page (search, filter by category, sort by price/name)
2. Click a product → **View product details** → Add to Cart or Wishlist
3. Open the cart from the header icon → Click **Checkout**
4. Fill **Billing Details** → Select payment method (COD or UPI QR)
5. Place order → See **order confirmation popup**
6. View all orders at **My Orders** in the navbar

---

## 📁 Deployment

This project is deployed on **Netlify** with automatic GitHub integration:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

SPA redirects are configured in `public/_redirects` and `netlify.toml` so page refreshes on any route work correctly.

---

## 👤 Author

**Ankush Badgujar**

- 🌐 Live Site: [techbazzar-ankush.netlify.app](https://techbazzar-ankush.netlify.app)
- 💼 GitHub: [@ankushbadgujar002](https://github.com/ankushbadgujar002)
- 📧 Email: info@example.com

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <strong>Ankush Badgujar</strong>
</div>
