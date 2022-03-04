import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TeamListLitem from "./TeamListLitem";
import AppDialog from "../../../../features/common/AppDialog/AppDialog";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { useState } from "react";
import { IMember } from "../../../../Interfaces/IMember";
interface IProps {
  perms: string[];
}

const TeamPanel = (props: IProps) => {
  const [showAddModal, toggleShowAddModal] = useState<boolean>(false);
  const [showEditModal, toggleShowEditModal] = useState<boolean>(false);
  const [editModalData, setEditModalData] = useState<IMember | null>(null);
  const { team } = useAppSelector((state: RootState) => state.CurrentProject.value);

  const handleAddMemberClick = () => {
    toggleShowAddModal(!showAddModal);
  };
  const handleEditMemberClick = (member: IMember) => {
    setEditModalData(member);
    toggleShowEditModal(!showEditModal);
  };

  const handleClose = () => {
    toggleShowAddModal(false);
    toggleShowEditModal(false);
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
              <Paper variant="outlined" key={`team-list-member-${count++}`}>
                <ListItem alignItems="center">
                  <TeamListLitem
                    imgUrl={member.imageUrl}
                    name={member.name}
                    role={member.role}
                    email={member.email}
                  />
                  {props.perms.includes("FULL") || props.perms.includes("EDITTEAM") ? (
                    <IconButton
                      onClick={() => {
                        handleEditMemberClick(member);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </ListItem>
              </Paper>
            );
          })}
          {props.perms.includes("FULL") || props.perms.includes("EDITTEAM") ? (
            <Paper variant="outlined">
              <ListItem sx={{ cursor: "pointer" }} onClick={handleAddMemberClick}>
                <TeamListLitem icon={<AddIcon />} name={"Add a new team member"} />
              </ListItem>
            </Paper>
          ) : (
            <></>
          )}
        </List>
      </Container>

      <AppDialog
        open={showAddModal}
        variant={"AddTeamMember"}
        onClose={handleClose}
        onBackDropClick={handleClose}
        perms={props.perms}
      />
      <AppDialog
        open={showEditModal}
        variant={"EditTeamMember"}
        onClose={handleClose}
        onBackDropClick={handleClose}
        data={editModalData}
        perms={props.perms}
      />
    </>
  );
};

export default TeamPanel;
