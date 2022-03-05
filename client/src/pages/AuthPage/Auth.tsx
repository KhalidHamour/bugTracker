/*components*/
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputField from "../../features/common/Input/Input";

/*Hooks*/
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginWithGoogle } from "./authSliceActions";
import { useNavigate } from "react-router-dom";

/*component, response type*/
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { RootState } from "../../app/store";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { _id, name } = useAppSelector((state: RootState) => state.Auth.profile);

  const googleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in res && "tokenId" in res) {
      const { imageUrl, email, name, givenName, familyName } = res?.profileObj;
      const token = res?.tokenId;

      try {
        dispatch(
          loginWithGoogle({
            profile: { imageUrl, email, name, givenName, familyName },
            token,
          })
        );
        navigate(`/${name}`);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      console.log("offline");
    }
  };

  const googleFail = (error: any) => {
    console.log(error);
  };

  return (
    <Container sx={{ justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ justifyContent: "center" }}>
        <Typography variant={"h4"} align={"center"}>
          {isSignUp ? "sign Up" : "sign In"}
        </Typography>
        <form>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {isSignUp ? (
              <>
                <InputField name="firstName" label="firstName" half />
                <InputField name="lastName" label="lastName" half />
                <InputField name="email" label="email" />
                <InputField name="password" label="password" />
                <InputField name="password" label="Confirm password" />
              </>
            ) : (
              <>
                <InputField name="email" label="email" />
                <InputField name="password" label="password" />
              </>
            )}
            <Grid item xs={8}>
              <Button fullWidth variant="contained">
                {isSignUp ? "sign Up" : "login"}
              </Button>
            </Grid>
            <Grid item xs={8}>
              <GoogleLogin
                clientId="282023397418-oesnj5i8l6mufmte3oem488puh7na3cn.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    {isSignUp ? "sign Up with google" : "login with google"}
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFail}
                cookiePolicy={"single_host_origin"}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "flex-end", padding: "10px" }}>
            <Grid item>
              <Button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                }}
              >
                {isSignUp ? "Already have an account" : "sign up with a new account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
