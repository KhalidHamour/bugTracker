import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TeamListLitem from "./TeamListLitem";
import AppDialog from "../../../../features/common/AppDialog/AppDialog";

import { useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { useState } from "react";
import { IMember } from "../../../../Interfaces/IMember";
import { ITeam } from "../../../../Interfaces/ITeam";

const TeamPanel = () => {
  const [showAddModal, toggleShowModal] = useState<boolean>(false);
  const { team } = useAppSelector(
    (state: RootState) => state.CurrentProject.value
  );

  const handleAddMemberClick = () => {
    toggleShowModal(!showAddModal);
  };

  const handleClose = () => {
    toggleShowModal(!showAddModal);
  };

  return (
    <>
      <Container>
        <List>
          <Paper variant="outlined">
            <ListItem alignItems="center">
              <TeamListLitem name={"Name"} role={"Role"} email={"Email"} />
            </ListItem>
          </Paper>
          {team.members.map((member: IMember, count: number = 0) => {
            return (
              <Paper
                variant="outlined"
                key={`team-list-member-${count++}`}
              >
                <ListItem alignItems="center">
                  <TeamListLitem
                    imgUrl={member.imageUrl}
                    name={member.name}
                    role={member.role}
                    email={member.email}
                  />
                </ListItem>
              </Paper>
            );
          })}
          <Paper variant="outlined">
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={handleAddMemberClick}
            >
              <TeamListLitem
                icon={<AddIcon />}
                name={"Add a new team member"}
              />
            </ListItem>
          </Paper>
        </List>
      </Container>

      <AppDialog
        open={showAddModal}
        variant={"AddTeamMember"}
        onClose={handleClose}
        onBackDropClick={handleClose}
      ></AppDialog>
    </>
  );
};

export default TeamPanel;
