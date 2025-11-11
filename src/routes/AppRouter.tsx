import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Navigation";
import HomePage from "../features/home/views/HomePage";
import ProductsPage from "../features/Products/views/ProductsPage";
import CartPage from "../features/Cart/views/CartPage";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
         
        <Route path="products" element={<ProductsPage />} />
        
        <Route path="cart" element={<CartPage />} />
        {/*
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} /> */}
      </Route>
    </Routes>
  );
}
