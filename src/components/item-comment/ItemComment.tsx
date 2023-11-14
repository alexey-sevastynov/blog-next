import React from "react";
import styles from "./item-comment.module.scss";
import Image from "next/image";

import { formatDuration } from "@/utils/formatDuration";

const ItemComment: React.FC<IItemComment> = ({
  _id,
  commentText,
  commentedBy,
  commentedTo,
  commentDate,
  userPhoto,
  likes,
}) => {
  const date: Date = new Date(commentDate);
  const now: Date = new Date();
  const difference: number = now.getTime() - date.getTime();

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
          <button>answer</button>
        </footer>
      </div>

      <div className={styles.like}>
        <Image src={"/like.svg"} alt="like" width={18} height={16.8} />
      </div>
    </div>
  );
};

export default ItemComment;
