import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { IBug } from "../../../../../Interfaces";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { deleteBug, updateProjectBug } from "../../../../../pages/ProjectOverviewPage/projectOverviewActions";
import { RootState } from "../../../../../app/store";

interface Iprops {
  close(): any;
  data: IBug;
  perms: string[];
}

const statuses: string[] = ["Open", "Assigned", "Review", "Closed"];

const EditNonOpenBug = (props: Iprops) => {
  let dispatch = useAppDispatch();
  const [newBugName, setNewBugName] = useState<string>("");
  const [newBugDescription, setNewBugDescription] = useState<string>("");

  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");

  const [newBugStatus, setNewBugStatus] = useState<string>(props.data.status);
  const [newBugAssignment, setnewBugAssignment] = useState<string[]>(props.data.assignedTo);

  const { team } = useAppSelector((state: RootState) => state.CurrentProject.value);

  const removeAssignment = (memberId: string) => {
    setnewBugAssignment(newBugAssignment.filter((member) => member !== memberId));
  };
  const addAssignment = (memberId: string) => {
    setnewBugAssignment([...newBugAssignment, memberId]);
  };

  const handleSubmit = () => {
    dispatch(
      updateProjectBug({
        bug: {
          title: newBugName,
          description: newBugDescription,
          assignedTo: newBugAssignment,
          status: newBugStatus,
        },
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
      {props.perms.includes("FULL") || (props.perms.includes("EDIT") && props.perms.includes("ASSIGN")) ? (
        <>
          <DialogContentText>{"new Assignment"}</DialogContentText>
          {team.members.map((member, count = 0) => {
            return newBugAssignment.includes(member._id) ? (
              <Button
                key={`team-member-${count++}`}
                variant="outlined"
                onClick={() => {
                  removeAssignment(member._id);
                }}
              >
                {`${member.name}(${member.role})`}
              </Button>
            ) : (
              <Button
                key={`team-member-${count++}`}
                variant="contained"
                onClick={() => {
                  addAssignment(member._id);
                }}
              >
                {`${member.name}(${member.role})`}
              </Button>
            );
          })}
        </>
      ) : (
        <></>
      )}

      <DialogContentText>{"bug Status"}</DialogContentText>
      {statuses.map((status, count = 0) => {
        return newBugStatus === status ? (
          <Button
            key={`status-${count++}`}
            variant={"outlined"}
            onClick={() => {
              setNewBugStatus(status);
            }}
          >
            {status}
          </Button>
        ) : (
          <Button
            key={`status-${count++}`}
            variant={"contained"}
            onClick={() => {
              setNewBugStatus(status);
            }}
          >
            {status}
          </Button>
        );
      })}
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

export default EditNonOpenBug;
