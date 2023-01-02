import { setLocale } from "yup";
import { LocaleObject } from "yup/lib/locale";
import { ValidationError } from "~/types/ValidationError";

const validationErrorBuilder = (
  key: string,
  values?: Record<string, unknown>
): ValidationError => {
  const res = {
    key,
    values,
  } satisfies ValidationError;
  console.log("validationErrorBuilder", res);
  return res;
};

const locale = {
  mixed: {
    default: validationErrorBuilder("validations:invalid"),
    required: validationErrorBuilder("validations:required"),
  },
  string: {
    email: validationErrorBuilder("validations:email"),
    min: ({ min }) => validationErrorBuilder("validations:stringMin", { min }),
    max: ({ max }) => validationErrorBuilder("validations:stringMax", { max }),
  },
} satisfies LocaleObject;

setLocale(locale);
