import {
  CookieStorage,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";

export class CognitoUserPoolDataBuilder {
  private data: ICognitoUserPoolData = {
    UserPoolId: "",
    ClientId: "",
    Storage: undefined,
  };

  public withUserPoolId(id: string): CognitoUserPoolDataBuilder {
    this.data.UserPoolId = id;
    return this;
  }

  public withClientId(id: string): CognitoUserPoolDataBuilder {
    this.data.ClientId = id;
    return this;
  }

  public withCookieStorage(
    domain: string,
    secure: boolean
  ): CognitoUserPoolDataBuilder {
    this.data.Storage = new CookieStorage({ domain, secure });
    return this;
  }

  public build(): ICognitoUserPoolData {
    return this.data;
  }
}
