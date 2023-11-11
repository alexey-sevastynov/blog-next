"use client";

import PostUser from "@/components/PostUser/PostUser";
import { getDateToString } from "@/utils/getDateToString";
import styles from "./page.module.scss";

import React from "react";
import useSWR from "swr";
import { BeatLoader } from "react-spinners";
import Confirm from "@/components/Confirm/Confirm";
import { useGlobalContext } from "../Context/store";
import { signOut } from "next-auth/react";

const User = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  const {
    isLogoutConfirmationDialogOpen,
    setIsLogoutConfirmationDialogOpen,
    isDeletePostConfirmationDialogOpen,
    setIsDeletePostConfirmationDialogOpen,
    idPostDelete,
  } = useGlobalContext();

  const deletePost = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      const urlValue = await data.find((item: IPost) => item._id === id).image;
      if (urlValue) {
        await fetch("/api/uploadthing", {
          method: "DELETE",
          body: JSON.stringify({
            url: urlValue,
          }),
        });
      }

      mutate();
      setIsDeletePostConfirmationDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loading = <BeatLoader className={styles.center} color="#6E3BD9" />;
  return (
    <div className={styles.users}>
      {data
        ? data.map((item: IPost) => (
            <PostUser
              _id={item._id}
              key={item._id}
              userName={item.userName}
              email={item.email}
              subtitle={item.desc}
              title={item.title}
              date={getDateToString(item.createdAt)}
              image={item.image}
              sex={item.sex}
              userPhoto={item.userPhoto}
            />
          ))
        : loading}
      {isLogoutConfirmationDialogOpen && (
        <div className={styles.confirmWindow}>
          <Confirm
            btnActionYes={() => signOut()}
            btnActionNo={() => setIsLogoutConfirmationDialogOpen(false)}
          >
            You will be redirected to the login page.
          </Confirm>
        </div>
      )}

      {isDeletePostConfirmationDialogOpen && (
        <div className={styles.confirmWindow}>
          <Confirm
            btnActionYes={() => deletePost(idPostDelete)}
            btnActionNo={() => setIsDeletePostConfirmationDialogOpen(false)}
          >
            Do you really want to delete the post?
          </Confirm>
        </div>
      )}
    </div>
  );
};

export default User;
