import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import AppDialog from "../../../../features/common/AppDialog/AppDialog";
import Section from "../../../../features/common/Section/Section";

import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";

interface IProps {
  perms: string[];
}

const ProjectDetailsPanel = (props: IProps) => {
  const [showEditRolesModal, toggleShowModal] = useState<boolean>(false);
  const project = useAppSelector((state: RootState) => state.CurrentProject.value);

  const handleEditRolesClick = () => {
    toggleShowModal(!showEditRolesModal);
  };

  const handleClose = () => {
    toggleShowModal(!showEditRolesModal);
  };
  return (
    <>
      <Grid item xs={12} className={"project-details-container"}>
        <Section variant="TOP" sectionHeading={"GENERAL"}>
          <List>
            <ListItem>
              <ListItemText>Project Name: {project.name}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText># Team Members: {project.team.members.length}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText># Issues: {project.issues.length}</ListItemText>
            </ListItem>
          </List>
        </Section>
        <Section variant="MIDDLE" sectionHeading={"ROLES"}>
          <List>
            {project.team.roles.map((role, count = 1) => {
              return (
                <ListItem key={`role-${count++}`}>
                  <ListItemText>
                    {role.role}:{" "}
                    {role.permissions.map((perm) => {
                      return `${perm} `;
                    })}
                  </ListItemText>
                </ListItem>
              );
            })}
            <br></br>
            {props.perms.includes("FULL") || props.perms.includes("EDITROLES") ? (
              <Button variant={"contained"} onClick={handleEditRolesClick}>
                Edit Roles
              </Button>
            ) : (
              <Button disabled variant={"contained"} onClick={handleEditRolesClick}>
                Edit Roles
              </Button>
            )}
            <br></br>
          </List>
        </Section>
      </Grid>

      <AppDialog
        open={showEditRolesModal}
        variant={"EditRoles"}
        onClose={handleClose}
        onBackDropClick={handleClose}
        perms={props.perms}
      />
    </>
  );
};

export default ProjectDetailsPanel;
