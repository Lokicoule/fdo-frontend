import { Navigate, Route, Routes } from "react-router-dom";

import { Product } from "./Product";
import { Products } from "./Products";

export const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Products />} />
      <Route path=":productId" element={<Product />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
