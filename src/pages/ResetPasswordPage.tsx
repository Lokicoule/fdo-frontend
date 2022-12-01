import { ResetPasswordContent, PreventAuth } from "../features/authentication";

export const ResetPasswordPage = () => {
  return (
    <PreventAuth redirectTo="/home">
      <ResetPasswordContent />
    </PreventAuth>
  );
};
