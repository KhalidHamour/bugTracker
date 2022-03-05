import axios from "axios";

const url = "http://localhost:8000/bugs";

/*Bug API Endpoints*/

const fetchUserBugs = (data: { projectIds: string[]; userId: string }) =>
  axios({
    method: "post",
    url: `${url}/fetchUserBugs`,
    data: { data },
  });

const create = (bug: { title: string; description: string; creatorId: string }, projectId: string) =>
  axios({
    method: "post",
    url: `${url}/createProjectBug`,
    data: { bug, projectId },
  });

const assignBug = (bugId: string, userIds: string[]) =>
  axios({
    method: "PUT",
    url: `${url}/assign`,
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
  axios({
    method: "put",
    url: `${url}`,
    data: { _id, updatedBug },
  });

const deleteBug = (_id: string) =>
  axios({
    method: "delete",
    url: `${url}/deleteBug`,
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
