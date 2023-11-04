"use client";

import React from "react";
import styles from "./navbar.module.scss";
import { COLORS } from "@/constants/colors";
import Btn from "../Btn/Btn";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router?.push("/");
  }
  return (
    <div className={styles.nav}>
      <div className="container">
        <nav>
          <p>
            <b>User:</b> {session.data?.user?.name}
          </p>

          <div className={styles.btns}>
            <Btn style={{ backgroundColor: COLORS.yellow }}>Crated Post</Btn>
            <Btn
              onClick={() => signOut()}
              style={{ backgroundColor: COLORS.red, color: COLORS.white }}
            >
              Sign Out
            </Btn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
