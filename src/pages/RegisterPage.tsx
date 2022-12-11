import { RegisterContent, PreventAuth } from "~/features/authentication";

export const RegisterPage = () => {
  return (
    <PreventAuth redirectTo="/home">
      <RegisterContent />
    </PreventAuth>
  );
};
