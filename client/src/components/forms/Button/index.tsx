import React, { SyntheticEvent } from "react";

interface ButtonProps {
  title: string;
  type?: "submit" | "reset";
  onClick?: (e: SyntheticEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type = "submit",
  ...props
}) => {
  return (
    <button type={type} className={`btn btn-primary ml-1`} {...props}>
      {title}
    </button>
  );
};

export default Button;
