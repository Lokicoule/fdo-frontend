import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = { children: JSX.Element };

export const PreventAuth: FC<Props> = ({ children }: Props): JSX.Element => {
  const location = useLocation();
  const { token } = useAuth();

  if (Boolean(token)) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};
