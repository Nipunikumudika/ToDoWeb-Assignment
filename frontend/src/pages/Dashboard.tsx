import "./Dashboard.css";

import { useLocation } from "react-router-dom";
import check from "../Images/check.jpg";
import cross from "../Images/cross.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/Card.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
import Popup from "../components/popup";

function Dashboard() {
  // const navigate = useNavigate();
  let [taskname, setTaskname] = useState();
  let [taskdate, setTaskDate] = useState();
  let [taskiscompleted, setaTaskIsCompleted] = useState();
  let [taskid, setTaskId] = useState();
  let [alltasks, setallTasks] = useState([]);
  let [states, setState] = useState();
  let [editstate, setEditState] = useState("0");
  let [password, setPassword] = useState();
  // const bcrypt = require("bcryptjs");
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // const location = useLocation();

  // const userid = location.state.userid;

  // useEffect(() => {
  //   console.log("hi");
  //   const dataRes = async () => {
  //     const responsetasks = await axios.get("http://localhost:5000/tasks");
  //     setallTasks(
  //       responsetasks.data.filter((task) => {
  //         return task.user === userid;
  //       })
  //     );
  //   };

  //   dataRes();
  // }, [states]);

  // const handleEdit = async (event, key) => {
  //   setEditState(1);
  //   console.log("key index: ", key);
  //   const url = `http://localhost:5000/tasks/${key}`;

  //   event.preventDefault();
  //   try {
  //     const response = await axios.get(url);
  //     console.log(response);
  //     setTaskId(key);
  //     setTaskname(response.data.name);
  //     setTaskDate(response.data.date);
  //     setaTaskIsCompleted(response.data.isCompleted);
  //   } catch (error) {
  //     console.log("Error!");
  //   }
  // };

  // const handleEditTask = async (event, key) => {
  //   console.log("key index: ", userid);

  //   const url = `http://localhost:5000/tasks/${taskid}`;
  //   console.log(url);
  //   event.preventDefault();
  //   try {
  //     const submitData = {
  //       user: userid,
  //       name: taskname,
  //       date: taskdate,
  //       isCompleted: taskiscompleted,
  //     };
  //     console.log(submitData);
  //     const response = await axios.patch(url, submitData);
  //     console.log(response);
  //     setState(!states);
  //     setTaskId("");
  //     setTaskname("");
  //     setTaskDate("");
  //     setaTaskIsCompleted("");
  //     setEditState(0);
  //   } catch (error) {
  //     console.log("Error! cannot update");
  //   }
  // };
  // let hashedPass;
  // const handlechangepassword = async (event, key) => {
  //   console.log(location.state.userid);
  //   console.log(password);
  //   const url = `http://localhost:5000/users/${userid}`;
  //   console.log(url);

  //   if (password) {
  //     hashedPass = await bcrypt.hash(password, 8);
  //   }

  //   try {
  //     const submitData = {
  //       username: location.state.username,
  //       password: hashedPass,
  //     };
  //     console.log(submitData);
  //     const response = await axios.patch(url, submitData);
  //     console.log(response);
  //     alert("Updated");
  //     togglePopup();
  //     navigate("../");
  //   } catch (error) {
      
  //     alert("Error! cannot update");
  //   }
  // };

  // const handleDelete = async (event, key) => {
  //   // console.log("key index: ", key);

  //   const url = `http://localhost:5000/tasks/${key}`;

  //   event.preventDefault();
  //   try {
  //     const response = await axios.delete(url);
  //     console.log(response);
      
  //     setTaskname("");
  //     setTaskDate("");
  //     setTaskId("");
  //     setaTaskIsCompleted("");
  //     setState(!states);
  //     alert("Task delete successfully");
  //   } catch (error) {
  //     alert("Error! Cannot Deleted");
  //   }
  // };

  // console.log(alltasks);

  // const userDetailsCards = alltasks.map((task, key) => {
  //   console.log("userDetailsCards");
  //   let image = cross;

  //   if (task.isCompleted == "true") {
  //     image = check;
  //   }
  //   let key2 = task._id;
  //   return (
  //     <div className="card-bg">
  //       <img src={image} alt="user photo" className="card-image" />
  //       <div className="card-name">{task.name}</div>
  //       <button
  //         className="btn-edit"
  //         onClick={(event) => handleEdit(event, key2)}
  //         //key={task._id}
  //       >
  //         Edit
  //       </button>
  //       <button
  //         className="btn-delete"
  //         onClick={(event) => handleDelete(event, key2)}
  //         key={task._id}
  //       >
  //         Delete
  //       </button>
  //       <div className="card-date">{task.date}</div>
  //     </div>
  //   );
  // });

  // const handlesubmit = async (event) => {
  //   if (taskid) {
  //     alert("Wrong");
  //   } else {
  //     console.log("kk");
  //     const url = "http://localhost:5000/tasks";

  //     event.preventDefault();
  //     try {
  //       const submitData = {
  //         user: userid,
  //         name: taskname,
  //         date: taskdate,
  //         isCompleted: taskiscompleted,
  //       };

  //       const response = await axios.post(url, submitData);
  //       console.log(response);
  //       alert("Task added successfully");
  //       setTaskname("");
  //     setTaskDate("");
  //     setTaskId("");
  //     setaTaskIsCompleted("");
  //       setState(!states);
  //     } catch (error) {
  //       alert("Failed to add task");
  //     }
  //   }
  // };


  // const handdleLogout = async (event) => {
  //   navigate("../");
  // }

  return (
    <div className="background">
      <div
        style={{
          backgroundColor: "rgb(133, 245, 12)",
          width: "300px",
          height: "60px",
          position: "absolute",
          right: "30px",
          top: "10px",
          display: "flex",
          borderRadius: "20px",
        }}
      >
        <div style={{ padding: "auto", margin: "auto" }}>
          {/* {location.state.username} */}
        </div>
        <button
          style={{ height: "5vh", padding: "auto", margin: "auto",borderRadius:"5px",border:"none"  }}
          // onClick={(event) => togglePopup(event, userid)}
        >
          Change Password
        </button>
        <button
          style={{ height: "5vh", padding: "auto", margin: "auto",borderRadius:"5px",border:"none" }}
          // onClick={(event) => handdleLogout(event)}
        >
          LogOut
        </button>
        {isOpen && (
          <Popup
            content={
              <>
                <center>
                  <h3>Change Password</h3>
                </center>

                <form>
                  <center>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ fontSize: 15, fontWeight: "bold" }}>
                        New Password
                      </div>
                      <span
                        style={{ display: "inline-block", width: 25 }}
                      ></span>
                      <input
                        style={{ fontSize: 15 }}
                        type="text"
                        name="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(inputPassword) => {
                          // setPassword(inputPassword.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <button
                      type="button"
                      className="loginbtn"
                      // onClick={(event) => handlechangepassword()}
                      style={{ fontSize: 20, fontWeight: "bold" }}
                    >
                      Change
                    </button>
                  </center>
                </form>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div className="background1">
          <br />
          <h3>
            <u>Add New Task</u>
          </h3>

          {/* <form onSubmit={handlesubmit}> */}
          <form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>Task Name</div>
              <span style={{ display: "inline-block", width: 25 }}></span>
              <input
                style={{ fontSize: 15 }}
                type="text"
                name="taskname"
                placeholder="Enter your task name"
                value={taskname}
                onChange={(inputTaskname) => {
                  // setTaskname(inputTaskname.target.value);
                }}
              />
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>Deadline</div>
              <span style={{ display: "inline-block", width: 40 }}></span>
              <input
                style={{ fontSize: 15 }}
                type="text"
                name="taskdate"
                placeholder="Enter your dedline date"
                value={taskdate}
                onChange={(inputTaskdate) => {
                  // setTaskDate(inputTaskdate.target.value);
                }}
              />
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>
                Is Completed
              </div>
              <span style={{ display: "inline-block", width: 10 }}></span>
              <input
                style={{ fontSize: 15 }}
                type="text"
                name="taskiscompleted"
                placeholder="Type true or false"
                value={taskiscompleted}
                onChange={(inputtaskiscompleted) => {
                  // setaTaskIsCompleted(inputtaskiscompleted.target.value);
                }}
              />
            </div>

            <br />
            <center>
              <button
                className="loginbtn"
                type="submit"
                style={{ fontSize: 20, fontWeight: "bold" }}
                disabled={editstate == "1" ? true : false}
              >
                Submit
              </button>
            </center>
          </form>
          <br />
          <br />
          <br />

          <h3>
            <u>Edit Task</u>
          </h3>

          {/* <form onSubmit={handleEditTask}> */}
          <form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>Task Name</div>
              <span style={{ display: "inline-block", width: 25 }}></span>
              <input
                style={{ fontSize: 15 }}
                type="text"
                name="taskname"
                placeholder="Enter your task name"
                value={taskname}
                onChange={(inputTaskname) => {
                  // setTaskname(inputTaskname.target.value);
                }}
              />
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>Deadline</div>
              <span style={{ display: "inline-block", width: 40 }}></span>
              <input
                style={{ fontSize: 15 }}
                type="text"
                name="taskdate"
                placeholder="Enter your dedline date"
                value={taskdate}
                onChange={(inputTaskdate) => {
                  // setTaskDate(inputTaskdate.target.value);
                }}
              />
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>
                Is Completed
              </div>
              <span style={{ display: "inline-block", width: 10 }}></span>
              <input
                style={{ fontSize: 15 }}
                type="text"
                name="taskiscompleted"
                placeholder="Type true or false"
                value={taskiscompleted}
                onChange={(inputtaskiscompleted) => {
                  // setaTaskIsCompleted(inputtaskiscompleted.target.value);
                }}
              />
            </div>

            <br />
            <center>
              <button
                className="loginbtn"
                type="submit"
                style={{ fontSize: 20, fontWeight: "bold" }}
                disabled={editstate == "0" ? true : false}
              >
                Edit
              </button>
            </center>
          </form>
        </div>
        <div className="background2">
          <h1 style={{ textAlign: "center" }}>Tasks</h1>
          {/* <div>{userDetailsCards}</div>; */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
