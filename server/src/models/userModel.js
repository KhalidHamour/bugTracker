import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  projects: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projectModel",
      },
    ],
    default: [],
  },
});

const userModel = mongoose.model("userModel", userSchema, "users");

export default userModel;
