import { useRoutes } from "react-router-dom";
import { Landing } from "~/features/misc/routes/Landing";

import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Landing /> }];

  const routes = publicRoutes;

  // TODO: need to think about this when we will have private routes
  // Should we use the public or private Layout for the common routes?
  routes.forEach((route) => {
    route.children = [...commonRoutes, ...route.children];
  });

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
