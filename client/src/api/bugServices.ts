import { API } from "./apiConfig";

/*Bug API Endpoints*/

const fetchUserBugs = (data: { projectIds: string[]; userId: string }) =>
  API.request({
    method: "post",
    url: "/bugs/fetchUserBugs",
    data: { data },
  });

const create = (bug: { title: string; description: string; creatorId: string }, projectId: string) =>
  API.request({
    method: "post",
    url: `/bugs/createProjectBug`,
    data: { bug, projectId },
  });

const assignBug = (bugId: string, userIds: string[]) =>
  API.request({
    method: "PUT",
    url: `/bugs/assign`,
    data: { bugId, userIds },
  });

const update = (
  _id: string,
  updatedBug: {
    title?: string;
    description?: string;
    status?: string;
    assignedTo?: string[];
  }
) =>
  API.request({
    method: "put",
    url: `/bugs/`,
    data: { _id, updatedBug },
  });

const deleteBug = (_id: string) =>
  API.request({
    method: "delete",
    url: `/bugs/deleteBug`,
    data: { _id },
  });

const bugServices = {
  fetchUserBugs,
  create,
  update,
  assignBug,
  deleteBug,
};

export default bugServices;
