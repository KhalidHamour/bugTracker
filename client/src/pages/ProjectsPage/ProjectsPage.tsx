/*components*/
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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

const ProjectsPage = () => {
  const [showAddModal, toggleShowAddModal] = useState<boolean>(false);
  const [showEditModal, toggleShowEditModal] = useState<boolean>(false);
  const [modalProject, setModalProject] = useState<IProject | null>(null);
  const projects = useAppSelector((state: RootState) => state.Projects.value);
  const profile = useAppSelector((state: RootState) => state.Auth.profile);
  const { members, roles } = useAppSelector((state: RootState) => state.CurrentProject.value.team);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  let currentRole: string = "";
  let permissons: string[] = [];
  members.forEach((member) => {
    if (member._id === profile._id) {
      currentRole = member.role;
    }
  });
  roles.forEach((role) => {
    if (role.role === currentRole) {
      permissons = role.permissions;
    }
  });

  const handleClose = () => {
    toggleShowAddModal(false);
    toggleShowEditModal(false);
  };

  const handleTabClick = (e: MouseEvent<HTMLDivElement>, project: IProject) => {
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
      <Grid container columns={12} spacing={0} className={"project-tabs-container"}>
        <Grid item xs={12} className={"button-wrapper"}>
          <Button
            variant="contained"
            onClick={() => {
              toggleShowAddModal(!showAddModal);
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
                    {project.creator === profile._id && (
                      <>
                        <IconButton
                          onClick={(e) => {
                            toggleShowEditModal(!showEditModal);
                            setModalProject(project);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </>
                    )}
                  </div>

                  <br></br>
                  <Typography variant="h6" className={"tab-bug-count"}>
                    Number of bugs: {project.issues.length}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
      </Grid>

      <AppDialog
        variant="AddProject"
        open={showAddModal}
        onBackDropClick={handleClose}
        onClose={handleClose}
        perms={[]}
      />

      <AppDialog
        variant="EditProject"
        open={showEditModal}
        onBackDropClick={handleClose}
        onClose={handleClose}
        data={modalProject}
        perms={permissons}
      />
    </>
  );
};

export default ProjectsPage;
