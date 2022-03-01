import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { IBug } from "../../../../Interfaces";

import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { updateProjectBug } from "../../../../pages/ProjectOverviewPage/projectOverviewActions";

interface Iprops {
  close(): any;
  data: IBug;
}

const EditClosedBug = (props: Iprops) => {
  let dispatch = useAppDispatch();
  const [newBugName, setNewBugName] = useState<string>("");
  const [newBugDescription, setNewBugDescription] = useState<string>("");
  const [newBugAssignment, setnewBugAssignment] = useState<string[]>([]);

  const handleSubmit = () => {
    dispatch(
      updateProjectBug({
        bug: { title: newBugName, description: newBugDescription },
        _id: props.data._id,
      })
    );
    setNewBugName("");
    setNewBugDescription("");
    props.close();
  };

  return (
    <>
      <DialogContentText>{"new title"}</DialogContentText>
      <TextField
        fullWidth
        autoFocus
        onChange={(e) => {
          setNewBugName(e.currentTarget.value);
        }}
      ></TextField>
      <DialogContentText>{"new description"}</DialogContentText>
      <TextField
        fullWidth
        multiline
        onChange={(e) => {
          setNewBugDescription(e.currentTarget.value);
        }}
      ></TextField>
      <DialogActions>
        <Button variant={"contained"} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default EditClosedBug;
