import React from "react";
import styles from "./error-mesage.module.scss";
import { IErrorMessageProps } from "./IErrorMessageProps.interface";

const ErrorMessage: React.FC<IErrorMessageProps> = ({ children }) => {
  return <p className={styles.errorMessage}>{children}</p>;
};

export default ErrorMessage;
