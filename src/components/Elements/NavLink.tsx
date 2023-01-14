import { NavLink as RouterNavLink } from "react-router-dom";

import { Link as RouterLink } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type NavLinkProps = {
  to: string;
  icon: React.ReactNode;
  name: string;
};

export const NavLink = () => (
  <ListItem disablePadding>
    <ListItemButton component={RouterNavLink} to="." />
  </ListItem>
);
