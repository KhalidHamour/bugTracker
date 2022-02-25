import { IRole } from "./IRole";
import { IMember } from "./IMember";
export interface ITeam {
  _id: string;
  projectId: string;
  members: IMember[];
  roles: IRole[];
}
