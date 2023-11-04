import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    sex: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
