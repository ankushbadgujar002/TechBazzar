import React, { Suspense, lazy } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const RegisterForm = lazy(() => import('./pages/RegisterForm'));
const AddToCard = lazy(() => import('./pages/AddToCard'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Suspense fallback loader
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '100px'
  }}>
    <div className="page-spinner"></div>
    <p style={{ color: '#666', fontSize: '16px' }}>Loading...</p>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <HashRouter>
                <ErrorBoundary>
                  <Header />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/register" element={<RegisterForm />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route
                        path="/products"
                        element={
                          <ProtectedRoute>
                            <Products />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/product-details"
                        element={
                          <ProtectedRoute>
                            <AddToCard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <AddToCard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <ProtectedRoute>
                            <OrderHistory />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <Footer />
                </ErrorBoundary>
              </HashRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
