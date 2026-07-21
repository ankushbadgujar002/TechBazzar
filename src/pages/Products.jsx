import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import SkeletonCard from '../components/SkeletonCard';
import { PRODUCTS_DATA, CATEGORIES } from '../data/products';
import '../css/ProductsStyle.css';

const REVIEWS_DATA = [
  { name: "John Doe", text: "Amazing products! The quality is top-notch and delivery was fast.", stars: 5, img: "images/dummy1.jpg" },
  { name: "Jane Smith", text: "TechBazzar has the best collection of gadgets. Highly recommended!", stars: 5, img: "images/dummy2.jpg" },
  { name: "Michael Lee", text: "Great customer service and the products are worth the price!", stars: 5, img: "images/dummy3.jpg" },
  { name: "Emily Davis", text: "Fast shipping and great deals. Will shop again!", stars: 4, img: "images/dummy4.jpg" },
  { name: "Chris Brown", text: "Superb collection of electronics. I found everything I needed!", stars: 5, img: "images/dummy5.jpg" },
  { name: "Sarah Wilson", text: "Affordable prices and excellent customer service.", stars: 4, img: "images/dummy6.jpg" }
];

const StarRating = ({ rating, onRate, interactive = false }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '2px', cursor: interactive ? 'pointer' : 'default' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ fontSize: interactive ? '20px' : '14px', color: star <= (hovered || rating) ? '#ffb300' : '#ccc', transition: 'color 0.15s' }}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate && onRate(star)}
        >★</span>
      ))}
    </div>
  );
};

