import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "~/components/Elements/Loader";
import { PublicLayout } from "~/components/Layout/PublicLayout";
import { Landing } from "~/features/misc/routes/Landing";
import { lazyImport } from "~/utils/lazyImport";

const { AuthRoutes } = lazyImport(
  () => import("~/features/auth"),
  "AuthRoutes"
);

const App = () => {
  return (
    <PublicLayout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
};

export const publicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "*", element: <AuthRoutes /> }],
  },
];
