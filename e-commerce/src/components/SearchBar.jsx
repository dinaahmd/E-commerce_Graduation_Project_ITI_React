import React from "react";

function SearchBar({ onSearch }) {
  const handleSearchInput = event => {
    const searchQuery = event.target.value.toLowerCase();
    onSearch(searchQuery);
  };

  return (
    <input
      type="text"
      placeholder="Search products"
      onChange={handleSearchInput}
    />
  );
}

export default SearchBar;