/*hooks*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/*components*/
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IssuePanel from "./ProjectOverviewPanels/IssuePanel";
import TeamPanel from "./ProjectOverviewPanels/TeamPanel/TeamPanel";
import ProjectDetailsPanel from "./ProjectOverviewPanels/ProjectDetailsPanel/ProjectDetailsPanel";

/*styling*/
import "./projectOverview.css";
import { setCurrentProject } from "./projectOverviewActions";
import { setCurrentPage } from "../../features/Layout/LayoutSilce";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

const ProjectOverview = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { projectName, projectId } = useParams();
  const { _id } = useAppSelector((state: RootState) => state.Auth.profile);
  const { members, roles } = useAppSelector((state: RootState) => state.CurrentProject.value.team);
  const dispatch = useAppDispatch();

  let currentRole: string = "";
  let permissons: string[] = [];
  members.forEach((member) => {
    if (member._id === _id) {
      currentRole = member.role;
    }
  });
  roles.forEach((role) => {
    if (role.role === currentRole) {
      permissons = role.permissions;
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(setCurrentProject(projectId));
    }
    if (projectName) {
      dispatch(setCurrentPage(projectName));
    }
  }, [dispatch, projectId, projectName]);

  return (
    <>
      <Grid container columns={1} className={"project-overview-container"} direction="row">
        <Grid container columns={1} className={"nav-tabs-container"}>
          <Grid item xs={1} className={"nav-tabs"}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="issues" />
              <Tab label="Team" />
              <Tab label="Project Details" />
            </Tabs>
          </Grid>
        </Grid>
        <Grid container columns={12} className={"tab-content-container"}>
          {currentTab === 0 && <IssuePanel perms={permissons} />}
          {currentTab === 1 && <TeamPanel perms={permissons} />}
          {currentTab === 2 && <ProjectDetailsPanel perms={permissons} />}
        </Grid>
      </Grid>

      {}
    </>
  );
};

export default ProjectOverview;
