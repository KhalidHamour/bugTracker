/*Components*/
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
/*interfaces*/
import { IBug } from "../../../../Interfaces";
/*Hooks*/
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateProjectBug } from "../../../../pages/ProjectOverviewPage/projectOverviewActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { RootState } from "../../../../app/store";
import { Avatar } from "@mui/material";

interface IProps {
  details: IBug;
  variant: string;
}

const BugCard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { team } = useAppSelector(
    (state: RootState) => state.CurrentProject.value
  );
  const [showMenu, toggleShowMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const bugID = props.details._id;

  const handleClose = () => {
    setAnchor(null);
    toggleShowMenu(!showMenu);
  };

  const handleStatusChange = (status: string, assignTo?: string) => {
    status === "Assigned"
      ? dispatch(
          updateProjectBug({
            _id: bugID,
            bug: { status: status, assignedTo: assignTo },
          })
        )
      : dispatch(
          updateProjectBug({
            _id: bugID,
            bug: { status: status },
          })
        );
  };

  return (
    <>
      <Card variant={"outlined"}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{props.details.title}</Typography>
          <Typography variant="h6">{props.details.description}</Typography>
        </CardContent>
        <CardActions>
          {props.variant === "Open" && (
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setAnchor(e.currentTarget);
                toggleShowMenu(!showMenu);
              }}
            >
              Assign to
            </Button>
          )}
          {props.variant === "Assigned" && (
            <Button
              size="small"
              onClick={() => {
                handleStatusChange("Review");
              }}
            >
              Send for Review
            </Button>
          )}
          {props.variant === "Review" && (
            <Button
              size="small"
              onClick={() => {
                handleStatusChange("Closed");
              }}
            >
              Close
            </Button>
          )}
        </CardActions>
      </Card>
      <Menu
        open={showMenu}
        anchorEl={anchor}
        onClose={() => {
          handleClose();
        }}
      >
        {team.members.map((member, count = 0) => {
          return (
            <MenuItem
              key={`menu-item-${count++}`}
              onClick={() => {
                handleStatusChange("Assigned", member._id);
                handleClose();
              }}
            >
              <Avatar src={member.imageUrl} alt={member.name} />
              {member.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default BugCard;
