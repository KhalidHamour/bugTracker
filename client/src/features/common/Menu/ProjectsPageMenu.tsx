import { MenuItem } from "@mui/material";
import { IMenuItem } from "../../../Interfaces/IMenuItem";

import { useAppDispatch } from "../../../app/hooks";
import { deleteProject } from "../../../pages/ProjectsPage/projectPageActions";

interface IProps {
  close(): any;
  data: any;
}

const ProjectsPageMenu = (props: IProps) => {
  let dispatch = useAppDispatch();
  const menuItems: IMenuItem[] = [
    {
      text: "delete",
      onClick: () => {
        dispatch(deleteProject(props.data));
        props.close();
      },
    },
  ];
  return (
    <>
      {menuItems.map((item, count = 0) => {
        return (
          <MenuItem key={`menu-item-${count++}`} onClick={item.onClick}>
            {item.text}
          </MenuItem>
        );
      })}
    </>
  );
};

export default ProjectsPageMenu;
