import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Navigation";
import HomePage from "../features/home/views/HomePage";
import ProductsPage from "../features/Products/views/ProductsPage";
import CartPage from "../features/Cart/views/CartPage";
import LoginPage from "../features/Auth/views/LoginPage";
import RegisterPage from "../features/Auth/views/RegisterPage";
import AdminProductsPage from "../features/Products/views/AdminProductsPage";
import RequireAuth from "./RequireAuth";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
         
        <Route path="products" element={<ProductsPage />} />
        
        <Route path="cart" element={<CartPage />} />
        
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="admin/products"
          element={
            <RequireAuth>
              <AdminProductsPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}
