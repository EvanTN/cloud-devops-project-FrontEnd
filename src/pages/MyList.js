import React, { useEffect, useState } from "react";
import api from "../api/api";
import ItemCard from "../components/ItemCard";
import "./Home.css";

const MyList = () => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/items");
      setUserItems(res.data);
    } catch (error) {
      console.error("Error fetching user items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, []);

  const handleRemove = async (userItemId) => {
    try {
      await api.delete(`/user/items/${userItemId}`);
      fetchUserItems(); // refresh list after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleUpdate = async (userItemId, data) => {
    try {
      await api.put(`/user/items/${userItemId}`, data);
      fetchUserItems(); // refresh list after update
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>My List</h1>
      {loading ? (
        <p className="placeholder-text">Loading your items...</p>
      ) : userItems.length === 0 ? (
        <p className="placeholder-text">You haven’t added any items yet.</p>
      ) : (
        <div className="items-grid">
          {userItems.map((ui) => (
            <ItemCard
              key={ui._id}
              item={ui.item}
              userItemId={ui._id}
              onUpdate={() => fetchUserItems()}
            >
              {/* Extra UI for MyList */}
              <div style={{ marginTop: "0.5rem" }}>
                <select
                  value={ui.status}
                  onChange={(e) => handleUpdate(ui._id, { status: e.target.value })}
                >
                  <option value="plan">Plan to Watch/Read</option>
                  <option value="reading">Watching/Reading</option>
                  <option value="watched">Watched/Read</option>
                </select>

                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating"
                  value={ui.rating || ""}
                  onChange={(e) => handleUpdate(ui._id, { rating: e.target.value })}
                  style={{ width: "50px", marginLeft: "0.5rem" }}
                />

                <button
                  onClick={() => handleRemove(ui._id)}
                  className="card-button"
                  style={{ marginLeft: "0.5rem", backgroundColor: "#dc3545" }}
                >
                  Remove
                </button>
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
