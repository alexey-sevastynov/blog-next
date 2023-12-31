"use client";

import React, { ChangeEvent, useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";

import { COLORS } from "@/constants/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import Button from "@/components/Button/Button";

const RegisterWindow = () => {
  const session = useSession();
  const router = useRouter();

  const [error, setError] = useState(null);
  const [sex, setSex] = useState("male");

  if (session.status === "authenticated") {
    router?.push("/user");
  }

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSex(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("userName") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({ name, email, password, sex: sex }),
      });

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      res.status === 201 && router.push("/");
    } catch (error: any) {
      setError(error);
      console.log("error");
    }
  };

  return (
    <section className={styles.register}>
      <form className={styles.registerWindow} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create profile</h2>
        <div className={styles.inputs}>
          <Input placeholder="user name" type="text" name="userName" required>
            input your full name:
          </Input>
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

          <div className={styles.inputsRadio}>
            <div className={styles.inputRadio}>
              <input
                type="radio"
                id="male"
                name="sex"
                value="male"
                checked={sex === "male"}
                onChange={handleOptionChange}
              />
              <label htmlFor="male">male</label>
            </div>
            <div className={styles.inputRadio}>
              <input
                type="radio"
                id="female"
                name="sex"
                value="female"
                checked={sex === "female"}
                onChange={handleOptionChange}
              />
              <label htmlFor="female">female</label>
            </div>
          </div>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <footer className={styles.btns}>
          <Link href={"/"}>
            <Button
              style={{ backgroundColor: COLORS.yellow }}
              type="button"
              btnSmall
            >
              back
            </Button>
          </Link>

          <Button
            type="submit"
            style={{ backgroundColor: COLORS.violet, color: COLORS.white }}
            btnSmall
          >
            create
          </Button>
        </footer>
      </form>
    </section>
  );
};

export default RegisterWindow;
