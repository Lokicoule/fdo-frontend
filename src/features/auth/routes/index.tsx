import { Route, Routes } from "react-router-dom";

import { Login, LOGIN_PATH } from "./Login";
import { Register, REGISTER_PATH } from "./Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={REGISTER_PATH} element={<Register />} />
      <Route path={LOGIN_PATH} element={<Login />} />
    </Routes>
  );
};
