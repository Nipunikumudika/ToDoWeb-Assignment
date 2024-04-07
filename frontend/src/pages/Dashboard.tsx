import "./Dashboard.css";

import { useLocation } from "react-router-dom";
import check from "../Images/check.jpg";
import cross from "../Images/cross.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
import Popup from "../components/popup";
import { ToDoTask } from "../Models/ToDoTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  // const navigate = useNavigate();
  const bcrypt = require("bcryptjs");
  const [isOpen, setIsOpen] = useState(false);

  // const location = useLocation();
  const [userid, setUserid] = useState<number>();
  const [taskid, setTaskid] = useState<number>();
  const [taskName, setTaskname] = useState<string>("");
  const [taskdate, setTaskDate] = useState<string>("");
  const [taskiscompleted, setTaskIsCompleted] = useState<boolean>(false);
  const [editState, setEditState] = useState<number>(0);
  const [allTasks, setAllTasks] = useState<ToDoTask[]>([]);
  const [password, setPassword] = useState<string>("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = async (
    event: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    event.preventDefault();
    setEditState(1);
    try {
      const url = `http://localhost:5000/tasks/${key}`;
      const response = await axios.get<ToDoTask>(url);
      setTaskid(key);
      setTaskname(response.data.taskName);
      setTaskDate(response.data.date);
      setTaskIsCompleted(response.data.taskStatus);
    } catch (error) {
      console.log("Error editing ToDoTask:", error);
    }
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    event.preventDefault();
    try {
      const url = `https://localhost:7110/api/Tasks?id=${key}`;

      console.log(url);
      const response = await axios.delete(url);
      console.log(response);
      console.log("ToDoTask deleted successfully");
      fetchData();
    } catch (error) {
      alert("Error! Cannot Delete");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewTask = async () => {
    const url = "https://localhost:7110/api/Tasks";
    try {
      const dateTime = new Date(`${date}T${time}`);
      const submitData = {
        userId: userid,
        taskName: taskName,
        date: dateTime,
        taskStatus: taskiscompleted,
        description: description,
      };
      const response = await axios.post(url, submitData);
      console.log(response);
      alert("ToDoTask added successfully");
      setTaskname("");
      setDate("");
      setTaskIsCompleted(false);
    } catch (error) {
      alert("Failed to add ToDoTask");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7110/api/Tasks");
      setAllTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const userDetailsCards = allTasks.map((ToDoTask, key) => {
    console.log(allTasks);
    let image = cross;
    if (ToDoTask.taskStatus === true) {
      image = check;
    }
    return (
      <div className="card-bg" key={ToDoTask.id}>
        <img src={image} alt="user photo" className="card-image" />
        <div style={{ display: "flex", flexDirection: "column", width: "96%" }}>
          <div className="card-name">{ToDoTask.taskName}</div>
          <div className="card-description">{ToDoTask.description}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="card-date">
                {new Date(ToDoTask.date).toLocaleDateString()}
              </div>
              <div className="card-time">
                {new Date(ToDoTask.date).toLocaleTimeString()}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                className="btn-edit"
                onClick={(event) => handleEdit(event, ToDoTask.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="btn-delete"
                onClick={(event) => handleDelete(event, ToDoTask.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // navigate("../");
  };

  return (
    <div className="background">
      <div
        style={{
          backgroundColor: "rgb(133, 245, 12)",
          width: "150px",
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
          style={{
            height: "5vh",
            padding: "auto",
            margin: "10px",
            borderRadius: "5px",
            border: "none",
            width:"100%",
            backgroundColor:"transparent",
            cursor:"pointer"
          }}
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

      <div className="background2">
        <h1 style={{ textAlign: "center" }}>Tasks</h1>
        {/* add a task */}
        <center>
          <form onSubmit={handleNewTask}>
            <input
              className="inputName"
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskname(e.target.value)}
            />
            <input
              className="inputDescription"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="inputDate"
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="inputTime"
              type="time"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button className="addButton" type="submit">
              Add Task
            </button>
          </form>
        </center>
        <div>{userDetailsCards}</div>;
      </div>
    </div>
  );
}

export default Dashboard;
