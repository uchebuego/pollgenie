import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import PollLayout from "./layouts/PollLayout";
import NewPoll from "./views/NewPoll";
import { AppKitProvider } from "./context/appkit.context";

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
