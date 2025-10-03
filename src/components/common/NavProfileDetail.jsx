import { FaUser } from "react-icons/fa";
import { GiBanknote } from "react-icons/gi";
import { VscSignOut } from "react-icons/vsc";
import useUserStore from "../../store/userStore";
import useDashboardStore from "../../store/dashboardStore";
// import axios from "axios";
// import { useEffect } from "react";
import useConstStore from "../../store/constStore";
import { MdOutlineSecurity } from "react-icons/md";
import { useNavigate } from "react-router";

function NavProfileDetail({ setIsProfileDetailOpen }) {
  const { user, resetUser } = useUserStore();
  const { dashboardData, resetDashBoard } = useDashboardStore();
  const { setWalletAddress } = useConstStore();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // console.log(`${baseUrl}packages_list`);
  //       // console.log(token);
  //       const response = await axios.post(
  //         `${baseUrl}packages_list`,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="absolute z-50 bg-[#1F2C24] rounded right-6 top-13 sm:min-w-90 p-1 text-xs sm:text-sm">
      <div
        onClick={() => setIsProfileDetailOpen(false)}
        className="flex items-center gap-3 px-4 rounded py-1 cursor-pointer hover:bg-[#4f5e54] transition ease-in-out duration-300"
      >
        <FaUser className="bg-[#4f5e54] p-1 text-2xl rounded-full" />
        <div className="text-xs font-semibold ">
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
      </div>

      <div className="h-[1px] bg-[#4f5e54] my-1"></div>

      <div
        onClick={() => setIsProfileDetailOpen(false)}
        className="flex items-center gap-3 px-4 rounded py-1 cursor-pointer  hover:bg-[#4f5e54] transition ease-in-out duration-300"
      >
        <GiBanknote className="bg-[#4f5e54] p-1 text-2xl rounded-full" />
        <div className="text-xs font-semibold ">
          <div>
            Delegator Amount ${dashboardData.total_investment} / [Rank:{" "}
            {user.rank_name}]
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-[#4f5e54] my-1"></div>

      <div
        onClick={() => {
          navigate("/twofa");
          setIsProfileDetailOpen(false);
        }}
        className="flex items-center gap-3 px-4 rounded py-1 cursor-pointer  hover:bg-[#4f5e54] transition ease-in-out duration-300"
      >
        <MdOutlineSecurity className="bg-[#4f5e54] p-1 text-2xl rounded-full" />
        <div className="text-xs font-semibold ">
          <div>
            {" "}
            {user.status_2fa == "enable"  ? "Disable" : "Enable"} Two Factor
            Authentication
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-[#4f5e54] my-1"></div>

      <div
        onClick={() => {
          resetDashBoard();
          resetUser();
          setWalletAddress(null);
          setIsProfileDetailOpen(false);
        }}
        className="flex items-center gap-3 px-4 rounded py-1 cursor-pointer  hover:bg-[#4f5e54] transition ease-in-out duration-300"
      >
        <VscSignOut className="bg-[#4f5e54] p-1 text-2xl rounded-full" />
        <div className="text-xs font-semibold ">
          <div>Signout</div>
        </div>
      </div>
    </div>
  );
}

export default NavProfileDetail;
