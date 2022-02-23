import Layout from "../features/Layout/Layout";
import Auth from "../pages/AuthPage/Auth";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import ProjectOverview from "../pages/ProjectOverviewPage/ProjectOverview";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import "./App.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/:user/projects"
              element={
                <Layout>
                  <ProjectsPage />
                </Layout>
              }
            />
            <Route
              path="/:user/projects/:projectId"
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
