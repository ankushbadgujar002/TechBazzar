import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useSectionLink } from '../hooks/useSectionLink';
import { useProtectedProductsLink } from '../hooks/useProtectedProductsLink';

export default function Footer() {
  const { addToast } = useToast();
  const handleHashLink = useSectionLink();
  const handleProductsClick = useProtectedProductsLink();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    addToast("Thank you for subscribing to our newsletter! ✉️", "success");
    e.target.reset();
  };

  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>
            <img src="/images/favicon.ico" alt="TechBazzar Logo" style={{ width: '30px', height: '30px', objectFit: 'contain', marginRight: '5px', verticalAlign: 'middle' }} />
            T-Bazz
          </h3>
          <p>
            Have Questions or Need Assistance? Get in Touch with Us Today! At TechBazzar, we’re always here to help you with any inquiries, product details, or support you need. Your satisfaction is our top priority!
          </p>
          <div className="share">
            <a href="#" className="fa-brands fa-facebook" aria-label="Facebook"></a>
            <a href="#" className="fa-brands fa-instagram" aria-label="Instagram"></a>
            <a href="#" className="fa-brands fa-twitter" aria-label="Twitter"></a>
            <a href="#" className="fa-brands fa-linkedin" aria-label="LinkedIn"></a>
          </div>
        </div>

        <div className="box" id="contact">
          <h3 className='dark:text-white dark:border-blue-400/30'> Contact Info </h3>
          <a href="tel:+919867453423" className="links"><i className="fa fa-phone"></i> +91 9867453423</a>
          <a href="tel:+914567348697" className="links"><i className="fa fa-phone"></i> +91 4567348697</a>
          <a href="mailto:info@example.com" className="links"><i className="fa fa-envelope"></i> info@example.com</a>
          <a href="#" className="links" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-location-dot"></i> pune, maharashtra, india </a>
        </div>

        <div className="box">
          <h3> Quick Links </h3>
          <Link to="/" className="links"><i className="fa fa-arrow-right"></i> Home</Link>
          <a href="#categories" className="links" onClick={handleHashLink('categories')}><i className="fa fa-arrow-right"></i> Categories</a>
          <a href="#features" className="links" onClick={handleHashLink('features')}><i className="fa fa-arrow-right"></i> Features</a>
          <Link to="/products" className="links" onClick={handleProductsClick}><i className="fa fa-arrow-right"></i> Products</Link>
          <Link to="/products" className="links" onClick={handleProductsClick}><i className="fa fa-arrow-right"></i> New Arrivals</Link>
        </div>

        <div className="box">
          <h3> Newsletter </h3>
          <p>Subscribe For Latest Updates</p>
          <form onSubmit={handleSubscribeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="email" className="email" placeholder="your email...." required style={{ textTransform: 'none' }} />
            <input type="submit" value="Subscribe" className="btns" style={{ cursor: 'pointer' }} />
          </form>
          <img src="images/payment.png" className="payment-img" alt="Payment Methods" />
        </div>
      </div>

      <a href="#" onClick={scrollToTop} className="circle-chevron-up" aria-label="Scroll to top">
        <i className="fa fa-circle-chevron-up"></i>
      </a>

      <div className="credit"> created by <span>Ankush Badgujar </span> | all rights reserved</div>
    </section>
  );
}
