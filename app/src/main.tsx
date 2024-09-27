import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import PollLayout from "./layouts/PollLayout";
import NewPoll from "./views/NewPoll";
import { AppKitProvider } from "./context/appkit.context";
import Polls from "./views/Polls";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PollLayout />,
    children: [
      {
        path: "new",
        element: <NewPoll />,
      },
      {
        path: "polls",
        element: <Polls />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppKitProvider>
      <RouterProvider router={router} />
    </AppKitProvider>
  </StrictMode>
);
