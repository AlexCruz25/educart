// import { useAppDispatch } from "../../../app/hooks";
// import { addItem } from "../../cart/state/cartSlice";

import { useAppDispatch } from "../../../store/hook";
import { addItem } from "../../Cart/redux/cartSlice";

type ProductCardProps = {
  image: string;
  title: string;
  category: string;
  price: number;
  id: number;
};

export const ProductCard = ({ image, title, category, price, id }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (!id) return; // si no lo pasaste
    dispatch(addItem({ id, title, price, image, quantity: 1 }));
    // TODO: opcional -> POST /cart/{id}
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
        <p className="text-indigo-600 font-semibold">${price.toFixed(2)}</p>
        <button onClick={handleAdd}
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-2 hover:bg-indigo-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
