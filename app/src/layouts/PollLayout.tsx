import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

export default function PollLayout() {
  const { status } = useAccount();

  if (status === "disconnected") {
    return <Navigate to="/polls" replace />;
  }

  return (
    <div className="h-screen w-screen overflow-y-scroll p-28">
      <div className="mx-auto max-w-lg ">
        <Outlet />
      </div>
    </div>
  );
}
