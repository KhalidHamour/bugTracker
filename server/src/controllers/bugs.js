import bugModel from "../models/bugModel.js";
import projectModel from "../models/projectModel.js";

export const getProjectBugs = async (req, res) => {
  const { ids } = req.body;
  try {
    const issues = await bugModel.find({
      _id: { $in: ids },
    });
    // console.log(projects);
    res.status(200).json({ issues });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    res.status(409).json({ message: error.message });
  }
};

export const updateBug = async (req, res) => {
  let { _id, updatedBug } = req.body;

  try {
    let bug = await bugModel.findByIdAndUpdate(_id);

    updatedBug.title ? (bug.title = updatedBug.title) : undefined;
    updatedBug.status ? (bug.status = updatedBug.status) : undefined;
    updatedBug.description
      ? (bug.description = updatedBug.description)
      : undefined;
    updatedBug.assignedTo
      ? (bug.assignedTo = [...bug.assignedTo, updatedBug.assignedTo])
      : undefined;
    await bug.save();

    res.status(200).json({ bug });
  } catch (error) {}
};

export const deleteBug = async (req, res) => {
  let projectId = req.params.projectId;
  let bugId = req.params.bugId;

  try {
    await bugModel.findByIdAndDelete(bugId);

    await projectModel.findByIdAndUpdate(projectId, {
      $pull: { issues: bugId },
    });

    res.status(201).json({ id: bugId });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
