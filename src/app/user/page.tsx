"use client";

import PostUser from "@/components/PostUser/PostUser";
import { getDateToString } from "@/utils/getDateToString";
import styles from "./page.module.scss";

import React from "react";
import useSWR from "swr";
import { BeatLoader } from "react-spinners";

const User = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

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
    </div>
  );
};

export default User;
