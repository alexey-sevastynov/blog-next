import React from "react";
import { IButtonProps } from "./IButtonProps.interface";
import styles from "./button.module.scss";
import Image from "next/image";

const Button: React.FC<IButtonProps> = ({ children, iconSrc, ...rest }) => {
  return (
    <button {...rest} className={styles.button}>
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="icon.png"
          width={30}
          height={30}
          className={styles.icon}
        />
      )}

      {children}
    </button>
  );
};

export default Button;
