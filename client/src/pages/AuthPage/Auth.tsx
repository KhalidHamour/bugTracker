/*components*/
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputField from "../../features/common/Input/Input";

/*Hooks*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { emailLogin, emailSignUp, loginWithGoogle } from "./authSliceActions";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //TODO: create auto login for already logged in user old one was bugged, wouldnt reflect changes made by others on refresh

  const googleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in res && "tokenId" in res) {
      const { imageUrl, email, name, givenName, familyName, googleId } = res?.profileObj;
      const token = res?.tokenId;
      try {
        dispatch(
          loginWithGoogle({
            profile: { imageUrl, email, name, givenName, familyName, googleId },
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

  const loginWithEmail = async () => {
    try {
      let res = await dispatch(emailLogin({ email, password }));
      navigate(`/${res.payload.profile.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpWithEmail = async () => {
    try {
      let res = await dispatch(emailSignUp({ firstName, familyName, email, password, confirmPassword }));
      navigate(`/${res.payload.profile.name}`);
    } catch (error) {
      console.log(error);
    }
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
                <InputField
                  name="firstName"
                  label="firstName"
                  half
                  value={firstName}
                  onChange={setFirstName}
                />
                <InputField
                  name="lastName"
                  label="lastName"
                  half
                  value={familyName}
                  onChange={setFamilyName}
                />
                <InputField name="email" label="email" value={email} onChange={setEmail} />
                <InputField name="password" label="password" value={password} onChange={setPassword} />
                <InputField
                  name="Confirm password"
                  label="Confirm password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </>
            ) : (
              <>
                <InputField name="email" label="email" value={email} onChange={setEmail} />
                <InputField name="password" label="password" value={password} onChange={setPassword} />
              </>
            )}
            <Grid item xs={8}>
              <Button fullWidth variant="contained" onClick={isSignUp ? signUpWithEmail : loginWithEmail}>
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
                    {"signUp/login with google"}
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
