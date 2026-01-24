import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import "./Home.css";

const API_URL =
  process.env.REACT_APP_API_URL || "https://cloud-devops-api.onrender.com";


const Search = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all"); // all, movie, book
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(
  `${API_URL}/search?query=${encodeURIComponent(query)}&type=${type}`
);

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Search</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search movies or books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="book">Books</option>
        </select>
        <button type="submit" className="cta-button">Search</button>
      </form>

      {loading ? (
  <p>Searching...</p>
) : results.length === 0 ? (
  <p>No results yet. Try searching for a movie or book.</p>
) : (
  <div className="items-grid">
    {results.map((item) => (
      <ItemCard key={item.externalId} item={item} />
    ))}
  </div>
)}

    </div>
  );
};

export default Search;
