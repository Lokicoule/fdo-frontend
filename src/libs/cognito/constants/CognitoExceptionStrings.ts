export enum CognitoExceptionsStrings {
  NotAuthorizedException = "Adresse email ou mot de passe incorrect.",
  UserNotConfirmedException = "Merci de confirmer votre adresse mail afin de terminer votre inscription.",
  UsernameExistsException = "Un compte à déjà été crée à partir de cette adresse email.",
  UserNotFoundException = "Cette adresse mail n'est rattachée à aucun compte.",
  InvalidParameterException = "Cette adresse mail n'est rattachée à aucun compte ou n'a pas encore été activée.",
  LimitExceededException = "Nombre de tentatives maximales atteintes. Veuillez réessayer dans un moment.",
  CodeDeliveryFailureException = "Un problème est intervenu lors de l'envoi du code.",
  CodeMismatchException = "Code de vérification erroné, merci de recommencer.",
}
