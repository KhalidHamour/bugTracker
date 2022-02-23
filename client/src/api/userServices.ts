import axios from "axios";

const url = "http://localhost:8000/users";

const loginGoogleUser = (
  email: string,
  givenName: string,
  familyName: string,
  imageUrl: string,
  name: string,
  token: string
) =>
  axios({
    method: "post",
    url: `${url}/fetchGoogleUser`,
    data: {
      email: email,
      givenName: givenName,
      familyName: familyName,
      imageUrl: imageUrl,
      name: name,
      token: token,
    },
  });

const userServices = {
  // signUp,
  // fetchUser,
  loginGoogleUser,
  // deleteUser,
};

export default userServices;