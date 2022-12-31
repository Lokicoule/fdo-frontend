import { useRoutes } from "react-router-dom";
import { Landing } from "~/features/misc/routes/Landing";

import { useAuth } from "~/libs/auth";

import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Landing /> }];

  const routes = publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
