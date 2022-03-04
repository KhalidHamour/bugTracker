/*components*/
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

/*hooks*/
import { useAppDispatch } from "../../../../app/hooks";
import { useState } from "react";

/*Actions*/
import { deleteProject, updateProject } from "../../../../pages/ProjectsPage/projectPageActions";

/*Interfaces*/
import { IProject } from "../../../../Interfaces";
interface Iprops {
  close(): any;
  data: IProject;
  perms: string[];
}

const EditProjectDialog = (props: Iprops) => {
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");
  let dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(updateProject({ projectId: props?.data?._id, name: newProjectName }));
    props.close();
  };

  const handleDelete = () => {
    let deleteString = `${props?.data?.name} - REMOVE`;
    if (deleteString === deleteConfirmation) {
      dispatch(deleteProject(props.data._id));
      props.close();
    } else {
      console.log("delete string error");
    }
  };

  return (
    <>
      <DialogTitle>{`Edit-${props?.data?.name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{"Project Name"}</DialogContentText>
        <TextField
          value={newProjectName}
          onChange={(event) => {
            setNewProjectName(event.target.value);
          }}
          fullWidth
        ></TextField>
        {props.perms.includes("FULL") || props.perms.includes("DELETE") ? (
          <>
            <DialogContentText>{`Enter "${props?.data?.name} - REMOVE" to remove`}</DialogContentText>
            <TextField
              onChange={(e) => {
                setDeleteConfirmation(e.currentTarget.value);
              }}
            ></TextField>
            <Button
              onClick={handleDelete}
              sx={{ backgroundColor: "red", color: "black", marginLeft: "10px" }}
            >
              Delete
            </Button>
          </>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={props.close}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default EditProjectDialog;
