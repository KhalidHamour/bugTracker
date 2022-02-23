import axios from "axios";
import { IBug } from "../Interfaces/index";

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

const create = (data: { projectName: string; creatorId: string }) =>
  axios({
    method: "post",
    url: `${url}/createProject`,
    data: data,
  });

const update = (
  id: string,
  name?: string,
  team?: any[],
  issues?: IBug[]
) =>
  axios({
    method: "put",
    url: `${url}/${id}`,
    data: {
      name: name,
      team: team,
      issues: issues,
    },
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
  create,
  remove,
  update,
};

export default projectServices;
