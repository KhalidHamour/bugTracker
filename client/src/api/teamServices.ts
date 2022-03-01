import axios from "axios";
import { IRole } from "../Interfaces";

const url = "http://localhost:8000/teams";

const addProjectTeamMember = (data: { email: string; id: string }) =>
  axios({
    method: "post",
    url: `${url}/addTeamMember`,
    data: data,
  });
const editTeamMemberRole = (data: {
  teamId: string;
  memberId: string;
  newRoleName: string;
}) =>
  axios({
    method: "put",
    url: `${url}/editTeamMemberRole`,
    data: data,
  });

const removeTeamMember = (data: { userId: string; projectId: string }) =>
  axios({
    method: "delete",
    url: `${url}/removeTeamMember`,
    data: { data },
  });

const addRole = (data: { roleName: string; projectId: string }) =>
  axios({
    method: "post",
    url: `${url}/addRole`,
    data: { data },
  });

const editRole = (data: { projectId: string; role: IRole }) =>
  axios({
    method: "put",
    url: `${url}/editRole`,
    data: { data },
  });

const deleteRole = (data: { roleId: string; projectId: string }) =>
  axios({
    method: "delete",
    url: `${url}/deleteRole`,
    data: { data },
  });

const teamServices = {
  addProjectTeamMember,
  editTeamMemberRole,
  removeTeamMember,
  addRole,
  editRole,
  deleteRole,
};

export default teamServices;
