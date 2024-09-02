import { Outlet } from "react-router-dom";

export default function PollLayout() {
  return (
    <div className="h-screen w-screen overflow-y-scroll p-28">
      <div className="mx-auto max-w-lg ">
        <Outlet />
      </div>
    </div>
  );
}
