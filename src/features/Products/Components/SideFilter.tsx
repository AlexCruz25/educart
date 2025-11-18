import React from "react";



interface SideFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  priceRange: number;
  setPriceRange: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  minRating: number;
  setMinRating: React.Dispatch<React.SetStateAction<number>>;
}

export const SideFilter: React.FC<SideFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  maxPrice,
  minRating,
  setMinRating,
}) => {
  

  return (
    <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8 h-fit">
      {/* Categorías */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2">
          Category
        </h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2">
          Max Price
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={Math.max(50, Math.ceil(maxPrice))}
            step={10}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-gray-700 text-sm">Up to ${priceRange.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2">
          Min. Rating
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-gray-700 text-sm">{minRating.toFixed(1)} stars & up</p>
        </div>
      </div>
    </aside>
  );
};
