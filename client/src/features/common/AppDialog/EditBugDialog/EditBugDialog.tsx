/*components*/
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import EditOpenBug from "./EditOpenBug";
import EditAssignedBug from "./EditAssignedBug";
import EditReviewBug from "./EditReviewBug";
import EditClosedBug from "./EditClosedBug";

/*interfaces*/
import { IBug } from "../../../../Interfaces";

interface Iprops {
  close(): any;
  data: IBug;
}

const EditBugDialog = (props: Iprops) => {
  return (
    <>
      <DialogTitle>{`Edit-${props.data.title}`}</DialogTitle>
      <DialogContent>
        {props.data.status === "Open" && (
          <EditOpenBug close={props.close} data={props.data} />
        )}
        {props.data.status === "Assigned" && (
          <EditAssignedBug close={props.close} data={props.data} />
        )}
        {props.data.status === "Review" && (
          <EditReviewBug close={props.close} data={props.data} />
        )}
        {props.data.status === "Closed" && (
          <EditClosedBug close={props.close} data={props.data} />
        )}
      </DialogContent>
    </>
  );
};

export default EditBugDialog;
