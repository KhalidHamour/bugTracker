export interface IBug {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string[];
  __v: number;
}
