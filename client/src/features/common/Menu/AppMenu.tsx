import Menu from "@mui/material/Menu";
import ProjectsPageMenu from "./ProjectsPageMenu";
import AssignToMenu from "./AssignToMenu";

interface IProps {
  variant: "ProjectsPage" | "AssignTo";
  open: boolean;
  anchor: HTMLElement | null;
  onClose(): any;
  data?: any;
}

const AppMenu = (props: IProps) => {
  return (
    <Menu
      open={props.open}
      anchorEl={props.anchor}
      onClose={props.onClose}
    >
      {props.variant === "ProjectsPage" && (
        <ProjectsPageMenu close={props.onClose} data={props.data} />
      )}
      {props.variant === "AssignTo" && (
        <AssignToMenu close={props.onClose} data={props.data} />
      )}
    </Menu>
  );
};

export default AppMenu;
