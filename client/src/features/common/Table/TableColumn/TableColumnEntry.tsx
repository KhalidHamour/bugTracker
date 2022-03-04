import { IBug } from "../../../../Interfaces";
import BugCard from "../BugCard/BugCard";

import Grid from "@mui/material/Grid";

interface Iprops {
  entry: IBug;
  variant: string;
  perms: string[];
}

const TableColumnEntry = (props: Iprops) => {
  return (
    <>
      <Grid item xs={1}>
        <BugCard perms={props.perms} variant={props.variant} details={props.entry} />
      </Grid>
    </>
  );
};

export default TableColumnEntry;
