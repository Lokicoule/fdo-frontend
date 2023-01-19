import { GraphQLError } from "graphql";
import { ClientError, GraphQLClient } from "graphql-request";
import { API_URL } from "~/config";
import { getAccessToken } from "./auth";
import { notify } from "./notify";

export class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly useBoundary: boolean
  ) {
    super(message);
    this.name = "BaseException";
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

export class UnknownException extends TechnicalException {
  constructor(message: string) {
    super(message, "UNKNOWN_ERROR");
    this.name = "UnknowException";
  }
}

function handleApiError(error: GraphQLError) {
  switch (error.extensions.code) {
    case "BAD_USER_INPUT":
      throw new UseCaseException(error.message);
    case "INTERNAL_SERVER_ERROR":
      throw new TechnicalException(error.message);
    case "SERVICE_UNAVAILABLE":
      throw new ServiceUnavailableException(error.message);
    default:
      throw new UnknownException(error.message);
  }
}

function handleNetworkError(error: TypeError) {
  throw new ServiceUnavailableException(error.message);
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
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        handleApiError(response.response?.errors?.[0] as GraphQLError);
      } else if (response instanceof TypeError) {
        handleNetworkError(response);
      }
    } else {
      notify.error({
        title: "Error",
        message: "Unknown error",
      });
      throw new UnknownException(JSON.stringify(response));
    }
  },
});

export default client;
