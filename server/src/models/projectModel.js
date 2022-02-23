import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  name: {
    type: String,
    required: [true, "please enter a name"],
  },
  issues: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bugModel",
      },
    ],
    default: [],
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teamModel",
  },
});

const projectModel = mongoose.model(
  "ProjectModel",
  projectSchema,
  "projects"
);

export default projectModel;
