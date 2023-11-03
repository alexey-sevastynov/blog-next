import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";
import { COLORS } from "../../../constants/colors";
import Or from "../../../components/Or/Or";
import Link from "next/link";

const AuthWindow = () => {
  return (
    <section className={styles.auth}>
      <main className={styles.authWindow}>
        <header className={styles.authRegister}>
          <Button iconSrc={"/google.png"}>Register via google</Button>
          <Or />
          <Link href={"/register"}>
            <Button style={{ fontWeight: "700", background: COLORS.yellow }}>
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
