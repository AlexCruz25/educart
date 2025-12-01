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
  stockStatus?: "normal" | "low_stock" | "out_of_stock";
  stockActual?: number;

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
  stockStatus,
  stockActual,
}: ProductCardProps) => {
  const handleAdd = () => {
    if (!onAddToCart) return;
    onAddToCart(id);
  };
  const stockLabel = (() => {
    switch (stockStatus) {
      case "out_of_stock":
        return "Agotado";
      case "low_stock":
        return "¡Últimas unidades!";
      case "normal":
        return "Disponible";
      default:
        return null;
    }
  })();

  const isOutOfStock = stockStatus === "out_of_stock" || (stockActual ?? 0) === 0;

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
        {stockLabel && (
          <p
            className={`text-sm font-medium ${
              stockStatus === "out_of_stock"
                ? "text-red-600"
                : stockStatus === "low_stock"
                  ? "text-amber-600"
                  : "text-green-600"
            }`}
          >
            {stockLabel}
            {stockStatus === "low_stock" && stockActual !== undefined
              ? ` (${stockActual} en stock)`
              : ""}
          </p>
        )}
        <button onClick={handleAdd}
           disabled={!onAddToCart || isAdding || isOutOfStock}
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-2 hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? "Sin stock" : isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
