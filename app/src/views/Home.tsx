import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Navigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

export default function Home() {
  const { open } = useWeb3Modal();
  const { status } = useAccount();
  const location = useLocation();

  if (status === "connected") {
    const redirectPath = location.state?.redirect || "/polls";
    return <Navigate to={redirectPath} replace />;
  }

  const handleConnectWallet = async function () {
    await open({ view: "Connect" });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center px-5 py-28">
      <button
        onClick={handleConnectWallet}
        className="p-4 mt-4 bg-[#D323FF] text-white font-bold flex-1 text-xs max-w-sm items-center gap-4 rounded-lg"
      >
        Connect Wallet
      </button>
    </div>
  );
}
