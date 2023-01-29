import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <div>
      <h1>Search</h1>
      <input type="text" onChange={handleFilter} />
    </div>
  );
};

export default Filter;
