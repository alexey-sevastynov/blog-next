import React from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import { COLORS } from "@/constants/colors";
import Textarea from "@/components/Textarea/Textarea";
import Link from "next/link";

const CreatePost = () => {
  return (
    <div className={styles.create}>
      <form className="container">
        <h2 className={styles.title}>Create Post</h2>

        <div className={styles.inputs}>
          <Input placeholder="title...">input title</Input>
          <Textarea placeholder="description...">input description</Textarea>
          <Input placeholder="URL image...">input URL image</Input>
        </div>

        <div className={styles.btns}>
          <Link href={"/user"}>
            <Btn type="button" style={{ backgroundColor: COLORS.yellow }}>
              back
            </Btn>
          </Link>

          <Btn style={{ backgroundColor: COLORS.violet, color: COLORS.white }}>
            create
          </Btn>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
