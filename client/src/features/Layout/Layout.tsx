import Nav from "./Nav/Nav";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Container from "@mui/material/Container";

import "./Layout.css";

const Layout = ({ children }: any) => {
  const title = useAppSelector((state: RootState) => state.Layout.value);
  return (
    <Container className={"app-container"} component={"div"} disableGutters maxWidth={false}>
      <Nav />

      <Grid container spacing={4} className={"content-container"}>
        <Grid item xs={12} className={"heading"}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        {children}
      </Grid>
    </Container>
  );
};

export default Layout;
