import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Section from "../../features/common/Section/Section";

import "./settingsPage.css";

const settingsPage = () => {
  return (
    <>
      <Grid item xs={12} className={"settings-page-container"}>
        <Section variant={"TOP"} sectionHeading={"GENERAL"}>
          <Typography></Typography>
        </Section>
        <Section variant={"BOTTOM"} sectionHeading={""}></Section>
      </Grid>
    </>
  );
};

export default settingsPage;
