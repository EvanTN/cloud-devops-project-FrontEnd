import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Navbar.css";

const ItemCard = ({ item, userItemId, onUpdate, children }) => {
  const [added, setAdded] = useState(!!userItemId);
  const [loading, setLoading] = useState(false);

  const externalId = item.externalId || item.external_id || item.id || item._id;
  const title = item.title || item.name || "Untitled";
  const description = item.description || "";
  const mediaType = item.type || item.media_type || "unknown";
  const posterUrl = item.posterUrl || item.poster_url;

  const handleAddToMyList = async () => {
    try {
      setLoading(true);

      const res = await api.post("/user/items", {
        external_id: externalId,
        name: title,
        description,
        media_type: mediaType,
        poster_url: posterUrl || "",
      });

      setAdded(true);

      if (onUpdate) {
        onUpdate(res.data || res);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Could not add item to your list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-card">
      <img
        src={posterUrl || "https://via.placeholder.com/200x300"}
        alt={title}
      />

      <h3>{title}</h3>
      <p>{mediaType}</p>

      <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem" }}>
        <Link to={`/item/${externalId}`}>
          <button className="card-button">Details</button>
        </Link>

        {!added ? (
          <button
            onClick={handleAddToMyList}
            className="card-button"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to My List"}
          </button>
        ) : (
          <span style={{ color: "#28a745", fontWeight: "bold" }}>
            Added
          </span>
        )}
      </div>

      {children && <div style={{ marginTop: "0.75rem" }}>{children}</div>}
    </div>
  );
};

export default ItemCard;