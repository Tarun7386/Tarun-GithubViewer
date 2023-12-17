import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input class="input"
      type="text"
      placeholder="Search repositories"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
