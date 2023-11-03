import React from "react";
import styles from "./or.module.scss";

const Or = () => {
  return (
    <div className={styles.or}>
      <span className={styles.firstLine} />
      <p>or</p>
      <span className={styles.lastLine} />
    </div>
  );
};

export default Or;
