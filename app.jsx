import React, { useState } from "react";

import { Button } from "@subashchandra/components";

const Card = React.lazy(() => import("components/Card"));
const ButtonMF = React.lazy(() => import("components/Button"));
const TextInput = React.lazy(() => import("components/TextInput"));

import "./style.css";

export default function App() {
  const [addOrUpdate, setAddOrUpdate] = useState("Add");
  const [task, setTask] = useState({ id: "", title: "", status: false });
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: true },
    { id: 2, title: "Task 2", status: false },
  ]);

  const addTaskHandler = () => {
    if (addOrUpdate === "Add") {
      setTasks(tasks.concat({ ...task, id: tasks.length + 1 }));
    } else {
      setTasks([...tasks.filter((tsk) => tsk.id !== task.id), task]);
    }

    setTask({ ...task, title: "" });
    setAddOrUpdate("Add");
  };

  const markATaskDoneHandler = (id) => {
    setTasks(
      tasks.map((tsk) => {
        if (tsk.id === id) {
          tsk.status = true;
        }

        return tsk;
      })
    );
  };

  const editTaskHandler = (id) => {
    setAddOrUpdate("Update");
    setTask(tasks.find((tsk) => tsk.id === id));
  };

  const deleteTaskHandler = (id) => {
    setTasks(tasks.filter((tsk) => tsk.id !== id));
  };

  const inputChangeHandler = (e) => {
    const {
      target: { value },
    } = e;

    setTask({ ...task, title: value });
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>
              <TextInput
                id="taskInput"
                type="text"
                placeholder="Enter a task to do"
                value={task.title}
                onChange={inputChangeHandler}
              />
            </th>
            <th colSpan="3">
              <ButtonMF onClick={addTaskHandler}>{addOrUpdate}</ButtonMF>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(({ id, title, status }) => (
            <tr key={id}>
              <td>
                <Card type={status ? "success" : "basic"}>{title}</Card>
              </td>
              <td>
                <Button
                  className="btn btn-small"
                  onClick={() => markATaskDoneHandler(id)}
                  disabled={status}
                >
                  Done
                </Button>
              </td>
              <td>
                <Button
                  className="btn btn-small"
                  onClick={() => editTaskHandler(id)}
                  disabled={status}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  className="btn btn-small"
                  onClick={() => deleteTaskHandler(id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
