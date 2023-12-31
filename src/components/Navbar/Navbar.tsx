"use client";

import React from "react";
import styles from "./navbar.module.scss";
import { COLORS } from "@/constants/colors";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../Button/Button";
import { useGlobalContext } from "@/app/Context/store";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  const { setIsLogoutConfirmationDialogOpen } = useGlobalContext();

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
            <Link href={"/create"}>
              <Button
                style={{ backgroundColor: COLORS.yellow }}
                iconSrc="/plus.svg"
                btnSmall
              >
                Create Post
              </Button>
            </Link>

            <Button
              onClick={() => setIsLogoutConfirmationDialogOpen(true)}
              style={{ backgroundColor: COLORS.red, color: COLORS.white }}
              iconSrc="/sign-out.svg"
              btnSmall
            >
              Sign Out
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
