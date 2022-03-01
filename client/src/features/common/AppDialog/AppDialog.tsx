import Dialog from "@mui/material/Dialog";
import AddBugDialog from "./AddBugDialog";
import AddProjectDialog from "./AddProjectDialog";
import AddTeamMemberDialog from "./AddTeamMemberDialog";
import AssignMultipleDialog from "./AssignMultipleDialog";
import ConfirmActionDialog from "./ConfirmActionDialog";
import EditBugDialog from "./EditBugDialog/EditBugDialog";
import EditRoleChildDialog from "./EditRoleChildDialog";
import EditRolesDialog from "./EditRolesDialog";
import EditTeamMemberDialog from "./EditTeamMemberDialog";

interface Iprops {
  open: boolean;
  variant:
    | "AddProject"
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
  data?: any;
}

const AppDialog = (props: Iprops) => {
  return (
    <Dialog
      fullWidth
      open={props.open}
      onBackdropClick={props.onBackDropClick}
    >
      {props.variant === "AddProject" && (
        <AddProjectDialog close={props.onClose} />
      )}
      {props.variant === "AddBug" && (
        <AddBugDialog close={props.onClose} />
      )}
      {props.variant === "EditBug" && (
        <EditBugDialog close={props.onClose} data={props.data} />
      )}
      {props.variant === "AssignMultiple" && (
        <AssignMultipleDialog close={props.onClose} data={props.data} />
      )}
      {props.variant === "AddTeamMember" && (
        <AddTeamMemberDialog close={props.onClose} />
      )}
      {props.variant === "EditRoles" && (
        <EditRolesDialog close={props.onClose} />
      )}
      {props.variant === "EditRoleChild" && (
        <EditRoleChildDialog close={props.onClose} data={props.data} />
      )}
      {props.variant === "EditTeamMember" && (
        <EditTeamMemberDialog close={props.onClose} data={props.data} />
      )}
      {props.variant === "ConfirmAction" && (
        <ConfirmActionDialog close={props.onClose} />
      )}
    </Dialog>
  );
};

export default AppDialog;
