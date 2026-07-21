import React from 'react';
import { Link } from 'react-router-dom';
import { useProtectedProductsLink } from '../hooks/useProtectedProductsLink';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/indexStyle.css';

export default function Home() {
  const handleProductsClick = useProtectedProductsLink();

  // Scroll reveal hooks for Home sections
  const [heroRef, heroRevealed] = useScrollReveal();
  const [categoriesRef, categoriesRevealed] = useScrollReveal();
  const [featuresRef, featuresRevealed] = useScrollReveal();
  const [brandingRef, brandingRevealed] = useScrollReveal();

  return (
    <>
      <main className="home1" id="home1">
        <img src="images/bg.jpg" alt="TechBazzar Background Banner" />
      </main>

      <div className="heading">
        <h1>welcome to <span className="heading-span">TechBazzar</span> website...</h1>
      </div>

      <div className="sub-heading">
        <h3>Find Your Perfect Match in Tech Accessories <span> | </span> Enhance Your Tech, Enhance Your World</h3>
      </div>

      {/* Hero Discount Section */}
      <section
        ref={heroRef}
        className={`home sr-fade-up ${heroRevealed ? 'sr-revealed' : ''}`}
        id="home"
      >
        <img src="images/discount.png" alt="Discounts up to 50% off" />
        <div className="caption">
          <h1>electronic products up to <span> 50% </span> off</h1>
          <p>At TechBazzar, we bring the latest in electronics right to your doorstep, offering unbeatable prices and cutting-edge technology to help you stay ahead of the curve.</p>
          <Link to="/products" onClick={handleProductsClick}>
            <button className="btn" style={{ cursor: 'pointer' }}>Shop Now</button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section
        ref={categoriesRef}
        className={`categories ${categoriesRevealed ? 'sr-revealed' : ''}`}
        id="categories"
      >
        <h1 className="content-heading"> our <span>categories</span></h1>
        <div className="card-container">
          <Link to="/products?category=Audio" className="card delay-100" onClick={handleProductsClick}>
            <img src="images/product-1.png" alt="Headphones category" />
            <p>Headphones</p>
          </Link>
          <Link to="/products?category=Laptops" className="card delay-200" onClick={handleProductsClick}>
            <img src="images/Laptop.png" alt="Laptops category" />
            <p>Laptops</p>
          </Link>
          <Link to="/products?category=Audio" className="card delay-300" onClick={handleProductsClick}>
            <img src="images/wired earphone.png" alt="Earphones category" />
            <p>Earphones</p>
          </Link>
          <Link to="/products?category=Gaming" className="card delay-400" onClick={handleProductsClick}>
            <img src="images/virtual glasses.png" alt="VR Glasses category" />
            <p>VR Glasses</p>
          </Link>
          <Link to="/products?category=Audio" className="card delay-100" onClick={handleProductsClick}>
            <img src="images/speaker.png" alt="Speakers category" />
            <p>Speakers</p>
          </Link>
          <Link to="/products?category=Mobile%20Phones" className="card delay-200" onClick={handleProductsClick}>
            <img src="images/category6.webp" alt="Mobile Phones category" />
            <p>Mobile Phones</p>
          </Link>
          <Link to="/products" className="card delay-300" onClick={handleProductsClick}>
            <img src="images/category7.webp" alt="Camera category" />
            <p>Camera</p>
          </Link>
          <Link to="/products?category=Televisions" className="card delay-400" onClick={handleProductsClick}>
            <img src="images/category8.webp" alt="Televisions category" />
            <p>Televisions</p>
          </Link>
          <Link to="/products?category=Home%20Appliances" className="card delay-500" onClick={handleProductsClick}>
            <img src="images/category9.webp" alt="Air Conditioner category" style={{ height: '100px', marginBottom: '100px', marginTop: '50px' }} />
            <p>Air Conditioner</p>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className={`features ${featuresRevealed ? 'sr-revealed' : ''}`}
        id="features"
      >
        <h1 className="content-heading"> our <span>features</span> </h1>
        <div className="box-container">
          <div className="box delay-100">
            <img src="images/feature-img-1.webp" alt="Reviews feature" style={{ width: '100%', marginBottom: '38px' }} />
            <h3>Reviews & Ratings</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/products" className="btn box-btn" onClick={handleProductsClick}>read more</Link>
          </div>
          <div className="box delay-200">
            <img src="images/feature-img-2.png" alt="Free delivery feature" style={{ width: '100%', marginBottom: '38px' }} />
            <h3>free delivery</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/about" className="btn box-btn">read more</Link>
          </div>
          <div className="box delay-300">
            <img src="images/feature-img-3.png" alt="Easy payments feature" style={{ width: '100%' }} />
            <h3>easy payments</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/about" className="btn box-btn">read more</Link>
          </div>
        </div>
      </section>

      {/* Branding Banner Section */}
      <section
        ref={brandingRef}
        className={`branding ${brandingRevealed ? 'sr-revealed' : ''}`}
      >
        <article className="brand-card delay-100">
          <img src="images/c3.png" alt="Home gadgets banner" />
          <div className="brand-caption">
            <h2>home gadget</h2>
            <p>latest collection up to 50% off</p>
          </div>
        </article>
        <article className="brand-card delay-200">
          <img src="images/c4.png" alt="Gaming gadgets banner" />
          <div className="brand-caption">
            <h2>gaming gadget</h2>
            <p>latest collection up to 50% off</p>
          </div>
        </article>
        <article className="brand-card delay-300">
          <img src="images/c5.png" alt="Electronic gadgets banner" />
          <div className="brand-caption">
            <h2>electronic gadget</h2>
            <p>latest collection up to 50% off</p>
          </div>
        </article>
      </section>
    </>
  );
}
