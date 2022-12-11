import {
  ComponentElement,
  lazy,
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

type AsyncComponentFactory = () => Promise<{
  default: React.ComponentType;
}>;

export const Loadable = <P extends object>(
  factory: AsyncComponentFactory
): React.ComponentType<P> => {
  const Component = lazy(factory);

  return (props: P): ComponentElement<React.ComponentType<P>, any> => (
    <Suspense fallback={<BundleLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export const GenericLoadable = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.ComponentType<P> => {
  const fallbackComponent = fallback || <BundleLoader />;

  return (props: P): ComponentElement<React.ComponentType<P>, any> => (
    <Suspense fallback={fallbackComponent}>
      <Component {...props} />
    </Suspense>
  );
};

export const LazyLoadable = (
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
