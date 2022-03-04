import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { IBug } from "../../../../../Interfaces";

import { useState } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { deleteBug, updateProjectBug } from "../../../../../pages/ProjectOverviewPage/projectOverviewActions";

interface Iprops {
  close(): any;
  data: IBug;
  perms: string[];
}

const EditOpenBug = (props: Iprops) => {
  let dispatch = useAppDispatch();
  const [newBugName, setNewBugName] = useState<string>("");
  const [newBugDescription, setNewBugDescription] = useState<string>("");

  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");

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

  const handleDelete = () => {
    let deleteString = `${props.data.title} - DELETE`;
    if (deleteString === deleteConfirmation) {
      dispatch(deleteBug({ bugId: props.data._id }));
      props.close();
    } else {
      console.log("delete string error");
    }
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
      {props.perms.includes("FULL") || (props.perms.includes("EDIT") && props.perms.includes("DELETE")) ? (
        <>
          <DialogContentText>{`Enter "${props.data.title} - DELETE" to delete`}</DialogContentText>
          <TextField
            onChange={(e) => {
              setDeleteConfirmation(e.currentTarget.value);
            }}
          ></TextField>
          <Button onClick={handleDelete} sx={{ backgroundColor: "red", color: "black", marginLeft: "10px" }}>
            Delete
          </Button>
        </>
      ) : (
        <></>
      )}
      <DialogActions>
        <Button variant={"contained"} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default EditOpenBug;
