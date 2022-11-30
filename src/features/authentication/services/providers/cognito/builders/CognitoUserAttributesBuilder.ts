import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export class CognitoUserAttributesBuilder {
  private attributes: CognitoUserAttribute[] = [];

  public add(name: string, value: string): CognitoUserAttributesBuilder {
    this.attributes.push(
      new CognitoUserAttribute({ Name: name, Value: value })
    );
    return this;
  }

  public build(): CognitoUserAttribute[] {
    return this.attributes;
  }

  public buildFromObject(obj: Record<string, string>): CognitoUserAttribute[] {
    Object.keys(obj).forEach((key) => {
      this.add(key, obj[key]);
    });
    return this.attributes;
  }
}
