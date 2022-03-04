import axios from "axios";

const url = "http://localhost:8000/projects";

/*API Endpoints*/

const fetchProjects = () =>
  axios({
    method: "get",
    url: `${url}`,
  });

const fetchUserProjects = (ids: string[]) =>
  axios({
    method: "post",
    url: `${url}/fetchUserProjects`,
    data: { ids: ids },
  });

const fetchFullProject = (id: string) =>
  axios({
    method: "post",
    url: `${url}/`,
    data: { id: id },
  });

const createNewProject = (data: { projectName: string; creatorId: string }) =>
  axios({
    method: "post",
    url: `${url}/createProject`,
    data: data,
  });

const update = (data: { projectId: string; name: string }) =>
  axios({
    method: "put",
    url: `${url}/updateProject`,
    data: data,
  });

const remove = (id: string) =>
  axios({
    method: "delete",
    url: `${url}`,
    data: { id: id },
  });

const projectServices = {
  fetchProjects,
  fetchUserProjects,
  fetchFullProject,
  createNewProject,
  remove,
  update,
};

export default projectServices;
