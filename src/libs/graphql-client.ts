import { ClientError, GraphQLClient } from "graphql-request";
import { API_URL } from "~/config";
import { getAccessToken } from "~/libs/auth";
import { GraphQLError } from "graphql";

export const GRAPHQL_ERROR_CODE = {
  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
};

export class BaseException extends Error {
  public readonly code: string;
  public readonly useBoundary: boolean;
  constructor(message: string, code: string, useBoundary?: boolean) {
    super(message);
    this.name = "BaseException";
    this.code = code;
    this.useBoundary = useBoundary || false;
  }
}
export class TechnicalException extends BaseException {
  constructor(message: string, code?: string) {
    super(message, code || "INTERNAL_SERVER_ERROR", true);
    this.name = "TechnicalException";
  }
}

export class ServiceUnavailableException extends TechnicalException {
  constructor(message: string) {
    super(message, "SERVICE_UNAVAILABLE");
    this.name = "ServiceUnavailableException";
  }
}

export class UseCaseException extends BaseException {
  constructor(message: string) {
    super(message, "BAD_USER_INPUT", false);
    this.name = "UseCaseException";
  }
}

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
      const error = response.response?.errors?.[0] as GraphQLError;
      console.log("error", error);
      console.log("error.extensions.code", error.extensions.code);
      console.log("error.message", error.message);
      if (error.extensions.code === "BAD_USER_INPUT") {
        throw new UseCaseException(error.message);
      }
      if (error.extensions.code === "INTERNAL_SERVER_ERROR") {
        throw new TechnicalException(error.message);
      }

      throw new ServiceUnavailableException(error.message);
    }
  },
});

export default client;
