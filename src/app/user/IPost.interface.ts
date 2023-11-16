type TypeComment = {
  _id: string;
  commentText: string;
  commentedBy: string;
  commentedTo: string;
  commentDate: string;
  userPhoto: string;
  likes: number;
};

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
  comments?: TypeComment[];
  likes: number;
}
