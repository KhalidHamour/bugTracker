import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../pages/AuthPage/authSlice";
import LayoutSilce from "../features/Layout/LayoutSilce";
import projectsPageSlice from "../pages/ProjectsPage/projectsPageSlice";
import projectOverviewSlice from "../pages/ProjectOverviewPage/projectOverviewSlice";
import homeSlice from "../pages/HomePage/homeSlice";

export const store = configureStore({
  reducer: {
    Auth: authSlice,
    Layout: LayoutSilce,
    Home: homeSlice,
    Projects: projectsPageSlice,
    CurrentProject: projectOverviewSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
