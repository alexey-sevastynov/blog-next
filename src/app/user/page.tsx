// "use client";

import PostUser from "@/components/PostUser/PostUser";
import { getDateToString } from "@/utils/getDateToString";

import React from "react";

async function getData() {
  const res = await fetch(
    "http://localhost:3000/api/posts",
    // "https://my-app-next-alexey10031994.vercel.app/api/posts",
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
  console.log(data);

  return (
    <>
      {data.map((item: IPost) => (
        <PostUser
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
      ))}
    </>
  );
};

export default User;
