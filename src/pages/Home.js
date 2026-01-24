import React, { useEffect, useState } from "react";
import { fetchItems } from "../api/api";

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
    <div style={{ padding: "2rem" }}>
      <h1>Home Page</h1>
      {items.length === 0 ? (
        <p>No Items - Made to Test Backend Implimentations</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
