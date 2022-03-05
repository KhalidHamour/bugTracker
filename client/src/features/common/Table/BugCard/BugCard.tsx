/*Components*/
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AppDialog from "../../AppDialog/AppDialog";
/*interfaces*/
import { IBug, IProject } from "../../../../Interfaces";
/*Hooks*/
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { updateProjectBug } from "../../../../pages/ProjectOverviewPage/projectOverviewActions";

interface IProps {
  details: IBug;
  variant: string;
  perms: string[];
  project?: IProject;
}

const BugCard = (props: IProps) => {
  const navigate = useNavigate();
  const { user } = useParams();
  const dispatch = useAppDispatch();
  const [showEditBugModal, toggleShowEditBugModal] = useState<boolean>(false);
  const [showAssignMultipleDialog, toggleShowAssignMultipleDialog] = useState<boolean>(false);
  const bugID = props.details._id;

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
        {props.perms.includes("FULL") || props.perms.includes("EDIT") ? (
          <IconButton onClick={handleBugMenuClick}>
            <EditIcon />
          </IconButton>
        ) : (
          <></>
        )}

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
              {props.perms.includes("FULL") || props.perms.includes("ASSIGN") ? (
                <Button
                  size="small"
                  onClick={() => {
                    toggleShowAssignMultipleDialog(!showAssignMultipleDialog);
                  }}
                >
                  Assign Issue
                </Button>
              ) : (
                <Button
                  disabled
                  size="small"
                  onClick={() => {
                    toggleShowAssignMultipleDialog(!showAssignMultipleDialog);
                  }}
                >
                  Assign Issue
                </Button>
              )}
            </>
          )}
          {props.variant === "Assigned" && (
            <>
              {props.perms.includes("NONE") ? (
                <Button
                  disabled
                  size="small"
                  onClick={() => {
                    handleStatusChange("Review");
                  }}
                >
                  Send for Review
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    handleStatusChange("Review");
                  }}
                >
                  Send for Review
                </Button>
              )}
            </>
          )}
          {props.variant === "Review" && (
            <>
              {props.perms.includes("FULL") || props.perms.includes("REVIEW") ? (
                <Button
                  size="small"
                  onClick={() => {
                    handleStatusChange("Closed");
                  }}
                >
                  Close
                </Button>
              ) : (
                <Button
                  disabled
                  size="small"
                  onClick={() => {
                    handleStatusChange("Closed");
                  }}
                >
                  Close
                </Button>
              )}
            </>
          )}
          {props.variant === "HomePage" && (
            <>
              <Button
                size="small"
                onClick={() => {
                  navigate(`/${user}/Projects/${props.project?.name}/${props.project?._id}`);
                }}
              >
                view In Project
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      <AppDialog
        variant="EditBug"
        open={showEditBugModal}
        onClose={handleModalClose}
        onBackDropClick={handleModalClose}
        data={props.details}
        perms={props.perms}
      />

      <AppDialog
        variant="AssignMultiple"
        open={showAssignMultipleDialog}
        onClose={handleModalClose}
        onBackDropClick={handleModalClose}
        data={props.details}
        perms={props.perms}
      />
    </>
  );
};

export default BugCard;
