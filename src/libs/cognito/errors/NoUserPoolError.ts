import { CognitoErrorTypes } from "../types";
import { CognitoError } from "./CognitoError";

export class NoUserPoolError extends CognitoError {
  constructor(type: CognitoErrorTypes) {
    super(type);
    this.name = "NoUserPoolError";
  }
}
