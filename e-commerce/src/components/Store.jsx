import React, { useState, useEffect } from "react";
import StoreItem from "./StoreItem";
import axios from "axios";
import SearchBar from "./SearchBar";

const Store = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStoreItems = async () => {
      const response = await axios.get("http://localhost:8000/products/");
      setStoreItems(response.data);
    };

    fetchStoreItems();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  let filteredStoreItems = storeItems;

  if (searchQuery) {
    const regex = new RegExp(`^${searchQuery}`, "i");

    filteredStoreItems = storeItems.filter(
      item =>
        regex.test(item.name) ||
        regex.test(item.description)
    );
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h1 className="p-4 mt-3 text-center store-title">New Collection</h1>
      {filteredStoreItems.length === 0 && (
        <p className="text-center">No products found for "{searchQuery}".</p>
      )}
      <div>
        {filteredStoreItems.map((output) => (
          <div key={output.id}>
            <StoreItem
              id={output.id}
              productName={output.name}
              productDescription={output.description}
              productPrice={output.price}
              productSale={output.promotion}
              image={output.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;