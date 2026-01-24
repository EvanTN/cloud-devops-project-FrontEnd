import React, { useEffect, useState } from "react";
import { fetchItems } from "../api/api";
import "./Home.css";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    getData();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Our App</h1>
        <p>Your one-stop place for awesome items and features!</p>
        <button className="cta-button">Explore Now</button>
      </header>

      <section className="items-section">
        <h2>Featured Items</h2>
        {items.length === 0 ? (
          <p className="placeholder-text">
            No Items Yet – This is just a demo of backend integration.
          </p>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-image" />
                <h3>{item.name}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className="card-button">View Details</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="filler-section">
        <h2>Why Choose Us?</h2>
        <div className="filler-cards">
          <div className="filler-card">
            <h3>Fast</h3>
            <p>Our platform is optimized for speed and efficiency.</p>
          </div>
          <div className="filler-card">
            <h3>Reliable</h3>
            <p>We provide reliable data and seamless integration.</p>
          </div>
          <div className="filler-card">
            <h3>Modern</h3>
            <p>Enjoy a modern UI with clean design principles.</p>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Sign up for our newsletter and never miss updates!</p>
        <input type="email" placeholder="Enter your email" />
        <button className="cta-button">Subscribe</button>
      </section>
    </div>
  );
};

export default Home;
