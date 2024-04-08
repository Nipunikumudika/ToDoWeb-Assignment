import "./Login.css";
import clock from "../Images/clock_right.png";
import futuretodo from "../Images/future-todo.png";
import { useState } from "react";
import axios from "axios";
// import { Route, Routes, useNavigate } from "react-router-dom";
import Popup from "../components/popup";

interface User {
  _id: string;
  username: string;
}

function Login(): JSX.Element {
  //   const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postURL = "http://localhost:5000/users";
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(() => {
      alert("You have been added to the system!");
      togglePopup();
      setUsername("");
      setPassword("");
    });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "http://localhost:5000/users/login";

    try {
      const submitData = {
        username: username,
        password: password,
      };

      const response = await axios.post<User>(url, submitData);
      const id = response.data._id;
      if (response) {
        // navigate("Welcomebackpage", {
        //   state: {
        //     username: response.data.username,
        //     userid: response.data._id,
        //   },
        // });
      }
    } catch (error) {
      alert("Wrong Username or Password");
    }
  };

  return (
    <div className="backgroundlogin">
      <center>
        <br/>
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
            <form onSubmit={handlesubmit} style={{ margin: "auto" }}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <form onSubmit={handlesubmit} style={{ margin: "auto" }}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
