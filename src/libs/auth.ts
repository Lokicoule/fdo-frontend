import cognitoClient from "~/libs/cognito";
import { CognitoUserAttributesBuilder } from "~/libs/cognito/builders/CognitoUserAttributesBuilder";
import http from "~/libs/http";

export const register = (email: string, password: string) => {
  if (Boolean(cognitoClient.getCurrentUser())) {
    throw new Error("You are already logged in.");
  }
  return cognitoClient.signUp(
    email,
    password,
    new CognitoUserAttributesBuilder().add("email", email).build(),
    new CognitoUserAttributesBuilder().build()
  );
};

export const registerConfirmation = (email: string, code: string) => {
  return cognitoClient.confirmSignUp(email, code);
};

export const sendEmailVerification = (email: string) => {
  return cognitoClient.resendSignUp(email);
};

export const forgotPassword = (email: string) => {
  return cognitoClient.forgotPassword(email);
};

export const forgotPasswordSubmit = (
  email: string,
  code: string,
  password: string
) => {
  return cognitoClient.forgotPasswordSubmit(email, code, password);
};

export const login = (email: string, password: string) => {
  if (Boolean(cognitoClient.getCurrentUser())) {
    throw new Error("You are already logged in.");
  }

  return cognitoClient.signIn(email, password);
};

export const logout = () => {
  if (!Boolean(cognitoClient.getCurrentUser())) {
    throw new Error("You are already logged out.");
  }

  return cognitoClient.signOut();
};

export const refreshToken = () => {
  return cognitoClient.refreshToken();
};

export const getAccessToken = async () => {
  const session = await cognitoClient.getCurrentUserSession();
  if (!session) return null;

  return session.getAccessToken().getJwtToken();
};

export const getUserGroups = async () => {
  const groups = await getDataFromIdToken("cognito:groups");
  if (!groups) return undefined;

  return groups;
};

export const getAuthenticatedUser = () => {
  return cognitoClient.getCurrentUser();
};

const getDataFromIdToken = async (key: string) => {
  const session = await cognitoClient.getCurrentUserSession();
  if (!session) return null;

  return session.getIdToken().decodePayload()[key];
};

http.setAccessToken(getAccessToken());
