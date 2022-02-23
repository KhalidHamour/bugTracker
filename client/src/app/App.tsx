import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/AuthPage/Auth";
import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
