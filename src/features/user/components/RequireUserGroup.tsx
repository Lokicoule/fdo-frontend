import { Suspense } from "react";
import { Loading } from "../../../layouts/AppShell/components/Loading";
import { lazyLoad } from "../../../libs/lazy-load";
import { RequireAuth } from "../../authentication";
import { useGroups } from "../../authentication/stores/authStore";

const CreateUserModal = lazyLoad(
  "./CreateUser/CreateUserModal",
  "CreateUserModal"
);

export type RequireUserGroupProps = { children: JSX.Element };

export const RequireUserGroup: React.FunctionComponent<
  RequireUserGroupProps
> = (props): JSX.Element => {
  const { children } = props;

  const userGroups = useGroups();

  if (!userGroups?.includes("User")) {
    return (
      <Suspense fallback={<Loading />}>
        <RequireAuth>
          <CreateUserModal />
        </RequireAuth>
      </Suspense>
    );
  }

  return <RequireAuth>{children}</RequireAuth>;
};
