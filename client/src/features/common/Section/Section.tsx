import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface IProps {
  sectionHeading: string;
  children?: JSX.Element;
  variant: "TOP" | "BOTTOM" | "MIDDLE";
}

const Section = (props: IProps) => {
  return (
    <>
      <Grid item xs={12}>
        {(props.variant === "BOTTOM" || props.variant === "MIDDLE") && <Divider variant="middle" />}
        <br></br>
        <Typography variant="h4">{props.sectionHeading}</Typography>
        <br></br>
        {props.children || <></>}
        <br></br>
        {(props.variant === "TOP" || props.variant === "MIDDLE") && <Divider variant="middle" />}
      </Grid>
    </>
  );
};

export default Section;
