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

interface Iprops {
  toggleModal(status: boolean): any;
  modalStatus: any;
}

const IssuePanel = (props: Iprops) => {
  const CurrentProject = useAppSelector(
    (state: RootState) => state.CurrentProject
  );

  const openIssues: IBug[] = CurrentProject.value.issues.filter(
    (bug) => bug.status === "Open"
  );
  const assignedIssues: IBug[] = CurrentProject.value.issues.filter(
    (bug) => bug.status === "Assigned"
  );
  const reviewIssues: IBug[] = CurrentProject.value.issues.filter(
    (bug) => bug.status === "Review"
  );
  const closedIssues: IBug[] = CurrentProject.value.issues.filter(
    (bug) => bug.status === "Closed"
  );

  const headings = ["Open", "Assigned", "Review", "Closed"];

  const handleClick = () => {
    props.toggleModal(!props.modalStatus);
  };

  return (
    <>
      <Button
        variant={"contained"}
        onClick={handleClick}
        sx={{ zIndex: 12 }}
      >
        Add Issue
      </Button>
      <Grid
        container
        columns={4}
        spacing={2}
        className={"table-headings-container"}
      >
        {headings.map((heading) => {
          return (
            <Grid
              item
              xs={1}
              className={"table-heading"}
              key={`${heading}-column-heading`}
            >
              <Typography variant={"h5"}>{heading}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        columns={12}
        spacing={2}
        className={"table-columns-container"}
      >
        <TableColumn
          key={`${CurrentProject.value.name}-open`}
          colName={"Open"}
          entries={openIssues}
        />
        <TableColumn
          key={`${CurrentProject.value.name}-Assigned`}
          colName={"Assigned"}
          entries={assignedIssues}
        />
        <TableColumn
          key={`${CurrentProject.value.name}-Review`}
          colName={"Review"}
          entries={reviewIssues}
        />
        <TableColumn
          key={`${CurrentProject.value.name}-Closed`}
          colName={"Closed"}
          entries={closedIssues}
        />
      </Grid>
    </>
  );
};

export default IssuePanel;
