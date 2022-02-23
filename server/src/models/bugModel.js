import mongoose from "mongoose";

const bugSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "ProjectModel",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "Open",
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
});

const bugModel = mongoose.model("bugModel", bugSchema, "bugs");

export default bugModel;
