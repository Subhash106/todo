import React from "react";
const Card = React.lazy(() => import("components/Card"));
const Button = React.lazy(() => import("components/Button"));
const TextInput = React.lazy(() => import("components/TextInput"));
const tasks = [
  { id: 1, title: "Task 1", status: true },
  { id: 1, title: "Task 2", status: false },
];

export default function App() {
  return (
    <div class="container">
      <h1>My Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>
              <TextInput
                id="taskInput"
                type="text"
                placeholder="Enter a task to do"
              />
            </th>
            <th colspan="3">
              <Button>Add</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(({ id, title, status }) => (
            <tr>
              <td>
                <Card>{title}</Card>
              </td>
              <td>
                <Button class="btn btn-small">Done</Button>
              </td>
              <td>
                <Button class="btn btn-small">Edit</Button>
              </td>
              <td>
                <Button class="btn btn-small">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
