import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
      require: true,
    },

    image: {
      type: String,
    },
    userName: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
    userPhoto: {
      type: String,
    },

    sex: {
      type: String,
      require: true,
    },
    comments: [
      {
        _id: String,
        commentText: String,
        commentedBy: String,
        commentedTo: String,
        commentDate: String,
        userPhoto: String,
        likes: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
