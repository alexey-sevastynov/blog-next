"use client";

import React, { useState } from "react";
import styles from "./post-user.module.scss";
import Image from "next/image";
import { IPostUserProps } from "./IPostUserProps.interface";
import { useSession } from "next-auth/react";

import { COLORS } from "@/constants/colors";
import Link from "next/link";
import useSWR from "swr";
import { userAvatar } from "@/utils/userAvatar";
import Button from "../Button/Button";
import { useGlobalContext } from "@/app/Context/store";
import { ClipLoader } from "react-spinners";
import AddComment from "../add-comment/AddComment";
import ItemComment from "../item-comment/ItemComment";
import LikeIcon from "../LikeIcon/LikeIcon";

import { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
} from "@/app/GlobalRedux/Features/counter/counterSlice";

const PostUser: React.FC<IPostUserProps> = ({
  _id,
  title,
  subtitle,
  image,
  userName,
  date,
  sex,
  userPhoto,
  email,
  comments,
  likes,
}) => {
  const session = useSession();

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const [visibleComments, setVisibleComments] = useState(false);
  const [likesCount, setLikesCount] = useState(likes || 0);
  const [isActiveLike, setisActiveLike] = useState(false);

  const countComments = comments?.length;

  const { setIsDeletePostConfirmationDialogOpen, setIdPostDelete } =
    useGlobalContext();

  const [isImageReady, setIsImageReady] = useState(false);
  const onLoadCallBack = (e: any) => {
    setIsImageReady(true);
  };

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  const handleDelete = async (id: string) => {
    setIsDeletePostConfirmationDialogOpen(true);
    setIdPostDelete(id);
  };

  const setLikes = async () => {
    const active = !isActiveLike;

    try {
      await fetch(`/api/posts/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          likes: likesCount,
          active: active,
        }),
      }).finally(() => {
        if (isActiveLike) {
          setLikesCount(likesCount - 1);
        }
        if (!isActiveLike) {
          setLikesCount(likesCount + 1);
        }

        mutate();
        setisActiveLike(active);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.postBlock}>
      <div className={styles.post}>
        {session.data?.user?.email === email && (
          <div className={styles.btns}>
            <Link href={`/edit/${_id}`}>
              <Button
                style={{
                  backgroundColor: COLORS.violet,
                  color: COLORS.white,
                  borderRadius: "10px 0px 0px 0px",
                }}
                iconSrc="/edit.svg"
                btnSmall
              >
                edit
              </Button>
            </Link>

            <Button
              id="btn"
              onClick={() => handleDelete(_id)}
              style={{
                backgroundColor: COLORS.red,
                color: COLORS.white,
                borderRadius: "0px 10px 0px 0px",
              }}
              iconSrc="/delete.svg"
              btnSmall
            >
              delete
            </Button>
          </div>
        )}
        <div className={styles.userBlock}>
          <Image
            src={userAvatar(sex, userPhoto)}
            alt="avatar"
            width={80}
            height={80}
          />
          <p className={styles.userName}>{userName}</p>
          <p className={styles.date}>{date}</p>
        </div>

        <div className={styles.contentMessage}>
          <header>
            {title && <p className={styles.title}>{title}</p>}
            <p className={styles.subtitle}>{subtitle}</p>
          </header>

          <footer>
            <button
              className={styles.blockViewComments}
              onClick={() => setVisibleComments(!visibleComments)}
            >
              {countComments ? `View all comments (${countComments})` : ""}
            </button>
            <div className={styles.blockLikes}>
              <LikeIcon
                fillColor={isActiveLike ? COLORS.red : "none"}
                strokeColor={isActiveLike ? COLORS.red : "black"}
                onClick={setLikes}
                height={16.8}
                width={19}
              />

              <p>{likes ? likesCount : 0} likes</p>
              <button onClick={() => dispatch(decrement())}>-</button>
              <span>{count}</span>
              <button onClick={() => dispatch(increment())}>+</button>
            </div>
            <AddComment
              _id={_id}
              commentedTo={userName}
              setVisibleComments={setVisibleComments}
            />
          </footer>
        </div>

        {image && (
          <div className={styles.imageBlock}>
            {!isImageReady && (
              <ClipLoader className={styles.loading} color="#6E3BD9" />
            )}
            <Link href={`/img/${_id}`}>
              <Image
                src={image}
                alt="image"
                width={400}
                height={400}
                onLoad={onLoadCallBack}
              />
            </Link>
          </div>
        )}

        <div className={styles.btnMobileCreatePost}>
          <Link href={"/create"}>
            <Button
              style={{
                backgroundColor: COLORS.yellow,
              }}
              iconSrc="/plus.svg"
              btnSmall
            >
              Create Post
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.listComments}>
        {comments &&
          visibleComments &&
          comments.map((comment: TypeComment) => (
            <ItemComment key={comment._id} {...comment} idPost={_id} />
          ))}
      </div>
    </div>
  );
};

export default PostUser;
