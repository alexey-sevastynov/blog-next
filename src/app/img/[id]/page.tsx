import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";

async function getData(id: string) {
  const res = await fetch(
    `https://blog-next-six-phi.vercel.app/api/posts/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ImageWindow = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  return (
    <section className={styles.imageWindow}>
      <Image
        src={data.image}
        alt={data.image}
        sizes="100vw"
        width={500}
        height={300}
      />
    </section>
  );
};

export default ImageWindow;
