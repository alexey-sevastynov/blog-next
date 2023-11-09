"use client";

import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";
import { COLORS } from "../../../constants/colors";
import Or from "../../../components/Or/Or";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const AuthWindow = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return (
      <section className={styles.auth}>
        <main className={styles.authWindow}>
          <BeatLoader color="#EFEFEF" />
        </main>
      </section>
    );
  }

  if (session.status === "authenticated") {
    router?.push("/user");
  }

  return (
    <section className={styles.auth}>
      <main className={styles.authWindow}>
        <header className={styles.authRegister}>
          <Button
            iconSrc={"/google.png"}
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            Register via google
          </Button>
          <Or />
          <Link href={"/register"}>
            <Button
              style={{ fontWeight: "700", background: COLORS.yellow }}
              iconSrc={"/sign-up.svg"}
            >
              Create profile
            </Button>
          </Link>
        </header>
        <footer className={styles.authLogin}>
          <p>Do you have a profile ?</p>
          <Link href={"/sign-in"}>
            <Button
              style={{
                border: `1px solid ${COLORS.white_main}`,
                background: "none",
                color: COLORS.yellow,
              }}
              iconSrc={"/sign-in.svg"}
            >
              SIGN IN
            </Button>
          </Link>
        </footer>
      </main>
    </section>
  );
};

export default AuthWindow;
