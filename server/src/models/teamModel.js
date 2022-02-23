import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "projectModel",
  },
  members: [
    {
      memberId: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
      role: {
        type: String,
      },
    },
  ],
});

const teamModel = mongoose.model("teamModel", teamSchema, "teams");

export default teamModel;
