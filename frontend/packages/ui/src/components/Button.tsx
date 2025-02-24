import React from "react";

export interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="px-4 py-2 bg-red-500 text-white rounded">
      {label}
    </button>
  );
};

export default Button;
