import React from "react";
import "./Button.scss";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
}) => {
  const variantClass = `button--${variant}`;
  return (
    <button
      className={`button ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
