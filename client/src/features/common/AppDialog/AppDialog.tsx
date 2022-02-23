import Dialog from "@mui/material/Dialog";
import AddBugDialog from "./AddBugDialog";
import AddProjectDialog from "./AddProjectDialog";

interface Iprops {
  open: boolean;
  variant: "AddBug" | "AddProject";
  onClose(): any;
  onBackDropClick(): any;
}

const AppDialog = (props: Iprops) => {
  return (
    <Dialog
      fullWidth
      open={props.open}
      onBackdropClick={props.onBackDropClick}
    >
      {props.variant === "AddBug" && (
        <AddBugDialog close={props.onClose} />
      )}
      {props.variant === "AddProject" && (
        <AddProjectDialog close={props.onClose} />
      )}
    </Dialog>
  );
};

export default AppDialog;
