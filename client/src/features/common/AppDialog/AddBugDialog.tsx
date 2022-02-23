/*components*/
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

/*Hooks*/
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { RootState } from "../../../app/store";

/*Actions*/
import { addProjectBug } from "../../../pages/ProjectOverviewPage/projectOverviewActions";
/*interfaces*/

interface Iprops {
  close(): any;
}

const AddBugDialog = (props: Iprops) => {
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(
    (state: RootState) => state.CurrentProject
  );
  const { _id } = useAppSelector((state: RootState) => state.Auth.profile);
  const [newBugName, setNewBugName] = useState<string>("");
  const [newBugDescription, setNewBugDescription] = useState<string>("");
  const HandleSubmit = () => {
    let newBug = {
      title: newBugName,
      description: newBugDescription,
      creatorId: _id,
    };
    dispatch(
      addProjectBug({ bug: newBug, projectId: currentProject.value._id })
    );
    setNewBugName("");
    setNewBugDescription("");
    props.close();
  };

  return (
    <>
      <DialogTitle>{"Add a new issue"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{"New bug title"}</DialogContentText>
        <TextField
          size="medium"
          required
          autoFocus
          id="newBugName"
          label="bug Name"
          type="text"
          fullWidth
          variant="filled"
          onChange={(e) => {
            setNewBugName(e.target.value);
          }}
        ></TextField>
        <DialogContentText>{"New bug Descirption"}</DialogContentText>
        <TextField
          multiline={true}
          rows={3}
          id="newBugDescription"
          label="bug Description"
          type="text"
          fullWidth
          variant="filled"
          onChange={(e) => {
            setNewBugDescription(e.target.value);
          }}
        ></TextField>
        <DialogActions>
          <Button variant={"contained"} onClick={props.close}>
            Close
          </Button>
          <Button variant={"contained"} onClick={HandleSubmit}>
            Create New Issue
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default AddBugDialog;
