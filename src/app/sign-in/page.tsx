"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import Button from "@/components/Button/Button";

const SignInWindow = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  if (session.status == "loading") {
    return <p>Loading</p>;
  }
  if (session.status == "authenticated") {
    router?.push("/user");
  }

  const callbackUrl = searchParams.get("callbackUrl") || "/sign-in";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    if (emailInput && passwordInput) {
      const email = emailInput.value;
      const password = passwordInput.value;
      try {
        setLoading(true);
        setFormValues({ email: "", password: "" });
        const res = await signIn("credentials", {
          redirect: false,
          email: formValues.email,
          password: formValues.password,
          callbackUrl,
        });
        signIn;
        setLoading(false);

        if (!res?.error) {
          router.push(callbackUrl);
        } else {
          setError("Invalid email or password. Try again. ");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <section className={styles.signIn}>
      <form className={styles.signInWindow} onSubmit={handleSubmit}>
        <h2 className={styles.title}>SIGN IN</h2>
        <div className={styles.inputs}>
          <Input
            placeholder="email"
            value={formValues.email}
            onChange={handleChange}
            type="email"
            name="email"
            required
          >
            input your email:
          </Input>
          <Input
            placeholder="password"
            value={formValues.password}
            onChange={handleChange}
            type="password"
            name="password"
            required
          >
            input your password:
          </Input>
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
            style={{ backgroundColor: COLORS.red, color: COLORS.white }}
            btnSmall
            type="submit"
          >
            {loading ? "loading..." : "sign in"}
          </Button>
        </footer>
      </form>
    </section>
  );
};

export default SignInWindow;
