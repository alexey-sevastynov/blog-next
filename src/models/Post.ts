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
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
