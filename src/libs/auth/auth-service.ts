import { ICognitoUserPoolData } from "amazon-cognito-identity-js";

import { COGNITO } from "~/config";

import { CognitoClient } from "~/libs/cognito";
import { CognitoUserAttributesBuilder } from "~/libs/cognito/builders/CognitoUserAttributesBuilder";
import { CognitoUserPoolDataBuilder } from "~/libs/cognito/builders/CognitoUserPoolDataBuilder";

class AuthService {
  private cognitoClient: CognitoClient;

  constructor() {
    this.cognitoClient = new CognitoClient(
      new CognitoUserPoolDataBuilder()
        .withClientId(COGNITO.CLIENT_ID)
        .withUserPoolId(COGNITO.USER_POOL_ID)
        //.withCookieStorage("localhost", false) // Use cookie storage for local development
        .build()
    );
  }

  public async doSignUpWithEmailAndPassword(email: string, password: string) {
    if (Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged in.");
    }
    await this.cognitoClient.signUp(
      email,
      password,
      new CognitoUserAttributesBuilder().add("email", email).build(),
      new CognitoUserAttributesBuilder().build()
    );
  }

  public async doSignUpConfirmation(email: string, code: string) {
    await this.cognitoClient.confirmSignUp(email, code);
  }

  public async doSendEmailVerification(email: string) {
    await this.cognitoClient.resendSignUp(email);
  }

  public async doPasswordReset(email: string) {
    await this.cognitoClient.forgotPassword(email);
  }

  public async doSubmitPasswordReset(
    email: string,
    code: string,
    password: string
  ) {
    await this.cognitoClient.forgotPasswordSubmit(email, code, password);
  }

  public async doSignInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<string | null> {
    if (Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged in.");
    }
    const user = await this.cognitoClient.signIn(email, password);

    if (user) {
      return user.getAccessToken().getJwtToken();
    }

    return null;
  }

  public async doSignOut() {
    if (!Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged out.");
    }
    await this.cognitoClient.signOut();
  }

  public async getAccessToken(): Promise<string | null> {
    const session = await this.cognitoClient.getCurrentUserSession();
    if (!session) return null;

    return session.getAccessToken().getJwtToken();
  }

  public async getIdToken(): Promise<string | null> {
    const session = await this.cognitoClient.getCurrentUserSession();
    if (!session) return null;

    return session.getIdToken().getJwtToken();
  }

  public getCurrentUser() {
    return this.cognitoClient.getCurrentUser();
  }

  public async getDataFromIdToken(key: string): Promise<any | null> {
    const session = await this.cognitoClient.getCurrentUserSession();
    if (!session) return null;

    return session.getIdToken().decodePayload()[key];
  }

  public async getGroups(): Promise<string[] | undefined> {
    const groups = await this.getDataFromIdToken("cognito:groups");
    if (!groups) return undefined;

    return groups;
  }

  public async refreshToken() {
    await this.cognitoClient.refreshToken();
  }
}

export const authService = new AuthService();
