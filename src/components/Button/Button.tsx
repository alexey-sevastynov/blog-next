import React from "react";
import { IButtonProps } from "./IButtonProps.interface";
import styles from "./button.module.scss";
import Image from "next/image";

const Button: React.FC<IButtonProps> = ({
  children,
  iconSrc,
  btnSmall,
  ...rest
}) => {
  const size = btnSmall ? 16 : 30;
  const styleBtnSmall = `${styles.btnSmall}  ${
    iconSrc ? styles.btnSmallWithIcon : ""
  }`;

  return (
    <button {...rest} className={btnSmall ? styleBtnSmall : styles.button}>
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="icon.png"
          width={size}
          height={size}
          className={btnSmall ? styles.iconSmall : styles.icon}
        />
      )}

      {children}
    </button>
  );
};

export default Button;
