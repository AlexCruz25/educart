import React from "react";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name"
  | "rating-desc";


interface SortFilterProps {
  sort: SortOption;
  setSort: React.Dispatch<React.SetStateAction<SortOption>>;
}

export const SortFilter: React.FC<SortFilterProps> = ({ sort, setSort }) => {
  return (
    <div className="flex justify-end mb-6">
      <label htmlFor="sort" className="text-gray-700 font-medium mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name">Name (A-Z)</option>
        <option value="rating-desc">Rating (High → Low)</option>
      </select>
    </div>
  );
};
