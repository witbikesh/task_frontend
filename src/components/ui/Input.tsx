import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        {...props}
        className="block w-full rounded-lg border border-gray-200 px-4 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
};

export { Input };
