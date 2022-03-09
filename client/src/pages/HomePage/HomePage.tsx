import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchUserAssignedIssues } from "./homeSliceActions";

import Grid from "@mui/material/Grid";
import HomePageSection from "./HomePageSection";

import "./homePage.css";

const HomePage = () => {
  let dispatch = useAppDispatch();
  const { projects, _id } = useAppSelector((state: RootState) => state.Auth.profile);
  const { userIssues } = useAppSelector((state: RootState) => state.Home);

  useEffect(() => {
    if (_id.length > 0) {
      dispatch(fetchUserAssignedIssues({ projectIds: projects, userId: _id }));
    }
  }, [dispatch, projects, _id]);

  return (
    <>
      <Grid item xs={12} className={"home-page-container"}>
        {userIssues.map((project, count = 0) => {
          return (
            <HomePageSection
              key={`homeSection-${count++}`}
              variant={count === 0 ? "TOP" : count < userIssues.length - 1 ? "MIDDLE" : "BOTTOM"}
              project={project.project}
              issues={project.issues}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default HomePage;
