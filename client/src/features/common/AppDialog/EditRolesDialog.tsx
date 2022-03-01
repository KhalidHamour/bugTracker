import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import ListItemIcon from "@mui/material/ListItemIcon";
import AppDialog from "./AppDialog";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { IRole } from "../../../Interfaces";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { addRole } from "../../../pages/ProjectOverviewPage/projectOverviewActions";

interface Iprops {
  close(): any;
}

const EditRolesDialog = (props: Iprops) => {
  const [childOpen, setChildOpen] = useState<boolean>(false);
  const [childData, setChildData] = useState<IRole | null>(null);
  const [newRoleName, setNewRoleName] = useState<string>("");
  let dispatch = useAppDispatch();
  let { team, _id } = useAppSelector(
    (state: RootState) => state.CurrentProject.value
  );

  const handleChildClose = () => {
    setChildOpen(false);
    setChildData(null);
  };

  const handleCreateNewRole = () => {
    dispatch(addRole({ projectId: _id, roleName: newRoleName }));
    setNewRoleName("");
  };

  return (
    <>
      <DialogTitle>Edit Project Roles</DialogTitle>
      <DialogContent>
        <List>
          {team.roles.map((role, count = 1) => {
            return (
              <ListItem key={`role-${count++}`} disableGutters>
                <ListItemText>{role.role}</ListItemText>
                <ListItemText>
                  {role.permissions.map((perm) => {
                    return `${perm} `;
                  })}
                </ListItemText>
                <ListItemButton
                  onClick={(e) => {
                    setChildOpen(!childOpen);
                    setChildData(role);
                  }}
                >
                  <EditIcon />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <ListItem>
          <TextField
            value={newRoleName}
            onChange={(e) => {
              setNewRoleName(e.currentTarget.value);
            }}
          ></TextField>
          <ListItemButton onClick={handleCreateNewRole}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>{"Create a new Role"}</ListItemText>
          </ListItemButton>
        </ListItem>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={props.close}>
          close
        </Button>
      </DialogActions>
      <AppDialog
        variant="EditRoleChild"
        open={childOpen}
        onClose={handleChildClose}
        onBackDropClick={handleChildClose}
        data={childData}
      />
    </>
  );
};

export default EditRolesDialog;
