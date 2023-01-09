import { DocumentNode, parse } from "graphql";
import { API_URL } from "~/config";
import { getAccessToken } from "~/libs/auth";
import http from "./http";
import { AxiosError } from "axios";

//TODO : Use Axios instead of fetch

/* type AuthHeaderProps = {
  authorization: string;
}; */

export class FetchError extends Error {
  private _status: number;

  constructor(message: string, status?: number) {
    super(message);
    this._status = status ?? 500;
  }

  get status() {
    return this._status;
  }
}

/* export function fetchData<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
) {
  return async (): Promise<TData> => {
    const authHeaders = {} as AuthHeaderProps;
    const accessToken = await getAccessToken();

    if (Boolean(accessToken)) {
      authHeaders["authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...(options ?? {}),
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      console.log(json.errors);
      const { message, extensions } = json.errors[0];
      if (extensions?.code === "INTERNAL_SERVER_ERROR")
        throw new FetchError(message, 500);
      throw new FetchError(message, res.status);
    }

    return json.data;
  };
} */

export function requestGraphQL<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const response = await (
      await http
        .post(API_URL, { query, variables })
        .catch((err: AxiosError) => {
          console.log("err", err);
          throw new FetchError(err.message, err.response?.status ?? 500);
        })
    ).data;

    console.log("dededed", response);

    if (response.errors) {
      console.log(response.errors);
      const { message, extensions } = response.errors[0];
      const { exception } = extensions;

      if (exception) {
        throw new FetchError(message, exception.status ?? 500);
      }

      throw new FetchError(
        "An unexpected error occurred. Please try again later.",
        500
      );
    }

    return response.data;
  };
}
