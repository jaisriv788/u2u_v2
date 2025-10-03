import { useState } from "react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaCaretUp } from "react-icons/fa";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import useDashboardStore from "../../store/dashboardStore";

function DetailedCards({ amount, title, children, show, balanceRoi }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadTow, setLoadTwo] = useState(false);
  const { baseUrl, setMsg, setShowError, setShowSuccess } = useConstStore();
  const { user, token } = useUserStore();
  const { dashboardData } = useDashboardStore();

  function showError(msg) {
    setMsg(msg);
    setShowError(true);
    setTimeout(() => {
      setMsg("");
      setShowError(false);
    }, 7000);
  }

  function showSuccess(msg) {
    setMsg(msg);
    setShowSuccess(true);
    setTimeout(() => {
      setMsg("");
      setShowSuccess(false);
    }, 7000);
  }

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const response = await axios.post(
        `${baseUrl}storeTransfer`,
        {
          user_id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      if (response.data.status == 200) {
        showSuccess("Transfer Successful!");
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Transfer Failed!");
    } finally {
      setTimeout(() => {
        setIsModalOpen(false);
        setLoad(false);
      }, 500);
    }
  };

  const handleClaimReward = async () => {
    setLoadTwo(true);
    try {
      const response = await axios.post(
        `${baseUrl}dailyRoiSingleUser`,
        {
          user_id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == 200) {
        showSuccess("Claim Successful!");
        window.location.reload();
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      alert("Claim Failed!");
    } finally {
      setTimeout(() => {
        setIsModal2Open(false);
        setLoadTwo(false);
      }, 500);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0F0F1D] via-[#102031] to-[#24BB79] rounded-lg px-4 py-6 flex gap-3 relative">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-[#19203C] rounded-lg">
            <RiMoneyDollarBoxFill size={28} />
          </div>
          <div>
            <div className="text-md">{title}</div>
            <div className="text-xl font-bold">
              <span className="font-semibold text-[#1FD022] text-xl">$</span>{" "}
              {amount ? amount : "0.0000"}
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <FaCaretUp />
          {children}
        </div>
        {show && (
          <div className="flex-1 flex sm:hidden gap-3 justify-center items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r font-semibold hover:text-black from-[#00D8FA] to-[#00FFA5] hover:from-[#00FFA5] hover:to-[#00D8FA] text-sm sm:text-base px-3 py-1.5 rounded-full cursor-pointer transition ease-in-out duration-300"
            >
              Transfer ${balanceRoi}
            </button>
            <button
              onClick={() => setIsModal2Open(true)}
              disabled={dashboardData?.today_claim_status == "claimed"}
              className="bg-gradient-to-r font-semibold hover:text-black from-[#00D8FA] to-[#00FFA5] hover:from-[#00FFA5] hover:to-[#00D8FA] px-3  py-1.5 text-sm sm:text-base rounded-full cursor-pointer transition ease-in-out duration-300"
            >
              {dashboardData?.today_claim_status == "claimed"
                ? "Already Claimed"
                : "Claim Daily Reward"}
            </button>
          </div>
        )}
      </div>

      {show && (
        <div className="flex-1 hidden sm:flex flex-col gap-3 justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r w-3/4 md:w-1/2 lg:w-full font-semibold hover:text-black from-[#00D8FA] to-[#00FFA5] hover:from-[#00FFA5] hover:to-[#00D8FA] px-3 py-1.5 rounded-full cursor-pointer transition ease-in-out duration-300"
          >
            Transfer ${balanceRoi}
          </button>
          <button
            onClick={() => setIsModal2Open(true)}
            disabled={dashboardData?.today_claim_status == "claimed"}
            className="bg-gradient-to-r w-3/4 md:w-1/2 lg:w-full font-semibold hover:text-black from-[#00D8FA] to-[#00FFA5] hover:from-[#00FFA5] hover:to-[#00D8FA] px-3 py-1.5 rounded-full cursor-pointer transition ease-in-out duration-300"
          >
            {dashboardData?.today_claim_status == "claimed"
              ? "Already Claimed"
              : "Claim Daily Reward"}
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-40">
          <div className="bg-[#0F0F1D] rounded-2xl p-6 w-96 flex flex-col gap-6 shadow-xl border border-[#1A1A2E]">
            <h2 className="text-xl font-bold text-white text-center">
              Confirm Transfer
            </h2>
            <p className="text-gray-300 text-center">
              Are you sure you want to transfer{" "}
              <span className="font-semibold text-[#1FD022]">
                ${balanceRoi}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={load}
                className="px-5 py-2 cursor-pointer bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={load}
                className="px-5 py-2 cursor-pointer bg-gradient-to-r from-[#00D8FA] to-[#00FFA5] text-black font-semibold rounded-lg hover:from-[#00FFA5] hover:to-[#00D8FA] transition"
              >
                {load ? "Transfering..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isModal2Open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-40">
          <div className="bg-[#0F0F1D] rounded-2xl p-6 w-96 flex flex-col gap-6 shadow-xl border border-[#1A1A2E]">
            <h2 className="text-xl font-bold text-white text-center">
              Confirm
            </h2>
            <p className="text-gray-300 text-center">
              Are you sure you want to claim daily reward?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsModal2Open(false)}
                disabled={loadTow}
                className="px-5 py-2 cursor-pointer bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleClaimReward}
                disabled={loadTow}
                className="px-5 py-2 cursor-pointer bg-gradient-to-r from-[#00D8FA] to-[#00FFA5] text-black font-semibold rounded-lg hover:from-[#00FFA5] hover:to-[#00D8FA] transition"
              >
                {loadTow ? "Claiming..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedCards;
