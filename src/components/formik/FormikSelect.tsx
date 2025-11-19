import React from "react";
import { useField } from "formik";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  children: React.ReactNode;
}

export const FormikSelect: React.FC<Props> = ({
  label,
  children,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <select
        {...field}
        {...props}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {children}
      </select>
      {meta.touched && meta.error && (
        <span className="text-red-500 text-xs mt-1">{meta.error}</span>
      )}
    </div>
  );
};
