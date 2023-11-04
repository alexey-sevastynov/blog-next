interface IPost {
  _id: string;
  title: string;
  image: string;
  userName: string;
  email: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  userPhoto: string;
  sex: "male" | "female";
}
