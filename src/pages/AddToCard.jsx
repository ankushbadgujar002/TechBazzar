import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import '../css/AddToCard.css';

export default function AddToCard() {
  const { currentUser } = useAuth();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlName = searchParams.get('name') || '';
  const urlPrice = parseFloat(searchParams.get('price')) || 0;
  const urlImage = searchParams.get('image') || '';
  const urlDescription = searchParams.get('description') || 'No description available.';

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inline billing errors
  const [billingErrors, setBillingErrors] = useState({});

  // Billing form pre-filled from currentUser (bug fix: was using non-existent 'userDetails' key)
  const [billing, setBilling] = useState({
    name: '', email: '', phone: '', address: ''
  });

  useEffect(() => {
    if (currentUser) {
      setBilling({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: ''
      });
    }
  }, [currentUser]);

  const cartItem = cart.find((item) => item.name === urlName);

  useEffect(() => {
    setQuantity(cartItem ? cartItem.quantity : 1);
  }, [cartItem, urlName]);

  const handleQuantityChange = (e) => {
    const qty = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(qty);
    if (cartItem) updateQuantity(urlName, qty);
  };

  const handleAddOrBuy = () => {
    if (!urlName) return;
    if (cartItem) {
      updateQuantity(urlName, quantity);
      addToast('Cart updated!', 'success');
    } else {
      addToCart(urlName, urlPrice, urlImage, urlDescription);
      addToast(`${urlName} added to cart! 🛒`, 'cart');
    }
    document.getElementById('billing-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemove = () => {
    removeFromCart(urlName);
    addToast(`${urlName} removed from cart.`, 'info');
    navigate('/products');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
    if (billingErrors[name]) setBillingErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateBilling = () => {
    const errs = {};
    if (!billing.name.trim()) errs.name = 'Full name is required.';
    if (!billing.email.trim()) errs.email = 'Email is required.';
    if (!billing.phone.trim()) errs.phone = 'Phone number is required.';
    if (!billing.address.trim()) errs.address = 'Delivery address is required.';
    return errs;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errs = validateBilling();
    if (Object.keys(errs).length > 0) {
      setBillingErrors(errs);
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    const finalCart = urlName && !cartItem
      ? [...cart, { name: urlName, price: urlPrice, image: urlImage, quantity, description: urlDescription }]
      : cart;

    if (finalCart.length === 0) {
      addToast('Your cart is empty! Please add products before ordering.', 'warning');
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...billing,
      paymentMethod,
      cartItems: finalCart,
      total: finalCart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    };

    // Save to order history array (fix: was overwriting single key)
    const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    history.unshift(order);
    localStorage.setItem('orderHistory', JSON.stringify(history));
    localStorage.setItem('orderDetails', JSON.stringify(order)); // backward compat

    clearCart();
    setIsSubmitting(false);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    addToast('Order placed successfully! 🎉', 'success', 5000);
    navigate('/');
  };

  const totalAmount = urlName
    ? urlPrice * quantity
    : cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const upiURL = `upi://pay?pa=9172479138@ybl&pn=TechBazzar&am=${totalAmount.toFixed(2)}&cu=INR`;
  const upiQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiURL)}`;

  const inputStyle = (field) => ({
    width: '100%', padding: '10px 14px', border: `2px solid ${billingErrors[field] ? '#cc0000' : '#ccc'}`,
    borderRadius: '6px', marginBottom: '4px', fontSize: '15px', outline: 'none',
    transition: 'border-color 0.2s', textTransform: 'none'
  });

  const labelStyle = { display: 'block', fontSize: '14px', color: '#130f40', marginBottom: '4px', fontWeight: '600' };

  return (
    <div style={{ marginTop: '80px', padding: '20px 5%', paddingBottom: '60px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #ddd', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '26px', color: '#130f40' }}>
          {urlName ? 'Product Details' : 'Checkout'}
        </h1>
        <Link to="/products" style={{ fontSize: '15px', color: 'green', fontWeight: 'bold' }}>❮ Back to Products</Link>
      </header>

      {/* Product Details */}
      {urlName && (
        <section style={{ display: 'flex', gap: '30px', marginBottom: '40px', background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', flexWrap: 'wrap' }}>
          <img src={urlImage} alt={urlName} loading="lazy" style={{ maxWidth: '280px', width: '100%', objectFit: 'contain', borderRadius: '8px' }} />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h2 style={{ fontSize: '22px', color: '#130f40', marginBottom: '10px' }}>{urlName}</h2>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '15px', textTransform: 'none', lineHeight: '1.6' }}>{urlDescription}</p>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green', marginBottom: '20px' }}>
              Rs {(urlPrice * quantity).toLocaleString()}/-
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', color: '#130f40' }}>Qty:</label>
              <input type="number" value={quantity} onChange={handleQuantityChange} min="1"
                style={{ width: '70px', padding: '8px', border: '2px solid #ccc', borderRadius: '6px', fontSize: '16px', textAlign: 'center' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={handleAddOrBuy} className="btn" style={{ cursor: 'pointer' }}>
                {cartItem ? '🛒 Update & Buy Now' : '🛒 Add to Cart'}
              </button>
              {cartItem && (
                <button onClick={handleRemove} className="btn" style={{ background: '#cc0000', cursor: 'pointer' }}>
                  🗑 Remove
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Cart Summary for /checkout route */}
      {!urlName && cart.length > 0 && (
        <section style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', color: '#130f40', marginBottom: '15px' }}>🛒 Your Cart</h2>
          {cart.map((item) => (
            <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #eee', fontSize: '14px' }}>
              <span style={{ color: '#333' }}>{item.name} <strong>× {item.quantity}</strong></span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>Rs {(item.price * item.quantity).toLocaleString()}/-</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0 5px', fontWeight: 'bold', fontSize: '18px', color: '#130f40' }}>
            <span>Total:</span>
            <span style={{ color: 'green' }}>Rs {totalAmount.toLocaleString()}/-</span>
          </div>
        </section>
      )}

      {/* Billing Form */}
      <section style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '22px', color: '#130f40', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
          📋 Billing Details
        </h2>
        <form id="billing-form" onSubmit={handleFormSubmit} noValidate>
          {/* Name */}
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" value={billing.name} onChange={handleInputChange} placeholder="Enter your full name" style={inputStyle('name')} />
            {billingErrors.name && <span className="field-error">⚠ {billingErrors.name}</span>}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Email Address</label>
            <input type="email" name="email" value={billing.email} onChange={handleInputChange} placeholder="Enter your email" style={inputStyle('email')} />
            {billingErrors.email && <span className="field-error">⚠ {billingErrors.email}</span>}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Phone Number</label>
            <input type="tel" name="phone" value={billing.phone} onChange={handleInputChange} placeholder="Enter your phone" style={inputStyle('phone')} />
            {billingErrors.phone && <span className="field-error">⚠ {billingErrors.phone}</span>}
          </div>

          {/* Address */}
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Delivery Address</label>
            <textarea name="address" value={billing.address} onChange={handleInputChange} placeholder="Enter your full delivery address"
              style={{ ...inputStyle('address'), height: '100px', resize: 'vertical' }} />
            {billingErrors.address && <span className="field-error">⚠ {billingErrors.address}</span>}
          </div>

          {/* Payment */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid #ccc', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' }}>
              <option value="COD">💵 Cash On Delivery</option>
              <option value="UPI">📱 UPI Payment</option>
            </select>
          </div>

          {/* UPI QR */}
          {paymentMethod === 'UPI' && totalAmount > 0 && (
            <div style={{ border: '2px dashed green', padding: '20px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', background: '#f9fff9' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#130f40' }}>
                📱 Scan to Pay — Rs {totalAmount.toLocaleString()}/-
              </h3>
              <img src={upiQR} alt="UPI QR Code" style={{ border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', borderRadius: '8px' }} loading="lazy" />
              <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>Pay to: 9172479138@ybl (TechBazzar)</p>
            </div>
          )}

          <button type="submit" className="btn" style={{ cursor: isSubmitting ? 'wait' : 'pointer', width: '100%', fontSize: '17px', padding: '14px' }} disabled={isSubmitting}>
            {isSubmitting ? '⏳ Processing...' : '🛍 Place Order'}
          </button>
        </form>
      </section>

      {/* Order Confirmation Popup */}
      <div id="order-confirmation-popup" className={`popup-container ${showPopup ? 'show' : ''}`}>
        <div className="popup">
          <div className="thank-you-message">Your Order is Successfully Placed! 🎉</div>
          <div className="checkmark animate"><span>&#10003;</span></div>
          <p style={{ fontSize: '14px', color: '#666', margin: '10px 0', textTransform: 'none' }}>
            Order saved to your history. We'll deliver it soon!
          </p>
          <button id="close-popup" className="redirect-button" onClick={handleClosePopup} style={{ cursor: 'pointer' }}>
            OK, Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
