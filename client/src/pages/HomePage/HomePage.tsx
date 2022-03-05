import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchUserAssignedIssues } from "./homeSliceActions";

const HomePage = () => {
  let dispatch = useAppDispatch();
  const { projects, _id } = useAppSelector((state: RootState) => state.Auth.profile);
  const { issues, status } = useAppSelector((state: RootState) => state.Home);

  useEffect(() => {
    dispatch(fetchUserAssignedIssues({ projectIds: projects, userId: _id }));
  }, [dispatch, projects, _id]);

  return (
    <>
      <Grid item xs={12} className={"home-page-container"}>
        {issues.map((issue) => {
          return <></>;
        })}
      </Grid>
    </>
  );
};

export default HomePage;
