import {
  ComponentElement,
  LazyExoticComponent,
  ReactNode,
  Suspense,
} from "react";

import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

const BundleLoader: React.FunctionComponent = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export const Loadable = (
  Component: LazyExoticComponent<React.ComponentType>,
  fallback?: ReactNode
): React.ComponentType => {
  const fallbackComponent = fallback ?? <BundleLoader />;

  return (props): ComponentElement<React.ComponentType, any> => (
    <Suspense fallback={fallbackComponent}>
      <Component {...props} />
    </Suspense>
  );
};
