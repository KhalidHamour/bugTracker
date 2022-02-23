import { IBug } from "./IBug";
import { IMember } from "./IMember";

export interface IProject {
  _id: string;
  name: string;
  team: IMember[];
  issues: IBug[];
  __v: number;
}
