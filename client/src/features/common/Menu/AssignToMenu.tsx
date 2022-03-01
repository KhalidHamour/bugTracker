import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { IBug, IMember } from "../../../Interfaces";
import { assignBug } from "../../../pages/ProjectOverviewPage/projectOverviewActions";

interface IProps {
  close(): any;
  data: IBug;
}

const AssignToMenu = (props: IProps) => {
  const dispatch = useAppDispatch();

  const { members } = useAppSelector(
    (state: RootState) => state.CurrentProject.value.team
  );

  const handleItemClick = (member: IMember) => {
    dispatch(assignBug({ bugId: props.data._id, userIds: [member._id] }));
  };

  return (
    <>
      {members.map((member, count = 0) => {
        return (
          <MenuItem
            key={`menu-item-${count++}`}
            onClick={() => {
              handleItemClick(member);
            }}
          >
            <Avatar src={member.imageUrl} alt={member.name} />
            {`${member.name}`}
          </MenuItem>
        );
      })}
    </>
  );
};

export default AssignToMenu;
