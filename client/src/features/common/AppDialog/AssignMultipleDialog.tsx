import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { RootState } from "../../../app/store";
import { useState } from "react";
import { assignBug } from "../../../pages/ProjectOverviewPage/projectOverviewActions";
import { IBug } from "../../../Interfaces";

interface Iprops {
  close(): any;
  data: IBug;
}

const AssignMultipleDialog = (props: Iprops) => {
  let dispatch = useAppDispatch();
  let { team } = useAppSelector(
    (state: RootState) => state.CurrentProject.value
  );

  const [assignTo, setAssignTo] = useState<string[]>(
    props.data.assignedTo
  );

  const addAssignment = (memberId: string) => {
    setAssignTo([...assignTo, memberId]);
  };
  const removeAssignment = (memberId: string) => {
    setAssignTo(assignTo.filter((member) => member !== memberId));
  };

  const handleSubmit = () => {
    dispatch(assignBug({ bugId: props.data._id, userIds: assignTo }));

    props.close();
  };

  return (
    <>
      <DialogTitle>Assign Multiple</DialogTitle>
      <DialogContent>
        <DialogContentText>{"select bug assignment"}</DialogContentText>
        {team.members.map((member) => {
          return assignTo.includes(member._id) ? (
            <Button
              variant="outlined"
              onClick={() => {
                removeAssignment(member._id);
              }}
            >
              {`${member.name}(${member.role})`}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                addAssignment(member._id);
              }}
            >
              {`${member.name}(${member.role})`}
            </Button>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </>
  );
};

export default AssignMultipleDialog;
