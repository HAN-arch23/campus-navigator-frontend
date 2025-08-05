// src/components/FilterPanel.js
import React from 'react';
import './FilterPanel.css';

function FilterPanel({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="filter-panel">
      <h3>Filter Rooms</h3>

      <label>
        Building:
        <input
          type="text"
          name="building"
          value={filters.building}
          onChange={handleChange}
          placeholder="e.g. Science Block"
        />
      </label>

      <label>
        Minimum Capacity:
        <input
          type="number"
          name="capacity"
          value={filters.capacity}
          onChange={handleChange}
          placeholder="e.g. 50"
        />
      </label>

      <label>
        Availability:
        <select name="available" value={filters.available} onChange={handleChange}>
          <option value="">Any</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </label>
    </div>
  );
}

export default FilterPanel;