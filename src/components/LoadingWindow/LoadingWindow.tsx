import React from "react";
import styles from "./loading-window.module.scss";
import { BeatLoader } from "react-spinners";

const LoadingWindow = () => {
  return (
    <section className={styles.loadingWindow}>
      <main className={styles.loadingBlock}>
        <BeatLoader color="#EFEFEF" />
      </main>
    </section>
  );
};

export default LoadingWindow;
