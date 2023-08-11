import { waitFor, act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./app";

test("Should render the App", async () => {
  render(<App />);

  const textInput = screen.getByRole("textbox");
  const addUpdateButton = screen.getByRole("button", { name: "Add" });
  const mockSubmt = jest.fn();

  await waitFor(async () => {
    expect(screen.getByText("My Tasks")).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(addUpdateButton).toBeInTheDocument();
    expect(addUpdateButton).toBeDisabled();

    //Add task
    await userEvent.type(textInput, "new task");
    expect(addUpdateButton).not.toBeDisabled();
    await userEvent.click(addUpdateButton);
    const newTask = screen.getAllByRole("row", { name: /new task/ })[0];
    expect(newTask).toBeInTheDocument();

    //update the task
    const editTask = screen.getAllByRole("button", { name: "Edit" })[2];
    await userEvent.click(editTask);
    await userEvent.type(textInput, "new task updated");
    const updateButton = screen.getByRole("button", { name: "Update" });
    await userEvent.click(updateButton);
    const updatedTask = screen.getAllByRole("row", {
      name: /new task updated/,
    })[0];
    expect(updatedTask).toBeInTheDocument();

    //mark a task complete
    const markATask = screen.getAllByRole("button", { name: "Done" })[2];
    await userEvent.click(markATask);
    expect(markATask).toBeDisabled();
    expect(editTask).toBeDisabled();

    //delete a task
    const deleteTask = screen.getAllByRole("button", { name: "Delete" })[2];
    await userEvent.click(deleteTask);
    const updatedTsk = screen.queryByRole("row", {
      name: /new task updated/,
    });
    expect(updatedTsk).toBeNull();
  });
});
