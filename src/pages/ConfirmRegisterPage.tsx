import {
  ConfirmRegisterContent,
  PreventAuth,
} from "../features/authentication";

export const ConfirmRegisterPage = () => {
  return (
    <PreventAuth redirectTo="/home">
      <ConfirmRegisterContent />
    </PreventAuth>
  );
};
