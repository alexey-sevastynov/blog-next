"use client";

import PostUser from "@/components/PostUser/PostUser";
import { getDateToString } from "@/utils/getDateToString";
import styles from "./page.module.scss";

import React from "react";
import useSWR from "swr";

// async function getData() {
//   const res = await fetch(
//     "http://localhost:3000/api/posts",
//     // "https://my-app-next-alexey10031994.vercel.app/api/posts",
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("failed to fetch data!");
//   }

//   return res.json();
// }

const User = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  const loading = <p>loading...</p>;
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
