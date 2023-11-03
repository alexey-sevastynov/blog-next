import React from "react";
import styles from "./input.module.scss";
import { IInputProps } from "./IInputProps.interface";

const Input: React.FC<IInputProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.input}>
      <label>{children}</label>
      <input {...rest} />
    </div>
  );
};

export default Input;
