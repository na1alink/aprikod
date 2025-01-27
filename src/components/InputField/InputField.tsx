import React from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onEnterPress?: () => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onEnterPress,
  placeholder,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
};

export default InputField;
