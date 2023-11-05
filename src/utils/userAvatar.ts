export const userAvatar = (
  sex: "male" | "female",
  userPhoto: string = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
) => {
  switch (sex) {
    case "female":
      return "/woman.png";

    case "male":
      return "/man.png";

    default:
      return userPhoto;
  }
};
