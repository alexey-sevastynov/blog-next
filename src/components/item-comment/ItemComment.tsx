import React, { useState } from "react";
import styles from "./item-comment.module.scss";
import Image from "next/image";

import { formatDuration } from "@/utils/formatDuration";
import LikeIcon from "../LikeIcon/LikeIcon";
import { COLORS } from "@/constants/colors";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Confirm from "../Confirm/Confirm";
import { setLocalStorage } from "@/utils/setLocalStorage";
import { getLocalStorage } from "@/utils/getLocalStorage";

const ItemComment: React.FC<IItemComment> = ({
  idPost,
  _id,
  commentText,
  commentedBy,
  commentedTo,
  commentDate,
  userPhoto,
  likes,
}) => {
  const session = useSession();
  const [isActiveLike, setisActiveLike] = useState(
    getLocalStorage(`activeLike:${_id}`)
  );
  const [likesCount, setLikesCount] = useState(likes || 0);

  const date: Date = new Date(commentDate);
  const now: Date = new Date();
  const difference: number = now.getTime() - date.getTime();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  const setLikes = async () => {
    const active = !isActiveLike;

    const updatedComment = {
      _id,
      likes: active ? likesCount + 1 : likesCount - 1,
    };

    try {
      await fetch(`/api/posts/${idPost}`, {
        method: "PATCH",
        body: JSON.stringify({ comment: updatedComment, active }),
      }).finally(() => {
        setLikesCount(active ? likesCount + 1 : likesCount - 1);
        mutate();
        setLocalStorage(`activeLike:${_id}`, active);
        setisActiveLike(active);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async () => {
    try {
      await fetch(`/api/posts/${idPost}`, {
        method: "PATCH",
        body: JSON.stringify({ comment: { _id }, isDelete: true }),
      }).finally(() => {
        mutate();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.itemComment}>
      <div className={styles.userBlock}>
        <Image src={userPhoto} alt="avatar" width={50} height={50} />
      </div>
      <div className={styles.blockMain}>
        <p>
          {commentedBy} <b>@{commentedTo}</b>, {commentText}.
        </p>
        <footer>
          <p>{formatDuration(difference)}</p>
          <p>likes: {likes}</p>

          {commentedBy === session.data?.user?.name && (
            <button onClick={deleteComment}>delete</button>
          )}
        </footer>
      </div>

      <div className={styles.like}>
        <LikeIcon
          fillColor={getLocalStorage(`activeLike:${_id}`) ? COLORS.red : "none"}
          strokeColor={
            getLocalStorage(`activeLike:${_id}`) ? COLORS.red : "black"
          }
          onClick={setLikes}
          height={16.8}
          width={19}
        />
      </div>
    </div>
  );
};

export default ItemComment;
