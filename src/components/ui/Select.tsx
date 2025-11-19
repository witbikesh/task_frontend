import type { ReactNode, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  children,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {children}
      </select>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};
