export interface IPostUserProps {
  _id: string;
  userName: string;
  date: string;
  title?: string;
  subtitle: string;
  image?: string;
  sex: "male" | "female";
  userPhoto?: string;
  email: string;
  comments: TypeComment[] | undefined;
}
