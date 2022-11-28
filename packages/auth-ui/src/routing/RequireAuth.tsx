import { useIsLoggedIn } from "auth-provider";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: JSX.Element };

export const RequireAuth: FC<Props> = ({ children }: Props): JSX.Element => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
