/*components*/
import Grid from "@mui/material/Grid";
import TableColumn from "../../../features/common/Table/TableColumn/TableColumn";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/*Hooks*/
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

/*Interfaces*/
import { IBug } from "../../../Interfaces";
import AppDialog from "../../../features/common/AppDialog/AppDialog";
import { useState } from "react";

interface Iprops {
  perms: string[];
}

const IssuePanel = (props: Iprops) => {
  const [showAddModal, toggleShowAddModal] = useState<boolean>(false);
  const CurrentProject = useAppSelector((state: RootState) => state.CurrentProject);

  const handleOpenModal = () => {
    toggleShowAddModal(true);
  };
  const handleCloseModal = () => {
    toggleShowAddModal(false);
  };

  const openIssues: IBug[] = CurrentProject.value.issues.filter((bug) => bug.status === "Open");
  const assignedIssues: IBug[] = CurrentProject.value.issues.filter((bug) => bug.status === "Assigned");
  const reviewIssues: IBug[] = CurrentProject.value.issues.filter((bug) => bug.status === "Review");
  const closedIssues: IBug[] = CurrentProject.value.issues.filter((bug) => bug.status === "Closed");

  const headings = ["Open", "Assigned", "Review", "Closed"];

  return (
    <>
      {props.perms.includes("FULL") || props.perms.includes("ADD") ? (
        <Button variant={"contained"} onClick={handleOpenModal} sx={{ zIndex: 12 }}>
          Add Issue
        </Button>
      ) : (
        <Button disabled variant={"contained"} onClick={handleOpenModal} sx={{ zIndex: 12 }}>
          Add Issue
        </Button>
      )}
      <Grid container columns={4} spacing={2} className={"table-headings-container"}>
        {headings.map((heading) => {
          return (
            <Grid item xs={1} className={"table-heading"} key={`${heading}-column-heading`}>
              <Typography variant={"h5"}>{heading}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid container columns={12} spacing={2} className={"table-columns-container"}>
        <TableColumn
          perms={props.perms}
          key={`${CurrentProject.value.name}-open`}
          colName={"Open"}
          entries={openIssues}
        />
        <TableColumn
          perms={props.perms}
          key={`${CurrentProject.value.name}-Assigned`}
          colName={"Assigned"}
          entries={assignedIssues}
        />
        <TableColumn
          perms={props.perms}
          key={`${CurrentProject.value.name}-Review`}
          colName={"Review"}
          entries={reviewIssues}
        />
        <TableColumn
          perms={props.perms}
          key={`${CurrentProject.value.name}-Closed`}
          colName={"Closed"}
          entries={closedIssues}
        />
      </Grid>

      <AppDialog
        variant="AddBug"
        open={showAddModal}
        onBackDropClick={handleCloseModal}
        onClose={handleCloseModal}
        perms={props.perms}
      />
    </>
  );
};

export default IssuePanel;
