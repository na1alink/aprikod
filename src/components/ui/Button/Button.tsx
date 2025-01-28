import React from "react";
import styles from "./Button.module.scss";

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
  const variantClass = styles[`button--${variant}`] || "";
  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
