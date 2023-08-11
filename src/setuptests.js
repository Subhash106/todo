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
          id: "f8dd058f-9006-4174-8d49-e3086bc39c21",
          text: `Avoid Nesting When You're Testing`,
        },
        {
          id: "8ac96078-6434-4959-80ed-cc834e7fef61",
          text: `How I Built A Modern Website In 2021`,
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
