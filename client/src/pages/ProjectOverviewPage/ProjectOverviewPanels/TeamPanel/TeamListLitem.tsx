import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface Iprops {
  imgUrl?: string;
  icon?: JSX.Element;
  name: string;
  role?: string;
  email?: string;
}

const TeamListLitem = (props: Iprops) => {
  return (
    <Grid container sx={{ flexDirection: "row", flexWrap: "nowrap" }}>
      <Grid item xs={0.5}>
        {props.imgUrl ? (
          <Avatar src={props.imgUrl} />
        ) : (
          <Avatar>{props.icon}</Avatar>
        )}
      </Grid>
      <Grid item xs={2} alignItems={"flex-start"}>
        <Typography variant="h5">{props.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5">{props.role}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">{props.email}</Typography>
      </Grid>
    </Grid>
  );
};

export default TeamListLitem;
