import { useState, useMemo } from "react";
// import img1 from "../../../assets/1.webp";
// import img2 from "../../../assets/2.webp";
// import img3 from "../../../assets/3.webp";

import { ProductCard } from "../Components/ProductCard";
import { SortFilter, type SortOption } from "../Components/SortFilter";
import { SideFilter, type CategoryOption } from "../Components/SideFilter";
// import type { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const [sort, setSort] = useState<SortOption>("default");
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("All");
  const [priceRange, setPriceRange] = useState<number>(200);

  const {data:products=[], isLoading, isError, error}=useProducts();

 

  // Filtrado y orden local (luego se reemplazará por API)
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price <= priceRange);

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
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, sort]);

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
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Listado principal */}
          <div className="lg:w-3/4">
            <SortFilter sort={sort} setSort={setSort} />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  category={product.category}
                  price={product.price}
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
