import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { ProductCard } from "../Components/ProductCard";
import { SortFilter, type SortOption } from "../Components/SortFilter";
import { SideFilter } from "../Components/SideFilter";
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../../Cart/hooks/useCart";
import { useAppSelector } from "../../../store/hook";

export default function ProductsPage() {
  const [sort, setSort] = useState<SortOption>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: products = [], isLoading, isError, error } = useProducts();
  const addToCart = useAddToCart();

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => {
      if (product.category) {
        set.add(product.category);
      }
    });
    return ["All", ...Array.from(set)];
  }, [products]);

  const maxPrice = useMemo(() => {
    if (!products.length) return 100;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange((current) => {
        if (current === 0 || current > maxPrice) {
          return maxPrice;
        }
        return current;
      });
    }
  }, [maxPrice]);


 

  // Filtrado y orden local (luego se reemplazará por API)
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price <= priceRange);
    result = result.filter((p) => (p.rating ?? 0) >= minRating);

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, minRating, sort]);

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      setAddingId(productId);
      setFeedback(null);
      await addToCart.mutateAsync({ productId, quantity: 1 });
      setFeedback("Producto agregado al carrito");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        navigate("/login", { state: { from: location } });
        return;
      }
      const detail =
        err instanceof AxiosError
          ? (err.response?.data as { detail?: string })?.detail
          : null;
      setFeedback(detail ?? "No se pudo agregar el producto");
    } finally {
      setAddingId(null);
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 py-10">
        Cargando productos...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Error al obtener productos: {(error as Error).message}
      </p>
    )

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-10">
          Educational Products
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros laterales */}
          <div className="lg:w-1/4">
            <SideFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>

          {/* Listado principal */}
          <div className="lg:w-3/4">
            <SortFilter sort={sort} setSort={setSort} />

            {feedback && (
              <p className="mb-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-100 p-3 rounded">
                {feedback}
              </p>
            )}


            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  rating={product.rating}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                  isAdding={addingId === product.id}
                />
              ))}

              {filtered.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">
                  No products found for this filter.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
