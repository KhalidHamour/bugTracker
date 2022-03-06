import Grid from "@mui/material/Grid";
import Section from "../../features/common/Section/Section";
import BugCard from "../../features/common/Table/BugCard/BugCard";
import { IBug, IProject } from "../../Interfaces";

interface IProps {
  project: IProject;
  issues: IBug[];
  variant: "MIDDLE" | "BOTTOM" | "TOP";
}

const HomePageSection = (props: IProps) => {
  return (
    <Section variant={props.variant} sectionHeading={props.project.name}>
      <Grid container spacing={3} className={"home-page-project-container"}>
        {props.issues.map((issue) => {
          return (
            <Grid key={`homePage-${issue._id}`} item xs={12} sm={4} md={3}>
              <BugCard details={issue} variant={"HomePage"} perms={[]} project={props.project} />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
};

export default HomePageSection;
