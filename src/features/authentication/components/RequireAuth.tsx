import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AUTH_ROUTES } from "../constants/auth-routes.constants";
import { useIsLoggedIn } from "../stores/authStore";

type Props = { children: JSX.Element };

export const RequireAuth: FC<Props> = ({ children }: Props): JSX.Element => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn()) {
    return (
      <Navigate to={AUTH_ROUTES.LOGIN} replace state={{ from: location }} />
    );
  }

  return children;
};
