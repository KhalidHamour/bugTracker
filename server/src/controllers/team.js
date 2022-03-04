import teamModel from "../models/teamModel.js";
import userModel from "../models/userModel.js";
import bugModel from "../models/bugModel.js";
import { getTeam } from "../helper/team.js";
import { getIssues } from "../helper/issues.js";

export const addTeamMember = async (req, res) => {
  const { email, id } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    const team = await teamModel.findOne({ projectId: id });
    const existingTeamMember = await teamModel.find({
      projectId: id,
      "members.memberId": existingUser._id,
    });

    if (!existingUser) return res.status(400).json({ message: "user does not exist" });

    if (!team) return res.status(400).json({ message: "team not found" });

    if (existingTeamMember[0]) return res.status(400).json({ message: "user already a team member" });

    team.members = [...team.members, { memberId: existingUser._id, role: "UNASSIGNED" }];

    existingUser.projects = [...existingUser.projects, id];

    await team.save();
    await existingUser.save();

    const teamRet = await getTeam(team._id);

    return res.status(200).json({ team: teamRet });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editTeamMemberRole = async (req, res) => {
  const { teamId, memberId, newRoleName } = req.body;
  try {
    const team = await teamModel.findOne({ _id: teamId });

    let membersEdit = team.members.map((member) => {
      if (member.memberId.toString() === memberId) {
        return {
          memberId: member.memberId,
          role: newRoleName,
          _id: member._id,
        };
      } else {
        return member;
      }
    });

    team.members = membersEdit;

    await team.save();

    let newTeam = await getTeam(team._id);

    return res.status(200).json({ newTeam });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const removeTeamMember = async (req, res) => {
  const { userId, projectId } = req.body.data;

  try {
    const existingUser = await userModel.findById(userId);
    const team = await teamModel.findOne({ projectId: projectId });
    let userIssues = await bugModel.find({ _id: { $in: existingUser.AssignedIssues } });

    let userProjectIssues = userIssues.filter((issue) => issue.projectId.toString() === projectId);

    let issueIds = [];

    for (const issue of userProjectIssues) {
      let newAssignment = issue.assignedTo.filter((user) => user.toString() !== userId);
      if (newAssignment.length < 1) {
        issue.status = "Open";
        issue.assignedTo = newAssignment;
        await issue.save();
      } else {
        issue.assignedTo = newAssignment;
        await issue.save();
      }
      issueIds.push(issue._id);
    }

    let newAssignedIssues = existingUser.AssignedIssues.filter((issue) => issueIds.includes(issue));
    existingUser.AssignedIssues = newAssignedIssues;
    await existingUser.save();

    let newTeam = team.members.filter((member) => member.memberId.toString() !== userId);
    team.members = newTeam;
    await team.save();

    const teamRet = await getTeam(team._id);
    const issueRet = await getIssues(team.projectId);

    return res.status(200).json({ team: teamRet, issues: issueRet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addTeamRole = async (req, res) => {
  const { projectId, roleName } = req.body.data;

  try {
    let team = await teamModel.findOne({ projectId: projectId });

    let newRole = { role: roleName, permissions: ["NONE"] };

    team.roles = [...team.roles, newRole];
    await team.save();

    return res.status(200).json(team.roles);
  } catch (error) {
    return res.status(404).json({ error });
  }
};
export const editTeamRole = async (req, res) => {
  const { projectId, role } = req.body.data;

  try {
    let team = await teamModel.findOne({ projectId: projectId });

    let newRoles = team.roles.map((teamRole) => {
      if (teamRole._id.toString() === role._id) {
        return { ...role, _id: teamRole._id };
      } else {
        return teamRole;
      }
    });
    team.roles = newRoles;
    await team.save();

    let teamRet = await getTeam(team._id);

    return res.status(200).json({ team: teamRet });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
export const deleteTeamRole = async (req, res) => {
  const { projectId, roleId } = req.body.data;

  try {
    const team = await teamModel.findOne({ projectId: projectId });
    let roleToDelete = team.roles.filter((role) => role._id.toString() === roleId);

    let newMembers = team.members.map((member) => {
      if (member.role === roleToDelete[0].role) {
        member.role = "UNASSINGED";
        return member;
      } else {
        return member;
      }
    });
    let newRoles = team.roles.filter((role) => role._id.toString() !== roleId);

    team.roles = newRoles;
    team.members = newMembers;
    await team.save();

    let teamRet = await getTeam(team._id);

    return res.status(200).json({ team: teamRet });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
