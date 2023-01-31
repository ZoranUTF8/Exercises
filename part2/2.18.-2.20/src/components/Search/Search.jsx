import React from "react";

const Search = ({ searchTerm, handleChange }) => {
  return (
    <div>
      <h1>Search</h1>
      <input
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Country name"
      />
    </div>
  );
};

export default Search;
