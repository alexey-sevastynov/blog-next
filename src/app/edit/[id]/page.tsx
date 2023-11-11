"use client";

import React, { useState, useEffect, FormEvent } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";

import { COLORS } from "@/constants/colors";
import Textarea from "@/components/Textarea/Textarea";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { UploadButton } from "@/utils/uploadthing";
import { UploadFileResponse } from "uploadthing/client";

const CreatePost = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`, fetcher);

  const [image, setImage] = useState<UploadFileResponse[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    imageUrl: "",
  });

  const uploadImageMessage = (
    <p className={styles.success}>
      our url:{" "}
      <Link href={formData?.imageUrl} target="_blank">
        {formData?.imageUrl}
      </Link>
    </p>
  );

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

    try {
      if (descInput) {
        const title = titleInput.value;
        const desc = descInput.value;

        await fetch(`/api/posts/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
            desc,
            image: image[0]?.fileUrl,
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
        imageUrl: data.image || image[0]?.fileUrl,
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

          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button({ ready, isUploading }) {
                return {
                  color: COLORS.white,
                  ...(ready && { backgroundColor: COLORS.violet }),
                  ...(isUploading && { backgroundColor: COLORS.red }),
                };
              },
              allowedContent: {
                color: COLORS.white,
              },
            }}
            content={{
              button({ ready }) {
                if (ready) return <div>Update Image</div>;

                return "Getting ready...";
              },
              allowedContent({ ready, fileTypes, isUploading }) {
                if (!ready) return "Checking what you allow";
                if (isUploading) return "Seems like stuff is uploading";
                return `max size file 8MB`;
              },
            }}
            onClientUploadComplete={async (res) => {
              if (res) {
                const json = await JSON.stringify(res);

                setImage(res);

                await fetch("/api/uploadthing", {
                  method: "DELETE",
                  body: JSON.stringify({
                    url: formData.imageUrl,
                  }),
                }).finally(() => {
                  setFormData({
                    ...formData,
                    imageUrl: res[0].fileUrl,
                  });
                });

                console.log(json);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {uploadImageMessage}

          <p>data.image </p>
        </div>

        <div className={styles.btns}>
          <Link href={"/user"}>
            <Button
              type="button"
              style={{ backgroundColor: COLORS.yellow }}
              btnSmall
            >
              back
            </Button>
          </Link>

          <Button
            type="submit"
            style={{ backgroundColor: COLORS.violet, color: COLORS.white }}
            btnSmall
          >
            edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
