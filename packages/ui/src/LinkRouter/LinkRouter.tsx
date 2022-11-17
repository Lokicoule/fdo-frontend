import Link, { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

type LinkRouterProps = LinkProps & RouterLinkProps;

export const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);
