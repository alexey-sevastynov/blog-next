"use client";

import React, { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Textarea from "@/components/Textarea/Textarea";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [users, setUsers] = useState<any>([]);
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args)
      .then((res) => res.json())
      .then((data) => setUsers([...data]));
  const { data, mutate, error, isLoading } = useSWR(`/api/users`, fetcher);

  const currentUser = users.find(
    (user: any) => user.email === session.data?.user?.email
  );
  const currentSexPerson = currentUser && currentUser.sex;

  if (session.status == "loading") {
    return <p>Loading</p>;
  }
  if (session.status == "unauthenticated") {
    router?.push("/");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descInput = form.elements.namedItem("desc") as HTMLInputElement;
    const imageInput = form.elements.namedItem("img") as HTMLInputElement;

    try {
      if (titleInput && descInput && imageInput) {
        const title = titleInput.value;
        const desc = descInput.value;
        const image = imageInput.value;

        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc,
            image,
            sex: currentSexPerson,
            userPhoto: session.data?.user?.image,
            userName: session.data?.user?.name,
            email: session.data?.user?.email,
          }),
        }).finally(() => {
          mutate();
          //   e.target.reset();
        });
      }
    } catch (error) {}
  };

  return (
    <div className={styles.create}>
      <form className="container" onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Post</h2>

        <div className={styles.inputs}>
          <Input placeholder="title..." type="text" name="title">
            input title
          </Input>
          <Textarea placeholder="description..." type="text" name="desc">
            input description
          </Textarea>
          <Input placeholder="URL image..." type="text" name="img">
            input URL image
          </Input>
        </div>

        <div className={styles.btns}>
          <Link href={"/user"}>
            <Btn type="button" style={{ backgroundColor: COLORS.yellow }}>
              back
            </Btn>
          </Link>

          <Btn
            type="submit"
            style={{ backgroundColor: COLORS.violet, color: COLORS.white }}
          >
            create
          </Btn>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
