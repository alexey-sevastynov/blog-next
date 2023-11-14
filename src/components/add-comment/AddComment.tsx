import React, { ChangeEvent, useState } from "react";
import styles from "./add-comment.module.scss";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const AddComment = ({
  _id,
  commentedTo,
  setVisibleComments,
}: {
  _id: string;
  commentedTo: string;
  setVisibleComments: (visibleComments: boolean) => void;
}) => {
  const session = useSession();

  const [text, setText] = useState("");

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const addComment = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userEmail = session.data?.user?.email;
    const userPhoto = session.data?.user?.image;
    const userName = session.data?.user?.name;

    try {
      const gender = await fetch(`/api/users`, { method: "GET" }).then((res) =>
        res
          .json()
          .then(
            (data) => data.find((user: any) => user.email === userEmail)?.sex
          )
      );

      const showAvatar = gender === "female" ? "/woman.png" : "/man.png";

      await fetch(`/api/posts/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          comment: {
            _id: String(Math.random() * 100),
            commentText: text,
            commentedBy: userName,
            commentedTo: commentedTo,
            commentDate: new Date(),
            userPhoto: userPhoto ? userPhoto : showAvatar,
            likes: 0,
          },
        }),
      }).finally(() => {
        mutate();
        setText("");
        setVisibleComments(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.addComment}>
      <textarea
        value={text}
        placeholder="Add commentary . . ."
        rows={1}
        onInput={autoResize}
        onChange={handleChange}
      />
      {text && (
        <button type="submit" onClick={addComment}>
          Publish
        </button>
      )}
    </form>
  );
};

export default AddComment;
