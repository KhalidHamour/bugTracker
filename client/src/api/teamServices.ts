import axios from "axios";

const url = "http://localhost:8000/teams";

const addProjectTeamMember = (data: { email: string; id: string }) =>
  axios({
    method: "put",
    url: `${url}/addTeamMember`,
    data: data,
  });

const removeTeamMember = (data: { userId: string; projectId: string }) =>
  axios({
    method: "delete",
    url: `${url}/removeTeamMember`,
    data: { data },
  });

const teamServices = {
  addProjectTeamMember,
  removeTeamMember,
};

export default teamServices;
