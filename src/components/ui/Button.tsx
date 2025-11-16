import React from "react";

type Variant = "solid" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  ...props
}) => {
  const base =
    "w-full py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer";

  const styles: Record<Variant, string> = {
    solid: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button {...props} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export { Button };