export default function Products() {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [userRatings, setUserRatings] = useState(() =>
    JSON.parse(localStorage.getItem('productRatings')) || {}
  );

  // Simulate async product load with skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) setSearchTerm(query);
    
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Auto-advance review carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleRateProduct = (productId, rating) => {
    const updated = { ...userRatings, [productId]: rating };
    setUserRatings(updated);
    localStorage.setItem('productRatings', JSON.stringify(updated));
    addToast(`You rated this product ${rating} star${rating > 1 ? 's' : ''}!`, 'success', 2000);
  };

  const filteredAndSorted = useMemo(() => {
    let result = PRODUCTS_DATA;
    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    // Search filter
    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sort
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleCardClick = (product) => {
    addToRecentlyViewed(product);
    navigate(`/product-details?name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.description)}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product.name, product.price, product.image, product.description);
    addToast(`${product.name} added to cart! 🛒`, 'cart');
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    addToast(
      added ? `❤️ Added to Wishlist!` : `💔 Removed from Wishlist`,
      added ? 'heart' : 'info'
    );
  };

  return (
    <>
      <section className="products" id="products" style={{ marginTop: '80px', paddingBottom: '20px' }}>
        <h1 className="content-heading" style={{ marginTop: '0' }}>our <span>products</span></h1>

        {/* Search + Sort + Category in single compact toolbar */}
        <div style={{ width: '100%', maxWidth: '1140px', background: '#fff', borderRadius: '14px', padding: '16px 20px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Row 1: Search + Sort */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 220px' }}>
              <i className="fa fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '14px' }}></i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 36px', border: '2px solid #eee', borderRadius: '8px', fontSize: '14px', textTransform: 'none', outline: 'none', background: '#f8f8f8', color: '#130f40' }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '10px 14px', border: '2px solid #eee', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', background: '#f8f8f8', color: '#130f40', minWidth: '180px' }}
            >
              <option value="default">📊 Sort: Default</option>
              <option value="price-asc">💰 Price: Low → High</option>
              <option value="price-desc">💰 Price: High → Low</option>
              <option value="name-asc">🔤 Name: A → Z</option>
            </select>
          </div>
          {/* Row 2: Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#aaa', marginRight: '4px', whiteSpace: 'nowrap' }}>Filter:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '2px solid',
                  borderColor: selectedCategory === cat ? 'green' : '#e0e0e0',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  background: selectedCategory === cat ? 'green' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#555',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>



        {/* Results Count */}
        {!isLoading && (
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '20px', fontSize: '14px' }}>
            Showing {filteredAndSorted.length} of {PRODUCTS_DATA.length} products
          </p>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <article className="card-container">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </article>
        ) : filteredAndSorted.length === 0 ? (
          <div id="no-results" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>🔍</div>
            <p style={{ color: '#ff0000', fontSize: '18px', marginBottom: '10px' }}>No matching products found.</p>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} style={{ background: 'green', color: '#fff', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer', border: 'none', fontSize: '15px' }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <article className="card-container">
            {filteredAndSorted.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const myRating = userRatings[product.id] || 0;
              return (
                <article
                  className="card"
                  key={product.id}
                  onClick={() => handleCardClick(product)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      background: 'rgba(255,255,255,0.9)', border: 'none',
                      borderRadius: '50%', width: '32px', height: '32px',
                      cursor: 'pointer', fontSize: '16px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.15)', zIndex: 2
                    }}
                  >
                    {inWishlist ? '❤️' : '🤍'}
                  </button>

                  {/* Category badge */}
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'green', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '12px', zIndex: 2 }}>
                    {product.category}
                  </span>

                  <img src={product.image} alt={product.name} loading="lazy" />
                  <h3>{product.name}</h3>

                  {/* Star Rating */}
                  <div style={{ padding: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                    <StarRating rating={myRating} onRate={(r) => handleRateProduct(product.id, r)} interactive={true} />
                    <span style={{ fontSize: '11px', color: '#888' }}>{myRating > 0 ? `Your rating: ${myRating}★` : 'Rate it'}</span>
                  </div>

                  <div className="cart">
                    <span>Rs {product.price.toLocaleString()}/-</span>
                    <span
                      className="fa-solid fa-cart-plus"
                      onClick={(e) => handleAddToCart(e, product)}
                      style={{ cursor: 'pointer' }}
                      title="Add to Cart"
                    ></span>
                  </div>
                </article>
              );
            })}
          </article>
        )}
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section style={{ padding: '2rem 9%' }}>
          <h2 style={{ textAlign: 'center', fontSize: '30px', color: '#130f40', marginBottom: '25px' }}>
            🕐 Recently <span style={{ background: 'green', color: '#fff', padding: '4px 16px', borderRadius: '8px' }}>Viewed</span>
          </h2>
          <article className="card-container">
            {recentlyViewed.map((product) => (
              <article
                className="card"
                key={product.id}
                onClick={() => handleCardClick(product)}
                style={{ cursor: 'pointer', opacity: 0.9 }}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
                <h3>{product.name}</h3>
                <div className="cart">
                  <span>Rs {product.price.toLocaleString()}/-</span>
                  <span className="fa-solid fa-cart-plus" onClick={(e) => handleAddToCart(e, product)} style={{ cursor: 'pointer' }}></span>
                </div>
              </article>
            ))}
          </article>
        </section>
      )}

      {/* Reviews Section */}
      <section className="reviews" id="reviews">
        <h1 className="content-heading">Our <span>Reviews</span></h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
          <button
            onClick={() => setReviewIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1))}
            style={{ background: '#fff', border: '2px solid #130f40', borderRadius: '50%', width: '45px', height: '45px', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}
          >❮</button>

          <div className="review-card" style={{ flex: 1, textAlign: 'center', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: 'all 0.3s' }}>
            <img src={REVIEWS_DATA[reviewIndex].img} alt={REVIEWS_DATA[reviewIndex].name} loading="lazy"
              style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '3px solid green' }} />
            <h3 style={{ fontSize: '18px', color: '#130f40', marginBottom: '8px' }}>{REVIEWS_DATA[reviewIndex].name}</h3>
            <div style={{ marginBottom: '10px' }}>
              <StarRating rating={REVIEWS_DATA[reviewIndex].stars} />
            </div>
            <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', lineHeight: '1.6', textTransform: 'none' }}>
              "{REVIEWS_DATA[reviewIndex].text}"
            </p>
            <p style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
              {reviewIndex + 1} / {REVIEWS_DATA.length}
            </p>
          </div>

          <button
            onClick={() => setReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length)}
            style={{ background: '#fff', border: '2px solid #130f40', borderRadius: '50%', width: '45px', height: '45px', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}
          >❯</button>
        </div>
      </section>
    </>
  );
}
