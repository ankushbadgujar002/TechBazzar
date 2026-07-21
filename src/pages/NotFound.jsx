import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px',
      marginTop: '90px'
    }}>
      <div style={{ fontSize: '100px', marginBottom: '10px', animation: 'bounce 1s infinite alternate' }}>🛸</div>
      <h1 style={{ fontSize: '80px', color: '#130f40', fontWeight: '900', margin: '0' }}>404</h1>
      <h2 style={{ fontSize: '28px', color: '#666', marginBottom: '15px', marginTop: '10px' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '16px', color: '#888', maxWidth: '450px', lineHeight: '1.6', marginBottom: '35px', textTransform: 'none' }}>
        Oops! The page you're looking for seems to have gone on a tech adventure and can't be found.
      </p>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn" style={{ display: 'inline-block' }}>
          🏠 Go Home
        </Link>
        <Link to="/products" className="btn" style={{ display: 'inline-block', background: '#130f40' }}>
          🛒 Browse Products
        </Link>
      </div>

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0px); }
          to { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
