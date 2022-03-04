import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { RootState } from "../../../../../app/store";
import { IRole } from "../../../../../Interfaces";
import { editRole, deleteRole } from "../../../../../pages/ProjectOverviewPage/projectOverviewActions";
import TextField from "@mui/material/TextField";

interface Iprops {
  close(): any;
  data: IRole;
  perms: string[];
}

const perms: string[] = [
  "FULL",
  "ASSIGN",
  "EDIT",
  "REVIEW",
  "ADD",
  "DELETE",
  "EDITTEAM",
  "EDITROLES",
  "NONE",
];

const EditRoleChildDialog = (props: Iprops) => {
  let dispatch = useAppDispatch();

  const { _id } = useAppSelector((state: RootState) => state.CurrentProject.value);
  const [rolePerms, setRolePerms] = useState<string[]>(props?.data?.permissions);

  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");

  const handleAddPerm = (perm: string) => {
    perm === "FULL"
      ? setRolePerms(["FULL"])
      : perm === "NONE"
      ? setRolePerms(["NONE"])
      : rolePerms.includes("FULL") || rolePerms.includes("NONE")
      ? setRolePerms([perm])
      : setRolePerms([...rolePerms, perm]);
  };
  const handleRemovePerm = (perm: string) => {
    let roleRemoved = rolePerms.filter((element) => element !== perm);
    setRolePerms(roleRemoved);
  };

  const handleSubmit = () => {
    dispatch(
      editRole({
        projectId: _id,
        role: { ...props.data, permissions: rolePerms },
      })
    );
    props.close();
  };

  const handleDelete = () => {
    let deleteString = `${props?.data?.role} - DELETE`;
    if (deleteString === deleteConfirmation) {
      dispatch(deleteRole({ projectId: _id, roleId: props.data._id }));
      props.close();
    } else {
      console.log("delete string error");
    }
  };

  return (
    <>
      <DialogTitle>Edit {props?.data?.role}</DialogTitle>
      <DialogContent>
        <DialogContentText>{"Role Permissions"}</DialogContentText>
        {perms.map((perm, count = 0) => {
          return rolePerms.includes(perm) ? (
            <Button
              key={`role-perm-${count++}`}
              variant={"outlined"}
              onClick={() => {
                handleRemovePerm(perm);
              }}
            >
              {perm}
            </Button>
          ) : (
            <Button
              key={`role-perm-${count++}`}
              variant={"contained"}
              onClick={() => {
                handleAddPerm(perm);
              }}
            >
              {perm}
            </Button>
          );
        })}
        {props.perms.includes("FULL") ||
        (props.perms.includes("DELETE") && props.perms.includes("EDITTOLES")) ? (
          <>
            <DialogContentText>{`Enter "${props?.data?.role} - DELETE" to delete`}</DialogContentText>
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
        <Button onClick={props.close}>Cancel</Button>
        <Button onClick={handleSubmit}> Save</Button>
      </DialogActions>
    </>
  );
};

export default EditRoleChildDialog;
