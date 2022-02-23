import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";

interface Iprops {
  icon?: JSX.Element;
  text?: string | JSX.Element;
  avatar?: { src: string; alt: string };
  onClick(text?: any): any;
}

export const NavListItem = ({ icon, text, avatar, onClick }: Iprops) => {
  return (
    <ListItem>
      {avatar ? (
        <ListItemIcon>
          {avatar.src ? (
            <Avatar src={avatar.src} alt={avatar.alt}></Avatar>
          ) : (
            <Avatar alt={avatar.alt}></Avatar>
          )}
        </ListItemIcon>
      ) : (
        <></>
      )}
      {icon ? (
        <ListItemIcon onClick={onClick}>
          <IconButton>{icon}</IconButton>
        </ListItemIcon>
      ) : (
        <></>
      )}
      {text ? (
        <ListItemText
          sx={{ display: { md: "block", xs: "none" } }}
          onClick={onClick}
        >
          {text}
        </ListItemText>
      ) : (
        <></>
      )}
    </ListItem>
  );
};

export default NavListItem;
