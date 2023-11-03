import React from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Link from "next/link";

const SignInWindow = () => {
  return (
    <section className={styles.signIn}>
      <form className={styles.signInWindow}>
        <h2 className={styles.title}>SIGN IN</h2>
        <div className={styles.inputs}>
          <Input placeholder="email" type="email" required>
            input your email:
          </Input>
          <Input placeholder="password" type="password" required>
            input your password:
          </Input>
        </div>

        <footer className={styles.btns}>
          <Link href={"/"}>
            <Btn style={{ backgroundColor: COLORS.yellow }} type="button">
              back
            </Btn>
          </Link>

          <Btn style={{ backgroundColor: COLORS.red, color: COLORS.white }}>
            sign in
          </Btn>
        </footer>
      </form>
    </section>
  );
};

export default SignInWindow;
