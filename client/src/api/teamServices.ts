import { API } from "./apiConfig";
import { IRole } from "../Interfaces";

const addProjectTeamMember = (data: { email: string; id: string }) =>
  API.request({
    method: "post",
    url: `/teams/addTeamMember`,
    data: data,
  });
const editTeamMemberRole = (data: { teamId: string; memberId: string; newRoleName: string }) =>
  API.request({
    method: "put",
    url: `/teams/editTeamMemberRole`,
    data: data,
  });

const removeTeamMember = (data: { userId: string; projectId: string }) =>
  API.request({
    method: "delete",
    url: `/teams/removeTeamMember`,
    data: { data },
  });

const addRole = (data: { roleName: string; projectId: string }) =>
  API.request({
    method: "post",
    url: `/teams/addRole`,
    data: { data },
  });

const editRole = (data: { projectId: string; role: IRole }) =>
  API.request({
    method: "put",
    url: `/teams/editRole`,
    data: { data },
  });

const deleteRole = (data: { roleId: string; projectId: string }) =>
  API.request({
    method: "delete",
    url: `/teams/deleteRole`,
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
