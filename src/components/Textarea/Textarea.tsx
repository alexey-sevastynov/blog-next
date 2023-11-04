import React from "react";
import styles from "./textarea.module.scss";

import { ITextareaProps } from "./ITextareaPropos.interface";

const Textarea: React.FC<ITextareaProps> = ({ children, ...props }) => {
  return (
    <div className={styles.textarea}>
      <label>{children}</label>
      <textarea {...props} />
    </div>
  );
};

export default Textarea;
