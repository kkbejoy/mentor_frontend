import React, { useState } from "react";

const FilterComponent = ({ applyFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState("all"); // Initial filter option

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleApplyFilter = () => {
    // Call the applyFilter function with the selected filter
    applyFilter(selectedFilter);
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        className="bg-white border rounded-md px-4 py-2 outline-none"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="filter1">Filter 1</option>
        <option value="filter2">Filter 2</option>
        <option value="filter3">Filter 3</option>
      </select>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md"
        onClick={handleApplyFilter}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterComponent;
