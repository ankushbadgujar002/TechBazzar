import React from 'react';
import { Link } from 'react-router-dom';
import { useProtectedProductsLink } from '../hooks/useProtectedProductsLink';
import '../css/indexStyle.css';

export default function Home() {
  const handleProductsClick = useProtectedProductsLink();
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
      <section className="home" id="home">
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
      <section className="categories" id="categories">
        <h1 className="content-heading"> our <span>categories</span></h1>
        <div className="card-container">
          <Link to="/products?category=Audio" className="card" onClick={handleProductsClick}>
            <img src="images/product-1.png" alt="Headphones category" />
            <p>Headphones</p>
          </Link>
          <Link to="/products?category=Laptops" className="card" onClick={handleProductsClick}>
            <img src="images/Laptop.png" alt="Laptops category" />
            <p>Laptops</p>
          </Link>
          <Link to="/products?category=Audio" className="card" onClick={handleProductsClick}>
            <img src="images/wired earphone.png" alt="Earphones category" />
            <p>Earphones</p>
          </Link>
          <Link to="/products?category=Gaming" className="card" onClick={handleProductsClick}>
            <img src="images/virtual glasses.png" alt="VR Glasses category" />
            <p>VR Glasses</p>
          </Link>
          <Link to="/products?category=Audio" className="card" onClick={handleProductsClick}>
            <img src="images/speaker.png" alt="Speakers category" />
            <p>Speakers</p>
          </Link>
          <Link to="/products?category=Mobile%20Phones" className="card" onClick={handleProductsClick}>
            <img src="images/category6.webp" alt="Mobile Phones category" />
            <p>Mobile Phones</p>
          </Link>
          <Link to="/products" className="card" onClick={handleProductsClick}>
            <img src="images/category7.webp" alt="Camera category" />
            <p>Camera</p>
          </Link>
          <Link to="/products?category=Televisions" className="card" onClick={handleProductsClick}>
            <img src="images/category8.webp" alt="Televisions category" />
            <p>Televisions</p>
          </Link>
          <Link to="/products?category=Home%20Appliances" className="card" onClick={handleProductsClick}>
            <img src="images/category9.webp" alt="Air Conditioner category" style={{ height: '100px', marginBottom: '100px', marginTop: '50px' }} />
            <p>Air Conditioner</p>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h1 className="content-heading"> our <span>features</span> </h1>
        <div className="box-container">
          <div className="box">
            <img src="images/feature-img-1.webp" alt="Reviews feature" style={{ width: '100%', marginBottom: '38px' }} />
            <h3>Reviews & Ratings</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/products" className="btn box-btn" onClick={handleProductsClick}>read more</Link>
          </div>
          <div className="box">
            <img src="images/feature-img-2.png" alt="Free delivery feature" style={{ width: '100%', marginBottom: '38px' }} />
            <h3>free delivery</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/about" className="btn box-btn">read more</Link>
          </div>
          <div className="box">
            <img src="images/feature-img-3.png" alt="Easy payments feature" style={{ width: '100%' }} />
            <h3>easy payments</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <Link to="/about" className="btn box-btn">read more</Link>
          </div>
        </div>
      </section>

      {/* Branding Banner Section */}
      <section className="branding">
        <article className="brand-card">
          <img src="images/c3.png" alt="Home gadgets banner" />
          <div className="brand-caption">
            <h2>home gadget</h2>
            <p>latest collection up to 50% off</p>
          </div>
        </article>
        <article className="brand-card">
          <img src="images/c4.png" alt="Gaming gadgets banner" />
          <div className="brand-caption">
            <h2>gaming gadget</h2>
            <p>latest collection up to 50% off</p>
          </div>
        </article>
        <article className="brand-card">
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
