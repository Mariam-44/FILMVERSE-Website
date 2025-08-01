import React, { useState, useEffect } from "react";

export default function SearchInput({
  placeholder = "Search ...",
  onSearch,
  className = "",
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={`w-full bg-bgColor text-textColor px-4 py-2 rounded-md border border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 ${className}`}
    />
  );
}
