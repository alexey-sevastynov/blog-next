import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },

    image: {
      type: String,
      require: true,
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
