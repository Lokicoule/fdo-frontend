import { lazy } from "react";

import { Loadable } from "~/components/Loadable";
import { RequireAuth, useGroups } from "~/features/authentication";

const CreateUserModal = Loadable(
  lazy(() =>
    import("./CreateUser/CreateUserModal").then((module) => ({
      default: module.CreateUserModal,
    }))
  )
);

export type RequireUserGroupProps = { children: JSX.Element };

export const RequireUserGroup: React.FunctionComponent<
  RequireUserGroupProps
> = (props): JSX.Element => {
  const { children } = props;

  const userGroups = useGroups();

  if (!userGroups?.includes("User")) {
    return (
      <RequireAuth>
        <CreateUserModal />
      </RequireAuth>
    );
  }

  return <RequireAuth>{children}</RequireAuth>;
};
