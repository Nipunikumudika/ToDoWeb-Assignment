import React, { useState } from "react";
import axios from "axios";

function AddTaskForm() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [taskiscompleted, setTaskiscompleted] = useState(false);
  const [userid, setUserid] = useState<number>(1);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      setTaskName("");
      setDate("");
      setTaskiscompleted(false);
    } catch (error) {
      alert("Failed to add ToDoTask");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
