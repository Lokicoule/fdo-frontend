import { Navigate, useLocation } from "react-router-dom";
import { useGroups } from "../../authentication/stores/authStore";

type Props = { children: JSX.Element };

export const PreventUserGroup = (props: Props): JSX.Element => {
  const { children } = props;
  const location = useLocation();
  const userGroups = useGroups();

  if (userGroups?.includes("User")) {
    return <Navigate to={"/home"} replace state={{ from: location }} />;
  }

  return children;
};
