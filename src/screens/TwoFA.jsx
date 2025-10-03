import { useEffect, useState } from "react";
import useConstStore from "../store/constStore";
import useUserStore from "../store/userStore";
import axios from "axios";

function TwoFA() {
  const { baseUrl, setScreenLoading, setMsg, setShowError, setShowSuccess } =
    useConstStore();
  const { token, user, setUser } = useUserStore();

  const [enable, setEnable] = useState(false);
  const [disable, setDisable] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [text, setText] = useState("");
  const [code, setCode] = useState("");

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

  useEffect(() => {
    async function fetchQr() {
      try {
        setScreenLoading(true);
        const response = await axios.post(
          `${baseUrl}2fasetup`,
          { user_id: user?.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setText(response.data.data.qrCode);
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setScreenLoading(false);
      }
    }

    {
      user.status_2fa == "disable" && fetchQr();
    }

    return () => {
      console.log("Component unmounted — canceling request");
    };
  }, [refresh]);

  async function handleEnable() {
    setEnable(true);
    const response = await axios.post(
      `${baseUrl}enable`,
      { user_id: user?.id, otp: code },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.data.status == 200) {
      setScreenLoading(true);
      const res = await axios.post(
        `${baseUrl}user_detail`,
        { user_id: user?.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ ashutosh: res });
      setUser({
        ...res.data.data.user,
        delegator_amount: res.data.data.delegator_amount,
        image: res.data.data.image,
        rank_name: res.data.data.rankname,
      });
      setCode("");
      showSuccess("Two Factor Authentication Enabled.");
      setScreenLoading(false);
    } else {
      showError(response.data.msg);
    }
    setEnable(false);
  }

  async function handleDisable() {
    setDisable(true);
    const response = await axios.post(
      `${baseUrl}disable`,
      { user_id: user?.id, otp: code },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response);

    if (response.data.status == 200) {
      setScreenLoading(true);
      const res = await axios.post(
        `${baseUrl}user_detail`,
        { user_id: user?.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log({ ashutosh: res });
      setUser({
        ...res.data.data.user,
        delegator_amount: res.data.data.delegator_amount,
        image: res.data.data.image,
        rank_name: res.data.data.rankname,
      });
      setCode("");
      setRefresh(!refresh);
      showSuccess("Two Factor Authentication Disabled.");
      setScreenLoading(false);
    } else {
      showError(response.data.msg);
    }
    setDisable(false);
  }

  return (
    <div className="p-4 flex-1 overflow-x-hidden flex flex-col gap-3 items-center">
      <div className="flex justify-between items-center w-full">
        <div className="text-lg font-semibold">Two Factor Authentication</div>
        <div className="text-xs">
          <span className="text-green-300">Authentication</span> {">>"} 2-FA
        </div>
      </div>

      {user.status_2fa == "enable" ? (
        <div className="bg-[#1F2C24] p-6 w-full md:w-1/2 h-fit flex flex-col items-center gap-5 rounded-2xl shadow-lg">
          {/* Title */}
          <h2 className="text-lg md:text-xl font-semibold text-white text-center">
            Disable Two-Factor Authentication
          </h2>

          {/* Input Section */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-gray-300">One-Time Password</label>
            <input
              onChange={(e) => setCode(e.target.value)}
              value={code}
              type="number"
              placeholder="Enter 6-digit code"
              className="bg-[#26362C] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#22b357] placeholder-gray-500"
            />
            <button
              onClick={handleDisable}
              disabled={disable}
              className="bg-[#22b357] disabled:cursor-not-allowed cursor-pointer text-white font-medium w-full py-2 rounded-lg mt-3 
                 hover:bg-[#56CF82] transition duration-300 shadow-md"
            >
              {disable ? "Disabling..." : "Disable 2FA"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#1F2C24] p-6 w-full md:w-1/2 h-fit flex flex-col items-center gap-5 rounded-2xl shadow-lg">
          {/* Title */}
          <h2 className="text-lg md:text-xl font-semibold text-white text-center">
            Enable Two-Factor Authentication
          </h2>

          {/* QR Code */}
          <div className="p-3 bg-[#26362C] rounded-lg shadow-md">
            <img
              src={`data:image/svg+xml;base64,${text}`}
              alt="2FA QR Code"
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>

          {/* Input Section */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-gray-300">One-Time Password</label>
            <input
              onChange={(e) => setCode(e.target.value)}
              value={code}
              type="number"
              placeholder="Enter 6-digit code"
              className="bg-[#26362C] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#22b357] placeholder-gray-500"
            />
            <button
              onClick={handleEnable}
              disabled={enable}
              className="bg-[#22b357] disabled:cursor-not-allowed cursor-pointer text-white font-medium w-full py-2 rounded-lg mt-3 
                 hover:bg-[#56CF82] transition duration-300 shadow-md"
            >
              {enable ? "Enabling... " : "Enable 2FA"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwoFA;
