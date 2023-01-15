import { GraphQLClient } from "graphql-request";
import { API_URL } from "~/config";
import { getAccessToken } from "~/libs/auth";

export class BaseError extends Error {
  public readonly status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "BaseError";
    this.status = status || 500;
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, 500);
    this.name = "InternalServerError";
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

async function authMiddleware(request: any) {
  const token = await getAccessToken();

  if (token) {
    request.headers = {
      ...request.headers,
      authorization: `Bearer ${token}`,
    };
  }

  return request;
}

function errorMiddleware(response: any) {
  /*   if (response.status < 500) {
    const { message, extensions } = response.data.errors[0];
    if (extensions?.code === "INTERNAL_SERVER_ERROR")
      throw new InternalServerError(message);
    if (extensions?.code === "BAD_USER_INPUT")
      throw new BadRequestError(message);
    if (extensions?.code === "UNAUTHENTICATED")
      throw new UnauthorizedError(message);
  }

  throw new InternalServerError(response); */
}

const client = new GraphQLClient(API_URL, {
  requestMiddleware: authMiddleware,
  responseMiddleware: errorMiddleware,
});

export default client;
