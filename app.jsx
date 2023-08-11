import React, { Suspense, useState } from "react";

//import { button } from "@subashchandra/components";

//const div = React.lazy(() => import("components/div"));
//const button = React.lazy(() => import("components/button"));
//const TextInput = React.lazy(() => import("components/TextInput"));

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
    <Suspense fallback={<p>Loading...</p>}>
      <div className="container">
        <h1>My Tasks</h1>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  id="taskInput"
                  type="text"
                  placeholder="Enter a task to do"
                  value={task.title}
                  onChange={inputChangeHandler}
                />
              </th>
              <th colSpan="3">
                <button onClick={() => addTaskHandler()} disabled={!task.title}>
                  {addOrUpdate}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ id, title, status }) => (
              <tr key={id}>
                <td>
                  <div type={status ? "success" : "basic"}>{title}</div>
                </td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => markATaskDoneHandler(id)}
                    disabled={status}
                  >
                    Done
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => editTaskHandler(id)}
                    disabled={status}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => deleteTaskHandler(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
}
