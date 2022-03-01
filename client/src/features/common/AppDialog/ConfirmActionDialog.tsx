import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { RootState } from "../../../app/store";
import { useState } from "react";
import { addTeamMember } from "../../../pages/ProjectOverviewPage/projectOverviewActions";

interface Iprops {
  close(): any;
}

const ConfirmActionDialog = (props: Iprops) => {
  let dispatch = useAppDispatch();
  let { _id } = useAppSelector(
    (state: RootState) => state.CurrentProject.value
  );
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");

  const handleSubmit = () => {
    props.close();
  };

  return (
    <>
      <DialogTitle>Add a new Member</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </>
  );
};

export default ConfirmActionDialog;
