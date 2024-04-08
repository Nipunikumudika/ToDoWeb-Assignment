// do login and registration of users
import "./Login.css";
import futuretodo from "../Images/future-todo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  username: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  //register a user
  const handlesubmitRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const postURL = "https://localhost:7110/api/Users";
    try {
      const response = await fetch(postURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        setRegisterPassword("");
        setRegisterUsername("");
        throw new Error(response.statusText);
      }

      // If successful, navigate to the dashboard
      navigate("Dashboard", {
        state: {
          username: registerUsername,
        },
      });
      console.log("added to system");
      setRegisterUsername("");
      setRegisterPassword("");
    } catch (error) {
      // Handle the error here
      toast("Error");
      console.error("Error:", error);
      setRegisterUsername("");
      setRegisterPassword("");
    }
  };


  //login user
  const handlesubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "https://localhost:7110/api/Users/login";

    try {
      const submitData = {
        username: loginUsername,
        password: loginPassword,
      };

      const response = await axios.post<User>(url, submitData);
      if (response.status < 200 || response.status >= 300) {
        toast("Check Username & Password");
        setLoginUsername("");
        setLoginPassword("");
        return;
      }
      const username = response.data.username;
      if (response) {
        navigate("Dashboard", {
          state: {
            username: response.data.username,
          },
        });
        console.log(username);
      }
    } catch (error) {
      toast("Check Username & Password");
      setLoginUsername("");
      setLoginPassword("");
    }
  };

  return (
    <div className="backgroundlogin">
      <ToastContainer />
      <center>
        <br />
        <img
          className="futuretodo"
          src={futuretodo}
          width={"40%"}
          alt={"Title"}
        ></img>
      </center>
      <div className="reg-and-login">
        {/* <img src={clock} width={"70%"} alt={"Clock"}></img> */}
        <div className="login">
          <center>
            <h1 className="login-text">REGISTER</h1>
          </center>

          <center>
            <form onSubmit={handlesubmitRegister} style={{ margin: "auto" }}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username1"
                  name="username"
                  placeholder="Enter your username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password1"
                  name="password"
                  placeholder="Enter your password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="loginbtn">
                Register
              </button>
            </form>
          </center>
        </div>
        <div className="login">
          <center>
            <h1 className="login-text">LOGIN</h1>
          </center>

          <center>
            <form onSubmit={handlesubmitLogin} style={{ margin: "auto" }}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username2"
                  name="username"
                  placeholder="Enter your username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="loginbtn">
                Login
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Login;
