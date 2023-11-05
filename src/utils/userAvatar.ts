export const userAvatar = (
  sex: "male" | "female",
  userPhoto: string | undefined
) => {
  switch (sex) {
    case "female":
      return "/woman.png";

    case "male":
      return "/man.png";

    case undefined:
      return (
        userPhoto ||
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
      );
  }
};
