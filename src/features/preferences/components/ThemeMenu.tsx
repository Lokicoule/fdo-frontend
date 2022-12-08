import { MenuButton } from "../../../components/MenuButton";
import { ThemeButton } from "./ThemeButton";

export const ThemeMenu: React.FunctionComponent = () => {
  return <MenuButton renderButton={() => <ThemeButton />} />;
};
