import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function OrderHistory() {
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const [orders, setOrders] = useState(
    () => JSON.parse(localStorage.getItem('orderHistory')) || []
  );
  const [expandedOrder, setExpandedOrder] = useState(null);

  const clearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all order history?')) {
      localStorage.removeItem('orderHistory');
      setOrders([]);
      addToast('Order history cleared.', 'info');
    }
  };

  const paymentIcon = { COD: '💵', UPI: '📱' };

  return (
    <div style={{ marginTop: '80px', padding: '20px 5%', paddingBottom: '60px', minHeight: '70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid var(--border, #ddd)', paddingBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--text, #130f40)' }}>📦 My Orders</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {orders.length > 0 && (
            <button onClick={clearAllOrders} style={{ background: '#cc0000', color: '#fff', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', border: 'none', fontSize: '14px' }}>
              🗑 Clear All
            </button>
          )}
          <Link to="/products" style={{ background: 'green', color: '#fff', padding: '8px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }}>
            🛒 Shop More
          </Link>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>📭</div>
          <h2 style={{ color: 'var(--text, #130f40)', fontSize: '24px', marginBottom: '10px' }}>No Orders Yet</h2>
          <p style={{ color: 'var(--text-muted, #888)', fontSize: '16px', marginBottom: '25px' }}>You haven't placed any orders yet. Start shopping!</p>
          <Link to="/products" className="btn" style={{ display: 'inline-block' }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <p style={{ color: 'var(--text-muted, #888)', marginBottom: '20px', fontSize: '14px' }}>
            {orders.length} order{orders.length > 1 ? 's' : ''} found
            {currentUser && ` · Logged in as ${currentUser.name}`}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order, index) => (
              <div key={order.id || index} style={{ background: 'var(--surface, #fff)', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid var(--border, #eee)' }}>
                {/* Order Header */}
                <div
                  style={{ padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: expandedOrder === index ? `1px solid var(--border, #eee)` : 'none', flexWrap: 'wrap', gap: '10px' }}
                  onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                >
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted, #aaa)', marginBottom: '4px' }}>Order #{order.id || `ORD-${index + 1}`}</p>
                    <p style={{ fontSize: '16px', color: 'var(--text, #130f40)', fontWeight: 'bold', marginBottom: '4px' }}>
                      {order.cartItems?.length} item{order.cartItems?.length > 1 ? 's' : ''}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted, #888)' }}>🕐 {order.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'green' }}>Rs {order.total?.toLocaleString() || 'N/A'}/-</p>
                    <span style={{ background: '#e8f5e9', color: 'green', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                      ✅ Placed
                    </span>
                    <p style={{ fontSize: '13px', marginTop: '5px', color: 'var(--text-muted, #888)' }}>{paymentIcon[order.paymentMethod] || '💳'} {order.paymentMethod}</p>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === index && (
                  <div style={{ padding: '20px 25px' }}>
                    {/* Items */}
                    <h4 style={{ fontSize: '15px', color: 'var(--text, #130f40)', marginBottom: '12px' }}>📦 Items Ordered</h4>
                    <div style={{ marginBottom: '20px' }}>
                      {order.cartItems?.map((item) => (
                        <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px dashed var(--border, #eee)' }}>
                          <img src={item.image} alt={item.name} loading="lazy" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '6px', background: 'var(--bg, #f5f5f5)' }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', color: 'var(--text, #333)', marginBottom: '3px', textTransform: 'none' }}>{item.name}</p>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted, #888)' }}>Qty: {item.quantity} × Rs {item.price?.toLocaleString()}</p>
                          </div>
                          <p style={{ fontSize: '15px', fontWeight: 'bold', color: 'green' }}>
                            Rs {(item.price * item.quantity).toLocaleString()}/-
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <h4 style={{ fontSize: '15px', color: 'var(--text, #130f40)', marginBottom: '10px' }}>📍 Delivery Details</h4>
                    <div style={{ background: 'var(--bg, #f9f9f9)', padding: '15px', borderRadius: '8px', fontSize: '14px', color: 'var(--text-muted, #555)', lineHeight: '1.8', textTransform: 'none' }}>
                      <p><strong>Name:</strong> {order.name}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Phone:</strong> {order.phone}</p>
                      <p><strong>Address:</strong> {order.address}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
