// import { useAppDispatch } from "../../../app/hooks";
// import { addItem } from "../../cart/state/cartSlice";



type ProductCardProps = {
  image: string;
  title: string;
  category: string;
  price: number;
  id: number;
  rating?: number;
  description?: string;
  onAddToCart?: (id: number) => void;
  isAdding?: boolean;

};

export const ProductCard = ({
  image,
  title,
  category,
  price,
  id,
  rating,
  description,
  onAddToCart,
  isAdding = false,
}: ProductCardProps) => {
  const handleAdd = () => {
    if (!onAddToCart) return;
    onAddToCart(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(event) => {
          event.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        {rating !== undefined && (
          <p className="text-sm text-yellow-500" aria-label={`Rating ${rating} of 5`}>
            ⭐ {rating.toFixed(1)} / 5
          </p>
        )}
        {description && (
          <p className="text-sm text-gray-600 max-h-16 overflow-hidden">
            {description}
          </p>
        )}
        <p className="text-indigo-600 font-semibold">${price.toFixed(2)}</p>
        <button onClick={handleAdd}
          disabled={!onAddToCart || isAdding}
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-2 hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
