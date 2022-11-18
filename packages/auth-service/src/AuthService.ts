import { ICognitoUserPoolData } from "amazon-cognito-identity-js";
import { CognitoUserAttributesBuilder } from "./providers/cognito/builders/CognitoUserAttributesBuilder";
import { CognitoUserPoolDataBuilder } from "./providers/cognito/builders/CognitoUserPoolDataBuilder";
import { CognitoClient } from "./providers/cognito/cognitoClient";

export interface BroadcastMessage {
  type: string;
  payload: boolean;
}

type BaseAuthOptions<TData = any> = {
  onCompleted?: (data: TData) => void;
  onError?: (error: Error) => void;
};

const cognitoConfig = {
  poolData: {
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  } as ICognitoUserPoolData,
};

class AuthService {
  private cognitoClient: CognitoClient;

  constructor() {
    console.log(cognitoConfig);
    this.cognitoClient = new CognitoClient(
      new CognitoUserPoolDataBuilder()
        .withClientId(cognitoConfig.poolData.ClientId)
        .withUserPoolId(cognitoConfig.poolData.UserPoolId)
        .build()
    );
    console.log("AuthService constructor");
  }

  public async signUp(email: string, password: string) {
    if (Boolean(this.cognitoClient.getMe())) {
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
    try {
      await this.cognitoClient.resendSignUp(email);
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  public async forgotPassword(email: string) {
    try {
      const t = await this.cognitoClient.forgotPassword(email);
      console.log(t);
    } catch (error) {
      console.log(error);
    }
  }

  public async forgotPasswordSubmit(
    email: string,
    code: string,
    password: string
  ) {
    try {
      await this.cognitoClient.forgotPasswordSubmit(email, code, password);
    } catch (error) {
      console.log("error submit forgot password code: ", error);
    }
  }

  public async signIn(email: string, password: string): Promise<string | null> {
    if (Boolean(this.cognitoClient.getMe())) {
      throw new Error("You are already logged in.");
    }
    const user = await this.cognitoClient.signIn(email, password);

    if (user) {
      return user.getAccessToken().getJwtToken();
    }

    return null;
  }

  public async signOut() {
    if (!Boolean(this.cognitoClient.getMe())) {
      throw new Error("You are already logged out.");
    }
    console.log("signOut");
    await this.cognitoClient.signOut();
  }

  public async getToken(): Promise<string | null> {
    const user = await this.cognitoClient.getTokens();
    if (user) {
      return user.getAccessToken().getJwtToken();
    }
    return null;
  }

  public getCurrentUser() {
    return this.cognitoClient.getMe()?.getSignInUserSession();
  }
}

export const authService = new AuthService();
