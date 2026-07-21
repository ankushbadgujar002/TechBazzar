import React from 'react';

export default function SkeletonCard() {
  return (
    <article className="card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-subtitle"></div>
      <div className="cart" style={{ justifyContent: 'space-between', gap: '10px' }}>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-btn"></div>
      </div>
    </article>
  );
}
