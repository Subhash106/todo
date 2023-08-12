import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { rest } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!
  rest.get("./data/greetings.json", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          text: "Hello there",
        },
        {
          text: "Hi",
        },
        {
          text: "Hey",
        },
        {
          text: "What's up",
        },
        {
          text: "How are you?",
        },
      ])
    );
  })
);

// Enable request interception.
beforeAll(() => server.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => server.close());
