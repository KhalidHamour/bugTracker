import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import { RootState } from "../../../../app/store";
import { useState } from "react";
import { addTeamMember } from "../../../../pages/ProjectOverviewPage/projectOverviewActions";

interface Iprops {
  close(): any;
}

const AddTeamMemberDialog = (props: Iprops) => {
  let dispatch = useAppDispatch();
  let { _id } = useAppSelector((state: RootState) => state.CurrentProject.value);
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");

  const handleSubmit = () => {
    dispatch(addTeamMember({ email: newMemberEmail, id: _id }));
    props.close();
  };

  return (
    <>
      <DialogTitle>Add a new Member</DialogTitle>
      <DialogContent>
        <DialogContentText>{"New member email"}</DialogContentText>
        <TextField
          value={newMemberEmail}
          onChange={(event) => {
            setNewMemberEmail(event.target.value);
          }}
          fullWidth
        ></TextField>
        <DialogContentText>{"please ensure they already hava an account"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={props.close}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleSubmit}>
          Add team member
        </Button>
      </DialogActions>
    </>
  );
};

export default AddTeamMemberDialog;
