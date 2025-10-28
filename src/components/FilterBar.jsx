import React from 'react';

const FilterBar = ({ 
  filterStartDate, 
  filterEndDate, 
  onStartDateChange, 
  onEndDateChange, 
  onClearFilters 
}) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {(filterStartDate || filterEndDate) && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default FilterBar;