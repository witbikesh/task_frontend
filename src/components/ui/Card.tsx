import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 flex flex-col justify-between ${className}`}
    >
      {children}
    </div>
  );
};
