import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "store";

type Props = { children: JSX.Element; redirectTo: string };

export const PreventAuth: FC<Props> = (props): JSX.Element => {
  const { children, redirectTo } = props;
  const location = useLocation();
  const { token } = useStore();
  console.log("token", token);

  if (Boolean(token)) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};
