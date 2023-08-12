import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../setuptests";
import { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";

import Greetings from "..";

const user = userEvent.setup();

describe("Testing Greeting component", () => {
  it("Should render the component", async () => {
    render(<Greetings />);
    server.use(
      rest.get("./data/greetings.json", (req, res, ctx) => {
        return res(ctx.json([{ text: "hello" }, { text: "Hi" }]));
      })
    );
    expect(screen.getByText("Load Greetings")).toBeInTheDocument();

    await user.click(screen.getByText("Load Greetings"));

    await screen.findByRole("heading");
  });

  it("Should handle the server error", async () => {
    server.use(
      rest.get("./data/greetings.json", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Greetings />);

    act(() => {
      fireEvent.click(screen.getByText("Load Greetings"));
    });

    expect(
      await screen.findByText("Request failed with status code 500")
    ).toBeInTheDocument();
  });
});
