/*Components*/
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppMenu from "../../Menu/AppMenu";
import EditIcon from "@mui/icons-material/Edit";
/*interfaces*/
import { IBug } from "../../../../Interfaces";
/*Hooks*/
import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { updateProjectBug } from "../../../../pages/ProjectOverviewPage/projectOverviewActions";
import AppDialog from "../../AppDialog/AppDialog";

interface IProps {
  details: IBug;
  variant: string;
}

const BugCard = (props: IProps) => {
  const dispatch = useAppDispatch();

  const [showMenu, toggleShowMenu] = useState<boolean>(false);
  const [showEditBugModal, toggleShowEditBugModal] =
    useState<boolean>(false);
  const [showAssignMultipleDialog, toggleShowAssignMultipleDialog] =
    useState<boolean>(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const bugID = props.details._id;

  const handleAssignToMenuClose = () => {
    setAnchor(null);
    toggleShowMenu(false);
  };

  const handleStatusChange = (status: string) => {
    dispatch(
      updateProjectBug({
        _id: bugID,
        bug: { status: status },
      })
    );
  };

  const handleModalClose = () => {
    toggleShowEditBugModal(false);
    toggleShowAssignMultipleDialog(false);
  };

  const handleBugMenuClick = () => {
    toggleShowEditBugModal(true);
  };

  return (
    <>
      <Card variant={"outlined"}>
        <IconButton onClick={handleBugMenuClick}>
          <EditIcon />
        </IconButton>

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
            <>
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
              <Button
                size="small"
                onClick={() => {
                  toggleShowAssignMultipleDialog(
                    !showAssignMultipleDialog
                  );
                }}
              >
                Assign Multiple
              </Button>
            </>
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
      <AppMenu
        variant="AssignTo"
        open={showMenu}
        anchor={anchor}
        onClose={handleAssignToMenuClose}
        data={props.details}
      />

      <AppDialog
        variant="EditBug"
        open={showEditBugModal}
        onClose={handleModalClose}
        onBackDropClick={handleModalClose}
        data={props.details}
      />

      <AppDialog
        variant="AssignMultiple"
        open={showAssignMultipleDialog}
        onClose={handleModalClose}
        onBackDropClick={handleModalClose}
        data={props.details}
      />
    </>
  );
};

export default BugCard;
