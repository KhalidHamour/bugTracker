import Layout from "../features/Layout/Layout";
import Auth from "../pages/AuthPage/Auth";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import ProjectOverview from "../pages/ProjectOverviewPage/ProjectOverview";
import SettingsPage from "../pages/SettingsPage/settingsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import "./App.css";
import HomePage from "../pages/HomePage/HomePage";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/:user"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/:user/projects"
              element={
                <Layout>
                  <ProjectsPage />
                </Layout>
              }
            />
            <Route
              path="/:user/settings"
              element={
                <Layout>
                  <SettingsPage />
                </Layout>
              }
            />
            <Route
              path="/:user/projects/:projectName/:projectId"
              element={
                <Layout>
                  <ProjectOverview />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
