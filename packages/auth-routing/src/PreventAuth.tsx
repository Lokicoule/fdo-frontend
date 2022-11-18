import { useAuth } from "auth-provider";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: JSX.Element; redirectTo: string };

export const PreventAuth: FC<Props> = (props): JSX.Element => {
  const { children, redirectTo } = props;
  const location = useLocation();
  const { token } = useAuth();

  if (Boolean(token)) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};
