import React from "react";

interface ButtonProps {
  title: string;
  type?: "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ title, type = "submit" }) => {
  return (
    <button type={type} className={`btn btn-primary ml-1`}>
      {title}
    </button>
  );
};

export default Button;
