import bugModel from "../models/bugModel.js";
import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";

export const getProjectBugs = async (req, res) => {
  const { ids } = req.body;
  try {
    const issues = await bugModel.find({ _id: { $in: ids } });

    res.status(200).json({ issues });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createProjectBug = async (req, res) => {
  let { bug, projectId } = req.body;

  try {
    const newBug = await new bugModel({ ...bug, projectId: projectId });
    let project = await projectModel.findById(projectId);

    project.issues = [...project.issues, newBug._id];

    await newBug.save();
    await project.save();

    res.status(201).json({ newBug });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const assignBug = async (req, res) => {
  let { userIds, bugId } = req.body;
  try {
    let bug = await bugModel.findById(bugId);

    let users = await userModel.find({ _id: { $in: userIds } });

    for (const user of users) {
      user.AssignedIssues = [...user.AssignedIssues, bugId];
      await user.save();
    }

    bug.status = "Assigned";
    bug.assignedTo = [...bug.assignedTo, userIds];
    await bug.save();

    return res.status(200).json({ bug });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateBug = async (req, res) => {
  let { _id, updatedBug } = req.body;

  try {
    let bug = await bugModel.findByIdAndUpdate(_id);

    updatedBug.title ? (bug.title = updatedBug.title) : undefined;
    updatedBug.status ? (bug.status = updatedBug.status) : undefined;
    updatedBug.description ? (bug.description = updatedBug.description) : undefined;
    updatedBug.assignedTo ? (bug.assignedTo = [...updatedBug.assignedTo]) : undefined;
    await bug.save();

    return res.status(200).json({ bug });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const deleteBug = async (req, res) => {
  const { _id } = req.body;

  try {
    let bug = await bugModel.findById(_id);

    for (const userId of bug.assignedTo) {
      await userModel.findByIdAndUpdate(userId, {
        $pull: { AssignedIssues: _id },
      });
    }

    await projectModel.findByIdAndUpdate(bug.projectId, {
      $pull: { issues: _id },
    });

    await bugModel.findByIdAndDelete({ _id });

    return res.status(201).json({ id: _id });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
