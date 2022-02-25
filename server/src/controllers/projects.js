import bugModel from "../models/bugModel.js";
import projectModel from "../models/projectModel.js";
import teamModel from "../models/teamModel.js";
import userModel from "../models/userModel.js";

export const getUserProjects = async (req, res) => {
  const { ids } = req.body;
  try {
    let projects = await projectModel.find({ _id: { $in: ids } });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { projectName, creatorId } = req.body;

  try {
    const newProject = await new projectModel({
      name: projectName,
      creator: creatorId,
    });

    const newTeam = await new teamModel({
      projectId: newProject._id,
      members: [{ memberId: creatorId, role: "OWNER" }],
      roles: [
        { role: "OWNER", permissions: ["FULL"] },
        { role: "UNASSIGNED", permissions: ["NONE"] },
      ],
    });

    newProject.team = newTeam._id;

    let creator = await userModel.findById(creatorId);
    creator.projects = [...creator.projects, newProject._id];

    await newTeam.save();
    await creator.save();
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await projectModel.findById(id);

    req.body.name ? (updatedProject.name = req.body.name) : undefined;

    let response = await updatedProject.save();

    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;
    const project = await projectModel.findById(id);
    const team = await teamModel.findById(project.team);

    let teamIds = team.members.map((member) => {
      return member.memberId;
    });

    console.log(teamIds);

    for (const member of teamIds) {
      await userModel.findByIdAndUpdate(member, {
        $pull: { projects: project._id },
      });
    }

    await bugModel.deleteMany({ projectId: id });
    await teamModel.deleteOne({ projectId: id });
    await projectModel.findByIdAndDelete(id);

    res.status(201).json({ id: id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFullProject = async (req, res) => {
  const { id } = req.body;
  try {
    let foundProject = await projectModel.findById(id);

    let _id = foundProject._id;
    let name = foundProject.name;
    let team = await getTeam(foundProject.team);
    let issues = await getIssues(_id);
    let __v = foundProject.__v;

    let fullProject = { _id, name, team, issues, __v };

    res.status(200).json({ fullProject });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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

const getIssues = async (id) => {
  let issues = await bugModel.find({ projectId: id });

  return issues;
};
