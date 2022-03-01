import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
  AssignedIssues: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bugModel",
      },
    ],
    default: [],
  },
});

const userModel = mongoose.model("userModel", userSchema, "users");

export default userModel;
