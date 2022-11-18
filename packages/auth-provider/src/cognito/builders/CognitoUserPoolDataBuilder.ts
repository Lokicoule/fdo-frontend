import { ICognitoUserPoolData } from "amazon-cognito-identity-js";

export class CognitoUserPoolDataBuilder {
  private data: ICognitoUserPoolData = {
    UserPoolId: "",
    ClientId: "",
  };

  public withUserPoolId(id: string): CognitoUserPoolDataBuilder {
    this.data.UserPoolId = id;
    return this;
  }

  public withClientId(id: string): CognitoUserPoolDataBuilder {
    this.data.ClientId = id;
    return this;
  }

  public build(): ICognitoUserPoolData {
    return this.data;
  }
}
