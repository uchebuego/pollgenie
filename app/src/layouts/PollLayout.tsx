import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

export default function PollLayout() {
  const { status } = useAccount();
  const location = useLocation();

  if (status === "disconnected") {
    const currentPath = `${location.pathname}${location.search}`;
    return (
      <Navigate to={`/?redirect=${encodeURIComponent(currentPath)}`} replace />
    );
  }

  return (
    <div className="h-screen w-screen overflow-y-scroll py-20 px-5">
      <div className="mx-auto max-w-lg ">
        <Outlet />
      </div>
    </div>
  );
}
