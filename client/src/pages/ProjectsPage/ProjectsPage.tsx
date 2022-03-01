/*components*/
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/*hooks*/
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { MouseEvent, useEffect, useState } from "react";
import { RootState } from "../../app/store";

/*Actions*/
import { getUserProjects } from "./projectPageActions";
import { setCurrentPage } from "../../features/Layout/LayoutSilce";
import { setCurrentProject } from "../ProjectOverviewPage/projectOverviewActions";

/*styling*/
import "./projectpage.css";
import { IProject } from "../../Interfaces";
import AppDialog from "../../features/common/AppDialog/AppDialog";
import AppMenu from "../../features/common/Menu/AppMenu";

const ProjectsPage = () => {
  const [showAddModal, toggleShowModal] = useState<boolean>(false);
  const [showMenu, toggleShowMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [menuProjectID, setMenuProjectID] = useState<string>("");
  const projects = useAppSelector(
    (state: RootState) => state.Projects.value
  );
  const profile = useAppSelector((state: RootState) => state.Auth.profile);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const handleClose = () => {
    setAnchor(null);
    setMenuProjectID("");
    toggleShowMenu(!showMenu);
  };

  const handleTabClick = (
    e: MouseEvent<HTMLDivElement>,
    project: IProject
  ) => {
    if (e.currentTarget === e.target) {
      navigate(`/${profile.name}/projects/${project.name}/${project._id}`);
      dispatch(setCurrentProject(project._id));
      dispatch(setCurrentPage(project.name));
    }
  };

  useEffect(() => {
    dispatch(getUserProjects(profile.projects));
  }, [dispatch, profile.projects]);

  return (
    <>
      <Grid
        container
        columns={12}
        spacing={0}
        className={"project-tabs-container"}
      >
        <Grid item xs={12} className={"button-wrapper"}>
          <Button
            variant="contained"
            onClick={() => {
              toggleShowModal(!showAddModal);
            }}
          >
            Add Project
          </Button>
        </Grid>
        {projects !== null &&
          projects.map((project, index = 0) => {
            return (
              /*TODO: Make new component for this*/
              <Grid
                key={`${project.name}-tab-${index++}`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={"project-tab-cell"}
              >
                <Paper
                  variant="outlined"
                  component={"div"}
                  className={"project-tab"}
                  sx={{ cursor: "pointer" }}
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    handleTabClick(e, project);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h4" className={"tab-title"}>
                      {project.name}
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        setAnchor(e.currentTarget);
                        toggleShowMenu(!showMenu);
                        setMenuProjectID(project._id);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>

                  <br></br>
                  <Typography variant="h6" className={"tab-bug-count"}>
                    Number of bugs: {project.issues.length}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}

        <AppMenu
          variant="ProjectsPage"
          open={showMenu}
          anchor={anchor}
          onClose={handleClose}
          data={menuProjectID}
        />
      </Grid>

      <AppDialog
        variant="AddProject"
        open={showAddModal}
        onBackDropClick={() => {
          toggleShowModal(!showAddModal);
        }}
        onClose={() => {
          toggleShowModal(!showAddModal);
        }}
      ></AppDialog>
    </>
  );
};

export default ProjectsPage;
