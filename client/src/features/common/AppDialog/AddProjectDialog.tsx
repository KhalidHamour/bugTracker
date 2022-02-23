/*components*/
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

/*hooks*/
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
/*Actions*/
import { addProject } from "../../../pages/ProjectsPage/projectPageActions";
import { RootState } from "../../../app/store";

interface Iprops {
  close(): any;
}

const AddProjectDialog = (props: Iprops) => {
  const [newProjectName, setNewProjectName] = useState<string>("");
  let dispatch = useAppDispatch();
  const creatorId = useAppSelector(
    (state: RootState) => state.Auth.profile._id
  );
  const handleSubmit = () => {
    dispatch(
      addProject({ projectName: newProjectName, creatorId: creatorId })
    );
    props.close();
  };
  return (
    <>
      <DialogTitle>{"Add a new issue"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{"New Project Name"}</DialogContentText>
        <TextField
          value={newProjectName}
          onChange={(event) => {
            setNewProjectName(event.target.value);
          }}
          fullWidth
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={handleSubmit}>
          Create new Project
        </Button>
        <Button variant={"contained"} onClick={props.close}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default AddProjectDialog;
