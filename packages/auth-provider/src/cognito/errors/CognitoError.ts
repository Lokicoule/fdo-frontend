import { CognitoErrorStrings } from "../constants/CognitoErrorStrings";
import { CognitoErrorMessages, CognitoErrorTypes } from "../types/CognitoTypes";

export class CognitoError extends Error {
  constructor(type: CognitoErrorTypes) {
    const { message } = cognitoErrorMessages[type];
    super(message);

    this.name = "CognitoError";
  }
}

export const cognitoErrorMessages: CognitoErrorMessages = {
  noConfig: {
    message: CognitoErrorStrings.DEFAULT_MSG,
  },
  missingAuthConfig: {
    message: CognitoErrorStrings.DEFAULT_MSG,
  },
  emptyUsername: {
    message: CognitoErrorStrings.EMPTY_USERNAME,
  },
  emptyPassword: {
    message: CognitoErrorStrings.EMPTY_PASSWORD,
  },
  emptyCode: {
    message: CognitoErrorStrings.EMPTY_CODE,
  },
  default: {
    message: CognitoErrorStrings.DEFAULT_MSG,
  },
};
