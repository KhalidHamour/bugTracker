import Grid from "@mui/material/Grid";
import TableColumnEntry from "./TableColumnEntry";

interface Iprops {
  colName: string;
  entries: any[];
}

const tableColumn = (props: Iprops) => {
  return (
    <Grid item xs={3} className={"table-column"}>
      <Grid container columns={1} className={"table-column-contents"}>
        {props.entries.map((entry, index = 0) => {
          return <TableColumnEntry key={`${props.colName}-${index++}`} entry={entry} variant={props.colName} />;
        })}
      </Grid>
    </Grid>
  );
};

export default tableColumn;
