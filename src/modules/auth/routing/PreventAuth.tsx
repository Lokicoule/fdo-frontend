import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsLoggedIn } from "../../../stores/authStore";

type Props = { children: JSX.Element; redirectTo: string };

export const PreventAuth: FC<Props> = (props): JSX.Element => {
  const { children, redirectTo } = props;
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn()) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};
