import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import Link, { LinkProps } from "@mui/material/Link";

export type LinkRouterProps = LinkProps & RouterLinkProps;

export const LinkRouter: React.FunctionComponent<LinkRouterProps> = (props) => (
  <Link {...props} component={RouterLink as any} />
);
