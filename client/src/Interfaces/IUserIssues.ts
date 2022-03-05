import { IBug } from "./IBug";
import { IProject } from "./IProject";

export interface IUserIssues {
  project: IProject;
  issues: IBug[];
}
