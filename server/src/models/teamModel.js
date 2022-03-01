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
        default: "UNASSINGED",
      },
    },
  ],
  roles: [
    {
      role: {
        type: String,
      },
      permissions: {
        type: [String],
        enum: [
          "FULL",
          "ASSIGN",
          "EDIT",
          "REVIEW",
          "ADD",
          "DELETE",
          "NONE",
        ],
        default: ["NONE"],
      },
    },
  ],
});

const teamModel = mongoose.model("teamModel", teamSchema, "teams");

export default teamModel;
