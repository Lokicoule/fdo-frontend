import { setLocale } from "yup";
import { LocaleObject } from "yup/lib/locale";
import { ValidationError } from "~/types/ValidationError";

const validationErrorBuilder = (
  key: string,
  values?: Record<string, unknown>
): ValidationError =>
  ({
    key,
    values,
  } satisfies ValidationError);

const locale = {
  mixed: {
    default: validationErrorBuilder("validations:invalid"),
    required: validationErrorBuilder("validations:required"),
    oneOf: ({ values }) =>
      validationErrorBuilder("validations:oneOf", { values }),
    notOneOf: ({ values }) =>
      validationErrorBuilder("validations:notOneOf", { values }),
    notType: ({ type }) =>
      validationErrorBuilder("validations:notType", { type }),
  },
  string: {
    email: validationErrorBuilder("validations:email.invalid"),
    min: ({ min }) =>
      validationErrorBuilder("validations:string.min", { limit: min }),
    max: ({ max }) =>
      validationErrorBuilder("validations:string.max", { limit: max }),
  },
} satisfies LocaleObject;

setLocale(locale);
