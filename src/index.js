import "../style.css";

const addTask = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const tasksContainer = document.getElementById("tasksContainer");

const tasks = [
  { id: 1, title: "Task 1", status: true },
  { id: 2, title: "Task 2", status: false },
];

addTask.addEventListener("click", function () {
  const inputValue = taskInput.value;

  console.log(inputValue);

  if (!inputValue) return;

  tasks.push({ id: tasks.length, title: inputValue, status: false });
  renderTask(tasks);
});

function renderTask(tasks) {
  const tasksHtml = tasks
    .map(
      ({ id, title, status }) => `
    <tr>
      <td>
        <div class="card card-${
          status === true ? "done" : "basic"
        }">${title}</div>
      </td>
      <td>
        <button class="btn btn-small">Done</button>
      </td>
      <td>
        <button class="btn btn-small">Edit</button>
      </td>
      <td>
        <button class="btn btn-small">Delete</button>
      </td>
    </tr>`
    )
    .join("");

  console.log(tasksHtml);

  tasksContainer.innerHTML = tasksHtml;
}

renderTask(tasks);
