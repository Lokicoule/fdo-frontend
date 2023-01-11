import { useRoutes } from "react-router-dom";
import { Landing } from "~/features/misc/routes/Landing";

import { publicRoutes } from "./public";
import { useAuth } from "~/providers/auth";
import { protectedRoutes } from "./protected";

export const AppRoutes = () => {
  const auth = useAuth();
  const commonRoutes = [{ path: "/", element: <Landing /> }];

  const routes = auth.isLoggedIn ? protectedRoutes : publicRoutes;

  return useRoutes([...commonRoutes, ...routes]);
};
