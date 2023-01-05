import { Box } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { AnyObjectSchema } from "yup";

import { InputField } from "./InputField";
import { SecretField } from "./SecretField";
import { SelectField } from "./SelectField";

type FormProps<TFormValues extends FieldValues> = {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  id?: string;
  onSubmit: SubmitHandler<TFormValues>;
  options?: UseFormProps<TFormValues>;
  schema?: AnyObjectSchema;
};

export function Form<
  TFormValues extends FieldValues = FieldValues,
  Schema extends AnyObjectSchema = AnyObjectSchema
>(props: FormProps<TFormValues>): JSX.Element {
  const { children, id, onSubmit, options, schema } = props;

  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && yupResolver(schema),
  });

  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(onSubmit)}
      noValidate
      id={id}
      sx={{ mt: 3 }}
    >
      {children(methods)}
    </Box>
  );
}

Form.SelectField = SelectField;
Form.InputField = InputField;
Form.SecretField = SecretField;
