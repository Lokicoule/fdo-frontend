import { Route, Routes } from "react-router-dom";

import { Login, LOGIN_PATH } from "./Login";
import { Register, REGISTER_PATH } from "./Register";
import {
  RegisterConfirmation,
  REGISTER_CONFIRMATION_PATH,
} from "./RegisterConfirmation";
import { ForgotPassword, FORGOT_PASSWORD_PATH } from "./ForgotPassword";
import {
  ForgotPasswordConfirmation,
  FORGOT_PASSWORD_CONFIRMATION_PATH,
} from "./ForgotPasswordConfirmation";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={REGISTER_PATH} element={<Register />} />
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route
        path={REGISTER_CONFIRMATION_PATH}
        element={<RegisterConfirmation />}
      />
      <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
      <Route
        path={FORGOT_PASSWORD_CONFIRMATION_PATH}
        element={<ForgotPasswordConfirmation />}
      />
    </Routes>
  );
};
