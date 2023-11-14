import React, { ChangeEvent, useState } from "react";
import styles from "./add-comment.module.scss";

const AddComment = () => {
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <div className={styles.addComment}>
      <textarea
        value={text}
        placeholder="Add commentary . . ."
        rows={1}
        onInput={autoResize}
        onChange={handleChange}
      />
      {text && <button>Publish</button>}
    </div>
  );
};

export default AddComment;
