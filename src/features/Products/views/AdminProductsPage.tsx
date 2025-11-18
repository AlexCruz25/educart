import { useMemo, useState } from "react";
import { AxiosError } from "axios";

import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import { api } from "../../../lib/axiosInstance";
import { useAppSelector } from "../../../store/hook";

interface ProductForm {
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
  rating?: number;
}

const EMPTY_FORM: ProductForm = {
  name: "",
  price: 0,
  category: "",
  description: "",
  image_url: "",
  rating: 0,
};

export default function AdminProductsPage() {
  const { username } = useAppSelector((state) => state.auth);
  const { data: products = [], isLoading, refetch, error } = useProducts();
  const [formData, setFormData] = useState<ProductForm>(EMPTY_FORM);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdminUser = username === "admin";

  const handleInputChange = (field: keyof ProductForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" || field === "rating" ? Number(value) : value,
    }));
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image_url: product.image,
      rating: product.rating,
    });
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
  };

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setStatusMessage(null);

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formData);
        setStatusMessage("Producto actualizado correctamente");
      } else {
        await api.post("/products/", formData);
        setStatusMessage("Producto creado correctamente");
      }
      resetForm();
      await refetch();
    } catch (err) {
      const detail =
        err instanceof AxiosError
          ? (err.response?.data as { detail?: string })?.detail
          : null;
      setFormError(detail ?? "No se pudo guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeProduct = async (id: number) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    setStatusMessage(null);
    setFormError(null);
    try {
      await api.delete(`/products/${id}`);
      setStatusMessage("Producto eliminado");
      if (editingProduct?.id === id) {
        resetForm();
      }
      await refetch();
    } catch (err) {
      const detail =
        err instanceof AxiosError
          ? (err.response?.data as { detail?: string })?.detail
          : null;
      setFormError(detail ?? "No se pudo eliminar el producto");
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => set.add(product.category));
    return Array.from(set);
  }, [products]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        Error al cargar productos.
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Panel de productos</h1>

      {!isAdminUser && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded mb-6">
          Esta sección requiere permisos de administrador. Intenta iniciar sesión con un usuario administrador.
        </div>
      )}

      <section className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Editar producto" : "Crear nuevo producto"}
        </h2>
        {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}
        {statusMessage && <p className="text-green-600 text-sm mb-3">{statusMessage}</p>}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitProduct}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="w-full border rounded p-2"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              className="w-full border rounded p-2"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              list="category-options"
              required
            />
            <datalist id="category-options">
              {categories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              className="w-full border rounded p-2"
              value={formData.rating ?? 0}
              onChange={(e) => handleInputChange("rating", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">URL de imagen</label>
            <input
              className="w-full border rounded p-2"
              value={formData.image_url}
              onChange={(e) => handleInputChange("image_url", e.target.value)}
            />
          </div>
          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !isAdminUser}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting ? "Guardando..." : editingProduct ? "Actualizar" : "Crear"}
            </button>
            {editingProduct && (
              <button type="button" onClick={resetForm} className="px-4 py-2 border rounded">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Productos existentes</h2>
        {isLoading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No hay productos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Categoría</th>
                  <th className="py-2">Precio</th>
                  <th className="py-2">Rating</th>
                  <th className="py-2 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-2">{product.title}</td>
                    <td className="py-2">{product.category}</td>
                    <td className="py-2">${product.price.toFixed(2)}</td>
                    <td className="py-2">{product.rating ?? "-"}</td>
                    <td className="py-2 flex gap-2 justify-end">
                      <button
                        className="text-indigo-600 hover:underline"
                        onClick={() => startEdit(product)}
                        disabled={!isAdminUser}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => removeProduct(product.id)}
                        disabled={!isAdminUser}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}