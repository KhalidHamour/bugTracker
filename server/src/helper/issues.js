import bugModel from "../models/bugModel.js";

export const getIssues = async (id) => {
  let issues = await bugModel.find({ projectId: id });

  return issues;
};
