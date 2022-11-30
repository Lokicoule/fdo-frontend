import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserData,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import { CognitoError } from "./errors/CognitoError";
import { NoUserPoolError } from "./errors/NoUserPoolError";
import { CognitoErrorTypes } from "./types/CognitoTypes";

interface ICognitoClient {
  getCurrentUser(): CognitoUser | null;
  getCurrentUserSession(): Promise<CognitoUserSession | null>;
  signOut(): Promise<any>;
  signUp(
    username: string,
    password: string,
    userAttributes: CognitoUserAttribute[],
    validationData: CognitoUserAttribute[]
  ): Promise<any>;
  confirmSignUp(username: string, code: string): Promise<any>;
  resendSignUp(username: string): Promise<any>;
  forgotPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<string>;
  forgotPassword(username: string): Promise<any>;
  signIn(username: string, password: string): Promise<CognitoUser | any>;
}

export class CognitoClient implements ICognitoClient {
  private userPool: CognitoUserPool;
  private pendingSignIn: ReturnType<CognitoClient["signInWithPassword"]> | null;
  private poolData: ICognitoUserPoolData;

  constructor(data: ICognitoUserPoolData) {
    console.log("CognitoClient constructor", data);
    this.userPool = new CognitoUserPool(data);
    this.pendingSignIn = null;
    this.poolData = data;
  }

  public getCurrentUser(): CognitoUser | null {
    return this.userPool.getCurrentUser();
  }

  public getCurrentUserSession(): Promise<CognitoUserSession | null> {
    const user = this.getCurrentUser();
    if (!user) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
      user.getSession(
        (
          err: any,
          session:
            | CognitoUserSession
            | PromiseLike<CognitoUserSession | null>
            | null
        ) => {
          if (err) return reject(err);
          resolve(session);
        }
      );
    });
  }

  public async signOut(): Promise<any> {
    if (!this.userPool) return this.rejectNoUserPool();

    const user = this.userPool.getCurrentUser();
    if (!user) console.debug("no current Cognito user");

    return new Promise((resolve, reject) => {
      user?.signOut(() => {
        resolve(true);
      });
    });
  }

  public signUp(
    username: string,
    password: string,
    userAttributes: CognitoUserAttribute[],
    validationData: CognitoUserAttribute[]
  ): Promise<any> {
    if (!this.userPool) return this.rejectNoUserPool();

    if (!username) this.rejectAuthError(CognitoErrorTypes.EmptyUsername);
    if (!password) this.rejectAuthError(CognitoErrorTypes.EmptyPassword);

    return new Promise((resolve, reject) =>
      this.userPool.signUp(
        username,
        password,
        userAttributes,
        validationData,
        (err, data) => {
          console.log(data);
          err ? reject(err) : resolve(data);
        }
      )
    );
  }

  public confirmSignUp(username: string, code: string): Promise<any> {
    if (!this.userPool) return this.rejectNoUserPool();

    if (!username) return this.rejectAuthError(CognitoErrorTypes.EmptyUsername);

    if (!code) return this.rejectAuthError(CognitoErrorTypes.EmptyCode);

    const user = this.createCognitoUser(username);

    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
  }

  public resendSignUp(username: string): Promise<any> {
    if (!this.userPool) return this.rejectNoUserPool();

    if (!username) return this.rejectAuthError(CognitoErrorTypes.EmptyUsername);

    const user = this.createCognitoUser(username);
    return new Promise((resolve, reject) => {
      user.resendConfirmationCode((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public forgotPassword(username: string): Promise<any> {
    if (!this.userPool) return this.rejectNoUserPool();

    if (!username) return this.rejectAuthError(CognitoErrorTypes.EmptyUsername);

    const user = this.createCognitoUser(username);
    return new Promise((resolve, reject) => {
      user.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          console.debug("forgot password failure", err);
          reject(err);
        },
        inputVerificationCode: (data) => {
          resolve(data);
        },
      });
    });
  }

  public forgotPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<string> {
    if (!this.userPool) return this.rejectNoUserPool();

    if (!username) return this.rejectAuthError(CognitoErrorTypes.EmptyUsername);
    if (!code) return this.rejectAuthError(CognitoErrorTypes.EmptyCode);
    if (!password) return this.rejectAuthError(CognitoErrorTypes.EmptyPassword);

    const user = this.createCognitoUser(username);

    return new Promise((resolve, reject) => {
      user.confirmPassword(code, password, {
        onSuccess: (success) => {
          resolve(success);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  public signIn(
    username: string,
    password: string
  ): Promise<CognitoUserSession> {
    if (!this.userPool) return this.rejectNoUserPool();

    if (!username) return this.rejectAuthError(CognitoErrorTypes.EmptyUsername);
    if (!password) return this.rejectAuthError(CognitoErrorTypes.EmptyPassword);

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    return this.signInWithPassword(authDetails);
  }

  private signInWithPassword(
    authDetails: AuthenticationDetails
  ): Promise<CognitoUserSession | any> {
    if (this.pendingSignIn) {
      throw new Error("Pending sign-in attempt already in progress");
    }

    const user = this.createCognitoUser(authDetails.getUsername());

    this.pendingSignIn = new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (value) => {
          this.pendingSignIn = null;
          console.log(value);
          resolve(value);
        },
        onFailure: (error) => {
          this.pendingSignIn = null;
          reject(error);
        },
      });
    });

    return this.pendingSignIn;
  }

  private createCognitoUser = (username: string): CognitoUser => {
    const userData: ICognitoUserData = {
      Username: username,
      Pool: this.userPool,
      Storage: this.poolData.Storage,
    };
    return new CognitoUser(userData);
  };

  private noUserPoolErrorHandler(
    userPoolData: ICognitoUserPoolData
  ): CognitoErrorTypes {
    return userPoolData?.ClientId || userPoolData?.UserPoolId
      ? CognitoErrorTypes.MissingAuthConfig
      : CognitoErrorTypes.NoConfig;
  }

  private rejectNoUserPool() {
    const type = this.noUserPoolErrorHandler(this.poolData);
    return Promise.reject(new NoUserPoolError(type));
  }

  private rejectAuthError(type: CognitoErrorTypes) {
    return Promise.reject(new CognitoError(type));
  }
}
