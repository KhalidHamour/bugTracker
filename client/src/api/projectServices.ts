import { API } from "./apiConfig";

/*API Endpoints*/

const fetchProjects = () =>
  API.request({
    method: "get",
    url: `/projects`,
  });

const fetchUserProjects = (ids: string[]) =>
  API.request({
    method: "post",
    url: `/projects/fetchUserProjects`,
    data: { ids: ids },
  });

const fetchFullProject = (id: string) =>
  API.request({
    method: "post",
    url: `/projects/`,
    data: { id: id },
  });

const createNewProject = (data: { projectName: string; creatorId: string }) =>
  API.request({
    method: "post",
    url: `/projects/createProject`,
    data: data,
  });

const update = (data: { projectId: string; name: string }) =>
  API.request({
    method: "put",
    url: `/projects/updateProject`,
    data: data,
  });

const remove = (id: string) =>
  API.request({
    method: "delete",
    url: `/projects`,
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
