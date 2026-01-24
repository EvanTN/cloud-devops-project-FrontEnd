import React, { useEffect, useState } from "react";
import { fetchItems } from "../api/api";
import ItemCard from "../components/ItemCard";
import "./Home.css"; // reuse Home.css styling

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Dashboard</h1>
        <p>Explore trending movies and books!</p>
      </header>

      {loading ? (
        <p className="placeholder-text">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="placeholder-text">No items found yet.</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
