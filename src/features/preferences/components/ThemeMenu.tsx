import { MenuButton } from "../../../components/MenuButton";
import { ThemeButton } from "./ThemeButton";

export const ThemeMenu: React.FC = () => {
  return <MenuButton renderButton={() => <ThemeButton />} />;
};
