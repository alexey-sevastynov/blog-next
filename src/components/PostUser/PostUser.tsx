"use client";

import React from "react";
import styles from "./post-user.module.scss";
import Image from "next/image";
import { IPostUserProps } from "./IPostUserProps.interface";
import { useSession } from "next-auth/react";
import Btn from "../Btn/Btn";
import { COLORS } from "@/constants/colors";
import Link from "next/link";
import useSWR from "swr";
import { userAvatar } from "@/utils/userAvatar";

const PostUser: React.FC<IPostUserProps> = ({
  _id,
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

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  const handleDelete = async (id: string) => {
    if (confirm("are you want to delete post?")) {
      try {
        await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        mutate();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.post}>
      {session.data?.user?.email === email && (
        <div className={styles.btns}>
          <Link href={`/edit/${_id}`}>
            <Btn
              style={{
                backgroundColor: COLORS.violet,
                color: COLORS.white,
                borderRadius: "10px 0px 0px 0px",
              }}
            >
              edit
            </Btn>
          </Link>

          <Btn
            id="btn"
            onClick={() => handleDelete(_id)}
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
        <Image
          src={userAvatar(sex, userPhoto)}
          alt="avatar"
          width={80}
          height={80}
        />
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
        <Link href={"/create"}>
          <Btn
            style={{
              backgroundColor: COLORS.yellow,
            }}
          >
            Create Post
          </Btn>
        </Link>
      </div>
    </div>
  );
};

export default PostUser;
