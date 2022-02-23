import axios from "axios";

const url = "http://localhost:8000/bugs";

/*Bug API Endpoints*/
const create = (
  bug: { title: string; description: string; creatorId: string },
  projectId: string
) =>
  axios({
    method: "post",
    url: `${url}/createProjectBug`,
    data: { bug, projectId },
  });

const update = (
  _id: string,
  updatedBug: {
    title?: string;
    description?: string;
    status?: string;
    assignedTo?: string;
  }
) =>
  axios({
    method: "put",
    url: `${url}`,
    data: { _id, updatedBug },
  });

const bugServices = {
  create,
  update,
};

export default bugServices;
