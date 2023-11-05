"use client";

import React, { useState, useEffect, FormEvent } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Textarea from "@/components/Textarea/Textarea";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const CreatePost = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`, fetcher);

  console.log(data);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

        await fetch(`/api/posts/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
            desc,
            image,
          }),
        }).finally(() => {
          form.reset();
          router?.push("/user");
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        desc: data.desc || "",
        image: data.image || "",
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.edit}>
      <form className="container" onSubmit={handleSubmit}>
        <h2 className={styles.title}>Edit Post</h2>

        <div className={styles.inputs}>
          <Input
            placeholder="title..."
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          >
            input title
          </Input>
          <Textarea
            placeholder="description..."
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
          >
            input description
          </Textarea>
          <Input
            placeholder="URL image..."
            type="text"
            name="img"
            value={formData.image}
            onChange={handleInputChange}
          >
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
            edit
          </Btn>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
