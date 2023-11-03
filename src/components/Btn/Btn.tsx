import React from "react";
import styles from "./btn.module.scss";
import { IButtonProps } from "../Button/IButtonProps.interface";

const Btn: React.FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.btn}>
      {children}
    </button>
  );
};

export default Btn;
