export enum CognitoErrorTypes {
  NoConfig = "noConfig",
  MissingAuthConfig = "missingAuthConfig",
  EmptyUsername = "emptyUsername",
  EmptyPassword = "emptyPassword",
  EmptyCode = "emptyCode",
  Default = "default",
}

export type CognitoErrorMessages = {
  [key in CognitoErrorTypes]: CognitoErrorMessage;
};

export interface CognitoErrorMessage {
  message: string;
}
