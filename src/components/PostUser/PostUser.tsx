"use client";

import React from "react";
import styles from "./post-user.module.scss";
import Image from "next/image";
import { IPostUserProps } from "./IPostUserProps.interface";
import { useSession } from "next-auth/react";
import Btn from "../Btn/Btn";
import { COLORS } from "@/constants/colors";

const PostUser: React.FC<IPostUserProps> = ({
  title,
  subtitle,
  image,
  userName,
  date,
  sex,
  userPhoto,
  email,
}) => {
  const session = useSession();

  const userAvatar = (sex: "male" | "female") => {
    switch (sex) {
      case "female":
        return "/woman.png";

      case "male":
        return "/man.png";

      default:
        return (
          userPhoto ||
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        );
    }
  };
  return (
    <div className={styles.post}>
      {session.data?.user?.email === email && (
        <div className={styles.btns}>
          <Btn
            style={{
              backgroundColor: COLORS.violet,
              color: COLORS.white,
              borderRadius: "10px 0px 0px 0px",
            }}
          >
            edit
          </Btn>
          <Btn
            id="btn"
            style={{
              backgroundColor: COLORS.red,
              color: COLORS.white,
              borderRadius: "0px 10px 0px 0px",
            }}
          >
            delete
          </Btn>
        </div>
      )}
      <div className={styles.userBlock}>
        <Image src={userAvatar(sex)} alt="woman" width={80} height={80} />
        <p className={styles.userName}>{userName}</p>
        <p className={styles.date}>{date}</p>
      </div>

      <div className={styles.contentMessage}>
        {title && <p className={styles.title}>{title}</p>}
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {image && (
        <div className={styles.imageBlock}>
          <Image src={image} alt="image" width={400} height={400} />
        </div>
      )}

      <div className={styles.btnMobileCreatePost}>
        <Btn
          style={{
            backgroundColor: COLORS.yellow,
          }}
        >
          Create Post
        </Btn>
      </div>
    </div>
  );
};

export default PostUser;
