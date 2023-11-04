// "use client";

import PostUser from "@/components/PostUser/PostUser";
import { getDateToString } from "@/utils/getDateToString";

import React from "react";

async function getData() {
  const res = await fetch(
    "https://my-app-next-alexey10031994.vercel.app/api/posts",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data!");
  }

  return res.json();
}

const User = async () => {
  const data = await getData();

  return (
    <>
      {data.map((item: IPost) => (
        <PostUser
          key={item._id}
          userName={item.userName}
          subtitle={item.content}
          date={getDateToString(item.createdAt)}
          image={item.image}
          sex={item.sex}
          userPhoto={item.userPhoto}
        />
      ))}
    </>
  );
};

export default User;
