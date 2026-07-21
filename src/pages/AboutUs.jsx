import React from 'react';
import '../css/AboutUs.css';

export default function AboutUs() {
  return (
    <>
      <section className="main-container" id="about" style={{ marginTop: '80px' }}>
        <h1 className="content-heading" style={{ marginTop: '0' }}>About <span>Us</span></h1>
        <article className="about" id="about">
          <p>
            Welcome to <span className="brand-name">TechBazzar</span>, your one-stop destination for all things electronics! 
            Whether you're a tech enthusiast or just looking for the latest gadget, we are here to provide you with the best, 
            most innovative, and reliable products to meet your needs. At <span className="brand-name">TechBazzar</span>, 
            we understand how important technology is in today's world, and we're dedicated to making it accessible and affordable for everyone. 
            From smartphones and laptops to home appliances and gaming consoles, we offer a wide range of top-quality products from the most trusted brands.
          </p>
        </article>
      </section>

      <section className="about-img" id="our-mission">
        <img src="images/about-us.png" alt="Our Mission Banner" />
        <div className="about-img-content">
          <h4>Our Mission</h4>
          <p>
            Our mission is simple – to deliver cutting-edge technology to your doorstep at the best possible prices. 
            We are committed to offering a seamless shopping experience with excellent customer service, quick delivery, and hassle-free returns. 
            We aim to empower our customers by providing them with the tools they need to stay ahead in this fast-paced tech world.
          </p>
        </div>
      </section>

      <section className="about-img2" id="why-choose-us">
        <img src="images/why-choose-us.jpg" alt="Why Choose Us Banner" />
        <div className="about-img-content">
          <h4>Why Choose Us?</h4>
          <p>
            <strong>Top-Quality Electronics:</strong> We carefully curate our selection of products, ensuring that you get the latest models and the highest quality electronics. <br />
            <strong>Competitive Prices:</strong> We believe in offering the best prices without compromising on quality. Find great deals and discounts on your favorite gadgets! <br />
            <strong>Customer Satisfaction:</strong> Your satisfaction is our priority. Our customer support team is always available to help you with any questions or issues. <br />
            <strong>Secure Shopping Experience:</strong> We use the latest security technologies to ensure your personal information and payment details are always safe.
          </p>
        </div>
      </section>

      <section className="guarentee">
        <article className="guarentee-card">
          <i className="fa-solid fa-cart-shopping"></i>
          <h3>Free Shipping</h3>
          <h5>On Order Above 4000/- Rs</h5>
        </article>
        <article className="guarentee-card">
          <i className="fa-solid fa-rotate-left"></i>
          <h3>Free Returns</h3>
          <h5>Within 30 Days</h5>
        </article>
        <article className="guarentee-card">
          <i className="fa-solid fa-truck"></i>
          <h3>Fast Delivery</h3>
          <h5>World Wide</h5>
        </article>
        <article className="guarentee-card">
          <i className="fa-solid fa-thumbs-up"></i>
          <h3>Big Choice</h3>
          <h5>Of Products</h5>
        </article>
      </section>
    </>
  );
}
