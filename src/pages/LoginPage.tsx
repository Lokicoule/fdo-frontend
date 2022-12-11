import { LoginContent, PreventAuth } from "~/features/authentication";

export const LoginPage = () => {
  return (
    <PreventAuth redirectTo="/home">
      <LoginContent />
    </PreventAuth>
  );
};
