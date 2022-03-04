import Dialog from "@mui/material/Dialog";
import AddBugDialog from "./BugDialogs/AddBugDialog";
import EditProjectDialog from "./ProjectDialogs/EditProjectDialog";
import AddProjectDialog from "./ProjectDialogs/AddProjectDialog";
import AddTeamMemberDialog from "./TeamDialogs/AddTeamMemberDialog";
import AssignMultipleDialog from "./BugDialogs/AssignMultipleDialog";
import EditBugDialog from "./BugDialogs/EditBugDialog/EditBugDialog";
import EditRoleChildDialog from "./TeamDialogs/EditRolesDialog/EditRoleChildDialog";
import EditRolesDialog from "./TeamDialogs/EditRolesDialog/EditRolesDialog";
import EditTeamMemberDialog from "./TeamDialogs/EditTeamMemberDialog";

interface Iprops {
  open: boolean;
  variant:
    | "AddProject"
    | "EditProject"
    | "AddBug"
    | "EditBug"
    | "AssignMultiple"
    | "AddTeamMember"
    | "EditRoles"
    | "EditRoleChild"
    | "EditTeamMember"
    | "ConfirmAction";
  onClose(): any;
  onBackDropClick(): any;
  perms: string[];
  data?: any;
}

const AppDialog = (props: Iprops) => {
  return (
    <Dialog fullWidth open={props.open} onBackdropClick={props.onBackDropClick}>
      {props.variant === "AddProject" && <AddProjectDialog close={props.onClose} />}
      {props.variant === "EditProject" && (
        <EditProjectDialog close={props.onClose} data={props.data} perms={props.perms} />
      )}
      {props.variant === "AddBug" && <AddBugDialog close={props.onClose} />}
      {props.variant === "EditBug" && (
        <EditBugDialog close={props.onClose} data={props.data} perms={props.perms} />
      )}
      {props.variant === "AssignMultiple" && <AssignMultipleDialog close={props.onClose} data={props.data} />}
      {props.variant === "AddTeamMember" && <AddTeamMemberDialog close={props.onClose} />}
      {props.variant === "EditRoles" && <EditRolesDialog close={props.onClose} perms={props.perms} />}
      {props.variant === "EditRoleChild" && (
        <EditRoleChildDialog close={props.onClose} data={props.data} perms={props.perms} />
      )}
      {props.variant === "EditTeamMember" && (
        <EditTeamMemberDialog close={props.onClose} data={props.data} perms={props.perms} />
      )}
    </Dialog>
  );
};

export default AppDialog;
