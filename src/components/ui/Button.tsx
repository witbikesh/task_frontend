import React from "react";

type Variant = "solid" | "outline" | "destructive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  className = "",
  fullWidth = true,
  ...props
}) => {
  const base = `py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer ${
    fullWidth ? "w-full" : "w-auto"
  }`;

  const styles: Record<Variant, string> = {
    solid: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button {...props} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export { Button };
