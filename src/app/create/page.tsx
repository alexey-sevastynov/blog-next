"use client";

import React, { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";

import { COLORS } from "@/constants/colors";
import Textarea from "@/components/Textarea/Textarea";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import { UploadFileResponse } from "uploadthing/client";
import Button from "@/components/Button/Button";

const CreatePost = () => {
  const session = useSession();
  const router = useRouter();

  const [users, setUsers] = useState<any>([]);
  const [image, setImage] = useState<UploadFileResponse[]>([]);

  const uploadImageMessage = image.length ? (
    <p className={styles.success}>
      Upload Complete!
      <br />
      our url:{" "}
      <Link href={image[0]?.fileUrl} target="_blank">
        {image[0]?.fileUrl}
      </Link>
    </p>
  ) : null;

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

    try {
      if (titleInput && descInput && image[0].fileUrl) {
        const title = titleInput.value;
        const desc = descInput.value;

        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc,
            image: image[0].fileUrl,
            sex: currentSexPerson,
            userPhoto: session.data?.user?.image,
            userName: session.data?.user?.name,
            email: session.data?.user?.email,
          }),
        }).finally(() => {
          mutate();
          form.reset();
          router?.push("/user");
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
            input title (not required field)
          </Input>
          <Textarea
            placeholder="description..."
            type="text"
            name="desc"
            required
          >
            input description or message* (required field!)
          </Textarea>

          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button({ ready, isUploading }) {
                return {
                  color: COLORS.white,
                  ...(ready && { backgroundColor: COLORS.violet }),
                  ...(isUploading && { backgroundColor: COLORS.yellow }),
                };
              },
              allowedContent: {
                color: COLORS.white,
              },
            }}
            content={{
              button({ ready }) {
                if (ready) return <div>Upload image</div>;

                return "Getting ready...";
              },
              allowedContent({ ready, fileTypes, isUploading }) {
                if (!ready) return "Checking what you allow";
                if (isUploading) return "Seems like stuff is uploading";
                return `max size file 8MB`;
              },
            }}
            onClientUploadComplete={(res) => {
              if (res) {
                setImage(res);
                const json = JSON.stringify(res);

                console.log(json);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {uploadImageMessage}
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
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
