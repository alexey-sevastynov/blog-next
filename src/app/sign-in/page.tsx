"use client";

import React, { FormEvent } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInWindow = () => {
  const session = useSession();
  const router = useRouter();

  console.log(session);

  if (session.status == "loading") {
    return <p>Loading</p>;
  }
  if (session.status == "authenticated") {
    router?.push("/user");
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    if (emailInput && passwordInput) {
      const email = emailInput.value;
      const password = passwordInput.value;

      signIn("credentials", { email, password });
    }
  };

  return (
    <section className={styles.signIn}>
      <form className={styles.signInWindow} onSubmit={handleSubmit}>
        <h2 className={styles.title}>SIGN IN</h2>
        <div className={styles.inputs}>
          <Input placeholder="email" type="email" name="email" required>
            input your email:
          </Input>
          <Input
            placeholder="password"
            type="password"
            name="password"
            required
          >
            input your password:
          </Input>
        </div>

        <footer className={styles.btns}>
          <Link href={"/"}>
            <Btn style={{ backgroundColor: COLORS.yellow }} type="button">
              back
            </Btn>
          </Link>

          <Btn
            style={{ backgroundColor: COLORS.red, color: COLORS.white }}
            type="submit"
          >
            sign in
          </Btn>
        </footer>
      </form>
    </section>
  );
};

export default SignInWindow;
