import React from "react";
import LayoutContainer from "../LayoutContainer/LayoutContainer";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <LayoutContainer className={styles.header__container}>
        <h1 className={styles.header__title}>Трекер задач</h1>
      </LayoutContainer>
    </div>
  );
};

export default Header;
