import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./views/Home";
import PollLayout from "./layouts/PollLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PollLayout />,
    children: [],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
