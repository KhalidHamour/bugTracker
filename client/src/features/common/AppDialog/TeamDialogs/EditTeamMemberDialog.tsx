import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import { RootState } from "../../../../app/store";
import { useState } from "react";
import {
  editTeamMemberRole,
  removeTeamMember,
} from "../../../../pages/ProjectOverviewPage/projectOverviewActions";
import { IMember } from "../../../../Interfaces";
import { Avatar, TextField } from "@mui/material";

interface Iprops {
  close(): any;
  data: IMember;
  perms: string[];
}

const EditTeamMemberDialog = (props: Iprops) => {
  let dispatch = useAppDispatch();
  let { _id, team } = useAppSelector((state: RootState) => state.CurrentProject.value);

  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");

  const [currentRole, setCurrentRole] = useState<string | null>(props?.data?.role);
  const [newRoleName, setnewRoleName] = useState<string>("");

  const handleSubmit = () => {
    dispatch(
      editTeamMemberRole({
        teamId: team._id,
        memberId: props?.data?._id,
        newRoleName,
      })
    );
    props.close();
  };

  const handleDelete = () => {
    let deleteString = `${props.data.name} - REMOVE`;
    if (deleteString === deleteConfirmation) {
      dispatch(removeTeamMember({ projectId: _id, userId: props.data._id }));
      props.close();
    } else {
      console.log("delete string error");
    }
  };

  return (
    <>
      <DialogTitle>{`Edit ${props?.data?.name}'s Role`}</DialogTitle>
      <DialogContent>
        <Avatar src={props?.data?.imageUrl} alt={props?.data?.name} sx={{ height: 100, width: 100 }} />
        <br></br>
        <DialogContentText>{`currentRole: ${props?.data?.role}`}</DialogContentText>
        <br></br>
        <DialogContentText>{` New Role`}</DialogContentText>
        {team.roles.map((role, count = 0) => {
          return role.role === currentRole ? (
            <Button key={`role-button-${count++}`} variant={"outlined"}>
              {role.role}
            </Button>
          ) : (
            <Button
              key={`role-button-${count++}`}
              variant={"contained"}
              onClick={() => {
                setnewRoleName(role.role);
                setCurrentRole(role.role);
              }}
            >
              {role.role}
            </Button>
          );
        })}
        {props.perms.includes("FULL") ||
        (props.perms.includes("DELETE") && props.perms.includes("EDITTEAM")) ? (
          <>
            <DialogContentText>{`Enter "${props.data.name} - REMOVE" to remove`}</DialogContentText>
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
        <Button onClick={handleSubmit} variant={"contained"}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default EditTeamMemberDialog;
