import React from "react";
import { useField } from "formik";

import { Input } from "../ui";

interface FormikInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}) => {
  const [field, meta] = useField(name);

  return (
    <Input
      {...field}
      label={label}
      type={type}
      placeholder={placeholder}
      required={required}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  );
};
