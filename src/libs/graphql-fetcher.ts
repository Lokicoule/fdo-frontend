import { API_URL } from "~/config";
import { authService } from "~/features/authentication/services/authService";

//TODO : Use Axios instead of fetch

type AuthHeaderProps = {
  authorization: string;
};

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

    try {
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
        const { message } = json.errors[0];
        throw new FetchError(message, res.status);
      }

      return json.data;
    } catch (error: unknown) {
      throw new FetchError("SERVICE_UNAVAILABLE", 503);
    }
  };
}
