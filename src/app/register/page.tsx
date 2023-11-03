import React from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Link from "next/link";

const RegisterWindow = () => {
  return (
    <section className={styles.register}>
      <form className={styles.registerWindow}>
        <h2 className={styles.title}>Create profile</h2>
        <div className={styles.inputs}>
          <Input placeholder="user name" type="user" required>
            input your full name:
          </Input>
          <Input placeholder="email" type="email" required>
            input your email:
          </Input>
          <Input placeholder="password" type="password" required>
            input your password:
          </Input>

          <div className={styles.inputsRadio}>
            <div className={styles.inputRadio}>
              <input type="radio" id="male" name="sex" value="male" checked />
              <label htmlFor="male">male</label>
            </div>
            <div className={styles.inputRadio}>
              <input type="radio" id="female" name="sex" value="female" />
              <label htmlFor="female">female</label>
            </div>
          </div>
        </div>

        <footer className={styles.btns}>
          <Link href={"/"}>
            <Btn style={{ backgroundColor: COLORS.yellow }} type="button">
              back
            </Btn>
          </Link>

          <Btn style={{ backgroundColor: COLORS.violet, color: COLORS.white }}>
            sign in
          </Btn>
        </footer>
      </form>
    </section>
  );
};

export default RegisterWindow;
