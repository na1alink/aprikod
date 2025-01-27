import React from "react";
import "./LayoutContainer.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={`container ${className || ""}`}>{children}</div>;
};

export default LayoutContainer;
