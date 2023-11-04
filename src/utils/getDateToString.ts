export const getDateToString = (dateProps: Date): string => {
  const inputTimestamp = dateProps;

  const date = new Date(inputTimestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  const userHours = date.getHours();
  const userMinutes = date.getMinutes();
  const userSeconds = date.getSeconds();

  const formattedTime = `${userHours.toString().padStart(2, "0")}:${userMinutes
    .toString()
    .padStart(2, "0")}:${userSeconds.toString().padStart(2, "0")}`;

  return `${formattedDate}, ${formattedTime}`;
};
