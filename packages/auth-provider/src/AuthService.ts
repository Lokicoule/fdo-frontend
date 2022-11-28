import { ICognitoUserPoolData } from "amazon-cognito-identity-js";
import { CognitoUserAttributesBuilder } from "./cognito/builders/CognitoUserAttributesBuilder";
import { CognitoUserPoolDataBuilder } from "./cognito/builders/CognitoUserPoolDataBuilder";
import { CognitoClient } from "./cognito/cognitoClient";

export interface BroadcastMessage {
  type: string;
  payload: boolean;
}

const cognitoConfig = {
  poolData: {
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  } as ICognitoUserPoolData,
};

class AuthService {
  private cognitoClient: CognitoClient;

  constructor() {
    this.cognitoClient = new CognitoClient(
      new CognitoUserPoolDataBuilder()
        .withClientId(cognitoConfig.poolData.ClientId)
        .withUserPoolId(cognitoConfig.poolData.UserPoolId)
        //.withCookieStorage("localhost", false) // Use cookie storage for local development
        .build()
    );
  }

  public async signUp(email: string, password: string) {
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

  public async confirmSignUp(email: string, code: string) {
    await this.cognitoClient.confirmSignUp(email, code);
  }

  public async resendConfirmationCode(email: string) {
    await this.cognitoClient.resendSignUp(email);
  }

  public async forgotPassword(email: string) {
    await this.cognitoClient.forgotPassword(email);
  }

  public async forgotPasswordSubmit(
    email: string,
    code: string,
    password: string
  ) {
    await this.cognitoClient.forgotPasswordSubmit(email, code, password);
  }

  public async signIn(email: string, password: string): Promise<string | null> {
    if (Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged in.");
    }
    const user = await this.cognitoClient.signIn(email, password);

    if (user) {
      return user.getAccessToken().getJwtToken();
    }

    return null;
  }

  public async signOut() {
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

  public getCurrentUser() {
    return this.cognitoClient.getCurrentUser();
  }

  public async getDataFromIdToken(key: string): Promise<string | null> {
    const session = await this.cognitoClient.getCurrentUserSession();
    if (!session) return null;

    return session.getIdToken().decodePayload()[key];
  }
}

export const authService = new AuthService();
