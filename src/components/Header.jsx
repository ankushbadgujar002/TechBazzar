import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useSectionLink } from '../hooks/useSectionLink';
import { useProtectedProductsLink } from '../hooks/useProtectedProductsLink';

export default function Header() {
  const { isLoggedIn, currentUser, login, logout, sessionExpired, consumeSessionExpired } = useAuth();
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, cartItemCount, cartTotal } = useCart();
  const { wishlist } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const handleHashLink = useSectionLink();
  const handleProductsClick = useProtectedProductsLink();

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Show session expiry toast
  useEffect(() => {
    if (sessionExpired) {
      addToast('Your session expired. Please log in again.', 'warning', 5000);
      consumeSessionExpired();
    }
  }, [sessionExpired]);

  // Close panels on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSearchOpen(false);
      setCartOpen(false);
      setLoginOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close panels on route change
  useEffect(() => {
    setSearchOpen(false);
    setCartOpen(false);
    setLoginOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const closeAll = () => {
    setSearchOpen(false);
    setCartOpen(false);
    setLoginOpen(false);
    setMenuOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!email) { setEmailError('Email is required.'); valid = false; }
    else setEmailError('');
    if (!password) { setPasswordError('Password is required.'); valid = false; }
    else setPasswordError('');
    if (!valid) return;

    const result = login(email, password);
    if (result.success) {
      addToast(result.message, 'success');
      setEmail('');
      setPassword('');
      setLoginOpen(false);
      navigate('/products');
    } else {
      addToast(result.message, 'error');
      setPasswordError(result.message);
    }
  };

  const handleLogout = () => {
    const result = logout();
    addToast(result.message, 'info');
    setLoginOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      addToast('Please log in to search products!', 'warning');
      return;
    }
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const initial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : '';

  const scrollToSection = (targetId) => (e) => {
    closeAll();
    handleHashLink(targetId)(e);
  };

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeAll}>
        <img src="/images/favicon.png" alt="TechBazzar Logo" style={{ height: '32px', width: '32px', objectFit: 'contain' }} loading="lazy" />
        TechBazzar
      </Link>

      {/* Navigation */}
      <nav className="navbar" style={{ right: menuOpen ? '2%' : '-110%', transition: 'all .4s linear' }}>
        <Link to="/" onClick={closeAll}>home</Link>
        <a href="#features" onClick={scrollToSection('features')}>features</a>
        <Link to="/products" onClick={handleProductsClick}>products</Link>
        <a href="#categories" onClick={scrollToSection('categories')}>categories</a>
        <Link to="/about" onClick={closeAll}>about us</Link>
        {isLoggedIn && <Link to="/orders" onClick={closeAll}>my orders</Link>}
        <a href="#contact" onClick={scrollToSection('contact')}>contact us</a>
      </nav>

      {/* Icon Buttons */}
      <div className="icons">
        <i className="fa fa-bars" id="menu-btn" onClick={() => { closeAll(); setMenuOpen(true); }} title="Menu"></i>
        <i className="fa fa-search" id="search-btn" onClick={() => { closeAll(); setSearchOpen(true); }} title="Search"></i>

        {/* Cart Button with badge */}
        <div className="icon-btn-wrapper" style={{ position: 'relative' }}>
          <i
            className="fa fa-shopping-cart"
            id="cart-btn"
            onClick={() => { closeAll(); setCartOpen((v) => !v); }}
            title="Cart"
          ></i>
          {cartItemCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              background: '#cc0000', color: '#fff', borderRadius: '50%',
              width: '18px', height: '18px', fontSize: '10px', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: '1', zIndex: 2, boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>{cartItemCount}</span>
          )}
        </div>

        {/* Wishlist Button with badge */}
        {isLoggedIn && (
          <div className="icon-btn-wrapper" style={{ position: 'relative' }}>
            <Link to="/products" title="Wishlist" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }} onClick={closeAll}>
              <i className="fa fa-heart" style={{ color: wishlist.length > 0 ? 'red' : undefined }}></i>
            </Link>
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                background: '#cc0000', color: '#fff', borderRadius: '50%',
                width: '18px', height: '18px', fontSize: '10px', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: '1', zIndex: 2, boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>{wishlist.length}</span>
            )}
          </div>
        )}

        {/* Dark Mode Toggle */}
        <i
          className={isDarkMode ? 'fa fa-sun' : 'fa fa-moon'}
          id="theme-btn"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ fontSize: '18px' }}
        ></i>

        {/* User / Login Button */}
        {isLoggedIn && currentUser ? (
          <span
            id="user-initial"
            className="user-initial"
            onClick={() => { closeAll(); setLoginOpen((v) => !v); }}
            style={{ cursor: 'pointer' }}
            title="Account Info"
          >
            {initial}
          </span>
        ) : (
          <i
            className="fa fa-user"
            id="login-btn"
            onClick={() => { closeAll(); setLoginOpen((v) => !v); }}
            title="Account"
          ></i>
        )}
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="search-form"
        style={{ right: searchOpen ? '2%' : '-110%', transition: 'all .4s linear' }}
      >
        <input
          type="search"
          placeholder="Search products here...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="search-box"
        />
        <button type="submit" style={{ background: 'none', cursor: 'pointer', border: 'none' }}>
          <label className="fa fa-search search-Icon" style={{ cursor: 'pointer' }}></label>
        </button>
      </form>

      {/* Shopping Cart Dropdown */}
      <div
        className="shopping-cart"
        style={{ right: cartOpen ? '2%' : '-110%', transition: 'all .4s linear' }}
      >
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 15px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛒</div>
            <p style={{ color: '#888', fontSize: '15px' }}>Your cart is empty!</p>
            <Link to="/products" className="btn" onClick={closeAll} style={{ marginTop: '15px', display: 'inline-block' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div className="box" key={item.name} style={{ position: 'relative', paddingBottom: '5px' }}>
                <i
                  className="fa-solid fa-trash-can remove-item"
                  onClick={() => { removeFromCart(item.name); addToast(`${item.name} removed from cart`, 'info'); }}
                  style={{ cursor: 'pointer' }}
                ></i>
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="content">
                  <h3>{item.name}</h3>
                  <span className="price">Rs {(item.price * item.quantity).toLocaleString()}/-</span>
                  {/* Inline quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                    <button
                      onClick={() => decrementQuantity(item.name)}
                      style={{ width: '24px', height: '24px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.name)}
                      style={{ width: '24px', height: '24px', background: 'green', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="total">Total: Rs {cartTotal.toLocaleString()}/-</div>
            <Link
              to="/checkout"
              className="btn"
              onClick={closeAll}
              style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}
            >
              Checkout ({cartItemCount} items)
            </Link>
          </>
        )}
      </div>

      {/* Login / Account Dropdown */}
      <div
        className="login-form"
        style={{ right: loginOpen ? '2%' : '-110%', transition: 'all .4s linear' }}
      >
        {isLoggedIn && currentUser ? (
          <>
            <h3 style={{ marginBottom: '15px' }}>my account</h3>
            <div style={{ fontSize: '14px', color: '#888', lineHeight: '1.8', textTransform: 'none' }}>
              <p><strong style={{ color: '#130f40' }}>👤 Name:</strong> {currentUser.name}</p>
              <p><strong style={{ color: '#130f40' }}>📧 Email:</strong> {currentUser.email}</p>
              <p><strong style={{ color: '#130f40' }}>📱 Phone:</strong> {currentUser.phone}</p>
              <p><strong style={{ color: '#130f40' }}>🛒 Cart Items:</strong> {cartItemCount}</p>
              <p><strong style={{ color: '#130f40' }}>❤️ Wishlist:</strong> {wishlist.length}</p>
            </div>
            <Link to="/orders" className="btn" onClick={closeAll} style={{ display: 'block', textAlign: 'center', margin: '15px 0 10px' }}>
              📦 My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="btn"
              style={{ width: '100%', cursor: 'pointer', background: '#cc0000', marginTop: '5px' }}
            >
              🚪 Log Out
            </button>
          </>
        ) : (
          <>
            <h3>login now</h3>
            <form onSubmit={handleLoginSubmit} noValidate>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="email"
                  className={`box ${emailError ? 'input-error' : ''}`}
                  placeholder="your email...."
                  value={email}
                  onChange={(e) => { setEmail(e.target.value.toLowerCase()); setEmailError(''); }}
                  required
                />
                {emailError && <span className="field-error">{emailError}</span>}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="password"
                  className={`box ${passwordError ? 'input-error' : ''}`}
                  placeholder="your password...."
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                  required
                />
                {passwordError && <span className="field-error">{passwordError}</span>}
              </div>
              <p style={{ marginBottom: '8px' }}>
                don't have an account <Link to="/register" onClick={closeAll}>create now</Link>
              </p>
              <input type="submit" value="Login Now" className="btn loginBtn" style={{ cursor: 'pointer' }} />
            </form>
          </>
        )}
      </div>
    </header>
  );
}
