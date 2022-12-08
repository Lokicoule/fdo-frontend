import { Navigate, useLocation } from "react-router-dom";
import { AUTH_ROUTES } from "../constants/auth-routes.constants";
import { useIsLoggedIn } from "../stores/authStore";

export type RequireAuthProps = { children: JSX.Element };

export const RequireAuth: React.FunctionComponent<RequireAuthProps> = (
  props
): JSX.Element => {
  const { children } = props;

  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn()) {
    return (
      <Navigate to={AUTH_ROUTES.LOGIN} replace state={{ from: location }} />
    );
  }

  return children;
};
