export const newLineInText = (text: string) => {
  const paragraphs = text.split(/\n{2,}|\n{1}(?!\n)/);
  const totalParagraphs = paragraphs.length;

  return paragraphs.map((paragraph, index) => (
    <p key={index}>
      {paragraph}
      {index !== totalParagraphs - 1 && (
        <>
          <br />
          <br />
        </>
      )}
    </p>
  ));
};
