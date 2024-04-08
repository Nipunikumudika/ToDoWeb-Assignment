import "./Dashboard.css";

import { useLocation } from "react-router-dom";
import check from "../Images/check.png";
import cross from "../Images/cross.png";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
import Popup from "../components/popup";
import { ToDoTask } from "../Models/ToDoTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  // const navigate = useNavigate();
  const bcrypt = require("bcryptjs");
  const [isOpen, setIsOpen] = useState(false);

  // const location = useLocation();
  const [userid, setUserid] = useState<number>(1);
  const [taskid, setTaskid] = useState<number>();
  const [taskName, setTaskname] = useState<string>("");
  const [taskiscompleted, setTaskIsCompleted] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<ToDoTask[]>([]);
  const [password, setPassword] = useState<string>("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setTaskname("");
    setDescription("");
    setDate("");
    setTime("");
    setTaskIsCompleted(false);
  };

  const handleEditView = async (
    event: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    event.preventDefault();
    setIsOpen(true);
    try {
      const url = `https://localhost:7110/api/Tasks/${key}`;
      console.log(url);
      const response = await axios.get(url);
      console.log(response);
      setTaskid(key);
      setTaskname(response.data.taskName);
      setDescription(response.data.description);
      const dateTimeString = response.data.date;
      const [dateString, timeString] = dateTimeString.split("T");
      const date = new Date(dateString);
      const time = new Date(`1970-01-01T${timeString}`);
      const formattedDate = date.toISOString().split("T")[0]; // Extracting date part
      const formattedTime = time.toTimeString().split(" ")[0]; // Extracting time part

      setDate(formattedDate);
      setTime(formattedTime);
      setTaskIsCompleted(response.data.taskStatus);
      console.log(response);
    } catch (error) {
      console.log("Error editing ToDoTask:", error);
    }
  };

  const handleEditChange = async () => {
    console.log("changing");

    try {
      const url = `https://localhost:7110/api/Tasks/${taskid}`;
      const dateTime = new Date(`${date}T${time}`);
      console.log(dateTime);
      const currentDate = new Date();
      if (dateTime < currentDate) {
        toast("Error! Check Date & Time");
        return;
      }
      
      const formattedDateTime = dateTime
        .toISOString()
        .replace(/\.(\d+)Z$/, ".$1");
      console.log(formattedDateTime);

      const submitData = {
        id: taskid,
        userId: userid,
        taskName: taskName,
        date: formattedDateTime,
        taskStatus: taskiscompleted,
        description: description,
      };
      console.log(submitData);

      const response = await axios.put(url, submitData);
      setTaskname("");
      setDescription("");
      setDate("");
      setTime("");
      setTaskIsCompleted(false);
      fetchData();
      togglePopup();
    } catch (error) {
      console.log("Error updating ToDoTask:", error);
    }
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    event.preventDefault();
    try {
      const url = `https://localhost:7110/api/Tasks?id=${key}`;
      const response = await axios.delete(url);
      console.log(response);
      console.log("ToDoTask deleted successfully");
      toast("Deleted!");
      fetchData();
    } catch (error) {
      toast("Error!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "https://localhost:7110/api/Tasks";
    try {
      const dateTime = new Date(`${date}T${time}`);
      const currentDate = new Date();
      if (dateTime < currentDate) {
        toast("Failed to add ToDoTask. Check Date & Time!");
        return;
      }
      const submitData = {
        userId: userid,
        taskName: taskName,
        date: dateTime,
        taskStatus: taskiscompleted,
        description: description,
      };
      const response = await axios.post(url, submitData);
      console.log(response);
      toast("Added!");
      setTaskname("");
      setDescription("");
      setTime("");
      setDate("");
      setTaskIsCompleted(false);
      fetchData();
    } catch (error) {
      console.log(error);
      toast("Error!");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7110/api/Tasks");
      if (response && response.data && Array.isArray(response.data)) {
        // Filter tasks based on userid
        const filteredTasks = response.data.filter(task => task.userId === userid);
        
        // Sort the filtered tasks by date
        const sortedTasks = filteredTasks.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        
        // Set the filtered and sorted tasks in state
        setAllTasks(sortedTasks);
      } else {
        console.error("Invalid response format or data structure:", response);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  
  

  const userDetailsCards = allTasks.map((ToDoTask, key) => {
    let image = cross;
    if (ToDoTask.taskStatus === true) {
      image = check;
    }
    const currentDate = new Date();
    const taskDate = new Date(ToDoTask.date);
   
    return (
      <div className={`card-bg ${(new Date(ToDoTask.date) < currentDate && ToDoTask.taskStatus === false) ? 'past-task' : (new Date(ToDoTask.date) < currentDate && ToDoTask.taskStatus === true ? 'completed-task' : '')}`} key={ToDoTask.id}>
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
                onClick={(event) => handleEditView(event, ToDoTask.id)}
              >
                <FontAwesomeIcon icon={faEdit} className="icon" />
              </button>
              <button
                className="btn-delete"
                onClick={(event) => handleDelete(event, ToDoTask.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="icon" />
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
     <ToastContainer />
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
            width: "100%",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          // onClick={(event) => handdleLogout(event)}
        >
          LogOut
        </button>
      </div>

      <div className="background2">
        <h1 style={{ textAlign: "center" }}>My Tasks List</h1>
        {/* add a task */}
        <center>
          <form onSubmit={handleNewTask}>
            <input
              className="inputName"
              type="text"
              placeholder="Task Name"
              value={isOpen ? "" : taskName}
              onChange={(e) => setTaskname(e.target.value)}
            />
            <input
              className="inputDescription"
              type="text"
              placeholder="Description"
              value={isOpen ? "" : description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="inputDate"
              type="date"
              placeholder="Date"
              value={isOpen ? "" : date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="inputTime"
              type="time"
              placeholder="Time"
              value={isOpen ? "" : time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button className="addButton" type="submit">
              Add Task
            </button>
          </form>
        </center>
        {/* show tasks */}
        <div className="srollingWindow">{userDetailsCards}</div>;
        {/* show edit window */}
        {isOpen && (
          <Popup
            content={
              <>
                <center>
                  <h3>Edit Task</h3>
                </center>

                <form>
                  <center>
                    <div style={{ justifyContent: "center" }}>
                      <div className="formRows">
                        <label
                          htmlFor="taskName"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          Task Name
                        </label>
                        <input
                          id="taskName"
                          className="input-field"
                          type="text"
                          placeholder="Enter task name"
                          value={taskName}
                          onChange={(e) => setTaskname(e.target.value)}
                        />
                      </div>

                      <div className="formRows">
                        <label
                          htmlFor="taskDescription"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          Task Description
                        </label>
                        <input
                          id="taskDescription"
                          className="input-field"
                          type="text"
                          placeholder="Enter task description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="formRows">
                        <label
                          htmlFor="taskDate"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          Date
                        </label>
                        <input
                          className="datetimeInput"
                          id="taskDate"
                          type="date"
                          placeholder="Enter task date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>

                      <div className="formRows">
                        <label
                          htmlFor="taskTime"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          Time
                        </label>
                        <input
                          className="datetimeInput"
                          id="taskTime"
                          type="time"
                          placeholder="Enter task time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>

                      <div className="formRows">
                        <label
                          htmlFor="taskStatus"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          Status
                        </label>
                        <select
                          className="statusInput"
                          id="taskStatus"
                          value={taskiscompleted ? "true" : "false"}
                          onChange={(e) =>
                            setTaskIsCompleted(e.target.value === "true")
                          }
                        >
                          <option value="true">Completed</option>
                          <option value="false">Not Completed</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <button
                      type="button"
                      className="changeBtn"
                      style={{ fontSize: 20, fontWeight: "bold" }}
                      onClick={handleEditChange}
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
    </div>
  );
}

export default Dashboard;
