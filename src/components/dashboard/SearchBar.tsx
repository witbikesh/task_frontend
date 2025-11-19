import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
