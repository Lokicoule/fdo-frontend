import { ClientError, GraphQLClient } from "graphql-request";
import { API_URL } from "~/config";
import { getAccessToken } from "~/libs/auth";

export class GraphQLClientError extends Error {
  public readonly status: number;
  constructor(message?: string, status?: number) {
    super(message || "INTERNAL_SERVER_ERROR");
    this.status = status || 500;
  }
}

type ClientErrorExtensions = {
  response: {
    errors?: {
      extensions?: {
        exception?: {
          message?: string;
          status?: number;
        };
      };
    }[];
  };
};

const client = new GraphQLClient(API_URL, {
  requestMiddleware: async (request) => {
    const token = await getAccessToken();

    if (token) {
      request.headers = {
        ...request.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return request;
  },
  responseMiddleware(response) {
    if (response instanceof ClientError) {
      const error = response as ClientErrorExtensions;
      const code = error.response?.errors?.[0]?.extensions?.exception?.message;
      const status = error.response?.errors?.[0]?.extensions?.exception?.status;
      throw new GraphQLClientError(code, status);
    }
  },
});

export default client;
