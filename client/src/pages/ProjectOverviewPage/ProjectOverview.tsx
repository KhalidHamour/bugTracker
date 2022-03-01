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
import AppDialog from "../../features/common/AppDialog/AppDialog";

/*styling*/
import "./projectOverview.css";
import { setCurrentProject } from "./projectOverviewActions";
import { setCurrentPage } from "../../features/Layout/LayoutSilce";
import { useAppDispatch } from "../../app/hooks";

const ProjectOverview = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [showAddModal, toggleShowModal] = useState<boolean>(false);
  const { projectName, projectId } = useParams();
  const dispatch = useAppDispatch();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
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
      <Grid
        container
        columns={1}
        className={"project-overview-container"}
        direction="row"
      >
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
          {currentTab === 0 && (
            <IssuePanel
              toggleModal={toggleShowModal}
              modalStatus={showAddModal}
            />
          )}
          {currentTab === 1 && <TeamPanel />}
          {currentTab === 2 && <ProjectDetailsPanel />}
        </Grid>
      </Grid>

      {
        <AppDialog
          variant="AddBug"
          open={showAddModal}
          onBackDropClick={() => {
            toggleShowModal(!showAddModal);
          }}
          onClose={() => {
            toggleShowModal(!showAddModal);
          }}
        />
      }
    </>
  );
};

export default ProjectOverview;
