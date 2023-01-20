import { Navigate, Route, Routes } from "react-router-dom";

import { Customer } from "./Customer";
import { Customers } from "./Customers";

export const CustomersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Customers />} />
      <Route path=":customerId" element={<Customer />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
