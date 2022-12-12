import { authService } from "~/features/authentication/services/authService";

type AuthHeaderProps = {
  authorization: string;
};

export function fetchData<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
) {
  return async (): Promise<TData> => {
    const authHeaders = {} as AuthHeaderProps;
    const accessToken = await authService.getAccessToken();

    if (Boolean(accessToken)) {
      authHeaders["authorization"] = `Bearer ${accessToken}`;
    }
    console.log(authHeaders);
    //todo gateway endpoint should be in .env
    const res = await fetch(
      import.meta.env.VITE_ENDPOINT_GRAPHQL_USERS_SERVICE,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
          ...(options ?? {}),
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
