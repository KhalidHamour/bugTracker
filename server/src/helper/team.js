import teamModel from "../models/teamModel.js";
import userModel from "../models/userModel.js";

export const getTeam = async (id) => {
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
