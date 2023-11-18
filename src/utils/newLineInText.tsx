export const newLineInText = (text: string) => {
  const paragraphs = text.split(/\n{2,}|\n{1}(?!\n)/);
  return paragraphs.map((paragraph, index) => (
    <p key={index}>
      {paragraph}
      <br />
      <br />
    </p>
  ));
};
