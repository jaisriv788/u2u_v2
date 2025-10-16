import { FaCopy } from "react-icons/fa";
import useUserStore from "../../store/userStore";

function Intro() {
  const { user } = useUserStore();
  return (
    <div className="py-3 flex justify-between">
      <div>
        <div className="font-semibold text-[18px]">
          WELCOME <span className="text-[#1DCD1D]">U2U DELEGATOR REWARD</span>{" "}
          PROGRAM
        </div>
        {user?.username && <div className="text-sm"><span className="font-semibold">User ID:</span> {user?.username}</div>}
        {user?.wallet_address_main && <div className="text-sm flex gap-2 items-center"><span className="font-semibold">Wallet Address:</span> <span className="hidden sm:inline">{user?.wallet_address_main}</span> <span className="sm:hidden">{user?.wallet_address_main.slice(0, 8) + ".." + user?.wallet_address_main.slice(-8)}</span> <FaCopy className="hover:text-gray-400 transition ease-in-out duration-300 cursor-pointer" onClick={() => navigator.clipboard.writeText(user?.wallet_address_main).then(() => alert("Address Copied."))} /></div>}
      </div>
      <div className="text-sm self-end hidden sm:flex">Dashboard</div>
    </div>
  );
}

export default Intro;
