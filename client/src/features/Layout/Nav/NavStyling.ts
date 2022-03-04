import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

export const StyledDrawer = styled(
  Drawer,
  {}
)({
  ".MuiDrawer-root": {
    zIndex: 0,
    position: "relative",
  },
  ".MuiPaper-root": {
    backgroundColor: "#1F1F20",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 0,
  },
  ".MuiList-root": { color: "#FFFFFF" },
  ".MuiSvgIcon-root": { color: "#FFFFFF" },
  ".MuiDivider-root": { backgroundColor: "#FFFFFF" },
});
