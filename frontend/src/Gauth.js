import axios from "axios";
import Cookie from "js-cookie";
import { GoogleLogin } from "react-google-login";

export default function Gauth() {
  const onGoogleSuccess = (response) => {
    const code = response.code;

    console.log(response);
    axios
      .post("/auth/google", { data: code })
      .then((res) => {
        console.log("hey");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onGoogleFailure = () => {
    console.log("boomer");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151a30",
        color: "white",
      }}
    >
      <h1>Google Oauth Sign In</h1>
      <GoogleLogin
        clientId="590978946618-g4eme1h14jmco7acm6lpe3afnhcetug7.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        responseType="code"
        scope="https://www.googleapis.com/auth/gmail.send"
        accessType="offline"
        className="google-login-button"
        cookiePolicy={"single_host_origin"}
        redirectUri="http://localhost:3000"
      />
    </div>
  );
}
