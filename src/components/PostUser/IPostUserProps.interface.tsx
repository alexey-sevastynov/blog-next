export interface IPostUserProps {
  userName: string;
  date: string;
  title?: string;
  subtitle: string;
  image?: string;
  sex: "male" | "female";
  userPhoto?: string;
}
