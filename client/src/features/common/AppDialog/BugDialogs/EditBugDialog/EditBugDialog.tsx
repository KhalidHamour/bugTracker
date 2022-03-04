/*components*/
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import EditOpenBug from "./EditOpenBug";
import EditNonOpenBug from "./EditNonOpenBug";

/*interfaces*/
import { IBug } from "../../../../../Interfaces";

interface Iprops {
  close(): any;
  data: IBug;
  perms: string[];
}

const EditBugDialog = (props: Iprops) => {
  return (
    <>
      <DialogTitle>{`Edit-${props.data.title}`}</DialogTitle>
      <DialogContent>
        {props.data.status === "Open" && (
          <EditOpenBug close={props.close} data={props.data} perms={props.perms} />
        )}
        {props.data.status === "Assigned" && (
          <EditNonOpenBug close={props.close} data={props.data} perms={props.perms} />
        )}
        {props.data.status === "Review" && (
          <EditNonOpenBug close={props.close} data={props.data} perms={props.perms} />
        )}
        {props.data.status === "Closed" && (
          <EditNonOpenBug close={props.close} data={props.data} perms={props.perms} />
        )}
      </DialogContent>
    </>
  );
};

export default EditBugDialog;
