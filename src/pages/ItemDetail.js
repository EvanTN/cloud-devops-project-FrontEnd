import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { fetchItemById } from "../api/api";
import "./Home.css";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [userItem, setUserItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("plan");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch item details
        const itemData = await fetchItemById(id);
        setItem(itemData);

        // Check if user has this item in their list
        const userItemsRes = await api.get("/user/items");
        const found = userItemsRes.data.find((ui) => ui.item._id === id);
        if (found) {
          setUserItem(found);
          setStatus(found.status);
          setRating(found.rating || "");
          setReview(found.review || "");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToMyList = async () => {
    try {
      setAdding(true);
      const res = await api.post("/user/items", { itemId: id });
      setUserItem(res);
    } catch (error) {
      console.error("Error adding to My List:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async () => {
    if (!userItem) return;
    try {
      await api.put(`/user/items/${userItem._id}`, { status, rating, review });
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (loading) return <p className="home-container">Loading...</p>;
  if (!item) return <p className="home-container">Item not found.</p>;

  return (
    <div className="home-container">
      <h1>{item.title}</h1>
      <p>{item.type}</p>
      <img
        src={item.posterUrl || "https://via.placeholder.com/300x400"}
        alt={item.title}
        style={{ width: "300px", borderRadius: "12px", marginTop: "1rem" }}
      />
      <p style={{ marginTop: "1rem" }}>{item.description || "No description available."}</p>

      {!userItem ? (
        <button
          className="card-button"
          onClick={handleAddToMyList}
          disabled={adding}
          style={{ marginTop: "1rem" }}
        >
          {adding ? "Adding..." : "Add to My List"}
        </button>
      ) : (
        <div style={{ marginTop: "1rem", maxWidth: "400px" }}>
          <label>
            Status:{" "}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="plan">Plan to Watch/Read</option>
              <option value="reading">Watching/Reading</option>
              <option value="watched">Watched/Read</option>
            </select>
          </label>

          <label style={{ marginLeft: "0.5rem" }}>
            Rating:{" "}
            <input
              type="number"
              min="1"
              max="5"
              value={rating || ""}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: "50px" }}
            />
          </label>

          <label style={{ display: "block", marginTop: "0.5rem" }}>
            Review:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              style={{ width: "100%", borderRadius: "8px", padding: "0.5rem" }}
            />
          </label>

          <button
            onClick={handleUpdate}
            className="card-button"
            style={{ marginTop: "0.5rem" }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
