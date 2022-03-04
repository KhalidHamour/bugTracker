import { IBug } from "./IBug";
import { ITeam } from "./ITeam";

export interface IProject {
  creator: string;
  _id: string;
  name: string;
  team: ITeam;
  issues: IBug[];
  __v: number;
}
