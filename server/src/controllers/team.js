import teamModel from "../models/teamModel.js";
import userModel from "../models/userModel.js";

export const addTeamMember = async (req, res) => {
  const { email, id } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser)
      return res.status(400).json({ message: "user does not exist" });

    const team = await teamModel.findOne({ projectId: id });

    if (!team) return res.status(400).json({ message: "team not found" });

    const existingTeamMember = await teamModel.find({
      "members.memberId": existingUser._id,
    });

    if (existingTeamMember[0])
      return res
        .status(400)
        .json({ message: "user already a team member" });

    team.members = [
      ...team.members,
      { memberId: existingUser._id, role: "UNASSIGNED" },
    ];

    existingUser.projects = [...existingUser.projects, id];

    await team.save();
    await existingUser.save();

    const teamRet = await getTeam(team._id);

    return res.status(200).json({ team: teamRet });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeTeamMember = async (req, res) => {
  const { userId, projectId } = req.body;

  console.log(userId, projectId);
};

const getTeam = async (id) => {
  let team = await teamModel.findById(id);

  let memberWithoutSensitiveInfo = [];

  for (const member of team.members) {
    let profile = await userModel.findById(member.memberId);

    let _id = profile._id;
    let name = profile.name;
    let email = profile.email;
    let imageUrl = profile.imageUrl;
    let role = member.role;

    memberWithoutSensitiveInfo = [
      ...memberWithoutSensitiveInfo,
      { _id, name, email, imageUrl, role },
    ];
  }
  let _id = team._id;
  let projectId = team.projectId;
  let roles = team.roles;

  let retTeam = {
    _id,
    projectId,
    roles,
    members: memberWithoutSensitiveInfo,
  };

  return retTeam;
};
