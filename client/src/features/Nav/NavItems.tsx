import Apps from "@mui/icons-material/Apps";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import BugReport from "@mui/icons-material/BugReport";
import ExitToApp from "@mui/icons-material/ExitToApp";

export const logo = {
  icon: <BugReport />,
  logoText: (
    <Typography variant="h6" sx={{ display: { md: "block", xs: "none" } }}>
      Bug-Tracker
    </Typography>
  ),
};

export const items = [
  { text: "Home", icon: <Home /> },
  { text: "Projects", icon: <Apps /> },
  { text: "Settings", icon: <Settings /> },
];

export const logout = {
  text: "Logout",
  icon: <ExitToApp />,
};
