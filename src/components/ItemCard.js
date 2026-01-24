import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Navbar.css"; // reusing styles for buttons and cards

const ItemCard = ({ item, userItemId, onUpdate }) => {
  const [added, setAdded] = useState(!!userItemId);
  const [loading, setLoading] = useState(false);

  const handleAddToMyList = async () => {
    try {
      setLoading(true);
      const res = await api.post("/user/items", {
  external_id: item.externalId,
  name: item.title,
  description: item.description || "",
  media_type: item.type,
});

      setAdded(true);
      if (onUpdate) onUpdate(res); // inform parent to refresh
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-card">
      <img
  src={item.posterUrl || "https://via.placeholder.com/200x300"}
  alt={item.title || item.name}
/>

<h3>{item.title || item.name}</h3>

      <p>{item.type}</p>
      <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem" }}>
        <Link to={`/item/${item.externalId}`}>
          <button className="card-button">Details</button>
        </Link>
        {!added && (
          <button
            onClick={handleAddToMyList}
            className="card-button"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to My List"}
          </button>
        )}
        {added && <span style={{ color: "#28a745", fontWeight: "bold" }}>Added</span>}
      </div>
    </div>
  );
};

export default ItemCard;
