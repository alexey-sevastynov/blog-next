import React from "react";
import styles from "./confirm.module.scss";
import { Image } from "next/dist/client/image-component";
import Button from "../Button/Button";
import { COLORS } from "@/constants/colors";
import { IConfirmProps } from "./IConfirmProps.interface";

const Confirm = ({ children, btnActionYes, btnActionNo }: IConfirmProps) => {
  return (
    <div className={styles.confirm}>
      <Image src="/warning.svg" alt="warning" width={138} height={137} />

      <h4 className={styles.title}>Are you sure ?</h4>
      <p className={styles.subtitle}>{children}</p>

      <div className={styles.btns}>
        <Button onClick={btnActionNo} btnSmall>
          NO
        </Button>
        <Button
          onClick={btnActionYes}
          style={{ backgroundColor: COLORS.yellow }}
          btnSmall
        >
          YES
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
