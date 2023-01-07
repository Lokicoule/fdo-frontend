import { lazyImport } from "~/utils/lazyImport";

const { AuthRoutes } = lazyImport(
  () => import("~/features/auth"),
  "AuthRoutes"
);

export const publicRoutes = [{ path: "*", element: <AuthRoutes /> }];
