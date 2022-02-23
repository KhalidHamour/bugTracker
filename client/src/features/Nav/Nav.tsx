/*compnents*/
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import NavListItem from "./NavListItem";
import { StyledDrawer } from "./NavStyling";

/*list items*/
import { logo, items, logout } from "./NavItems";

/*data and routing*/
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

import { setCurentPage } from "../Layout/LayoutSilce";
import { authActions } from "../../pages/AuthPage/authSlice";

const Nav = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { profile } = useAppSelector((state: RootState) => state.Auth);

  const OnLogoutClick = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const OnNavItemClick = (text: string) => {
    if (profile.name === "") {
      navigate("/");
    } else {
      dispatch(setCurentPage(`${text}`));
      text === "Home"
        ? navigate(`/${profile.name}`)
        : navigate(`/${profile.name}/${text}`);
    }
  };

  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
      sx={{ width: { md: "200px", xs: "min-content" } }}
    >
      <div className="drawerTop">
        <List>
          <NavListItem
            key={`logo`}
            icon={logo.icon}
            text={logo.logoText}
            onClick={() => {
              OnNavItemClick("Home");
            }}
          />

          <Divider key={`divider1`} variant="middle" component="li" />
          {items.map(({ text, icon }) => (
            <NavListItem
              key={`${text}-icon`}
              icon={icon}
              text={text}
              onClick={() => {
                OnNavItemClick(text);
              }}
            />
          ))}
        </List>
      </div>
      {profile ? (
        <div className="drawerBottom">
          <List>
            <NavListItem
              icon={logout.icon}
              text={logout.text}
              onClick={OnLogoutClick}
            />
            <Divider key={`divider2`} />
            <NavListItem
              avatar={{ src: profile.imageUrl, alt: profile.name }}
              text={"profile"}
              onClick={() => {
                console.log("make profile page");
              }}
            />
          </List>
        </div>
      ) : undefined}
    </StyledDrawer>
  );
};

export default Nav;
