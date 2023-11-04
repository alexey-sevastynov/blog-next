interface IPost {
  _id: string;
  title: string;
  content: string;
  image: string;
  userName: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  userPhoto: string;
  sex: "male" | "female";
}
