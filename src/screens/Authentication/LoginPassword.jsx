import { useState } from "react";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { baseUrl, setMsg, setShowError, setShowSuccess } = useConstStore();
  const { user, token } = useUserStore();

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

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}updatePassword`,
        {
          user_id: user?.id,
          old_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == 200) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        showSuccess("Password updated successfully");
      }
    } catch (error) {
      showError(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex justify-center p-4">
      <div className="bg-[#1F2C24] mt-5 rounded-lg w-full sm:w-10/12 md:w-9/12 h-fit">
        <div className="text-lg font-semibold border-b py-3 px-5 border-[#35443b]">
          Change Password
        </div>
        <div className="py-5 px-5 flex flex-col gap-3">
          {/* Current Password */}
          <div className="flex flex-col relative">
            <span>
              Current Password <span className="text-red-500">*</span>
            </span>
            <input
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type={showCurrent ? "text" : "password"}
              className="bg-[#26362C] rounded px-3 py-0.5 pr-10"
            />
            <span
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-8 cursor-pointer text-gray-400"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="flex flex-col relative">
            <span>
              New Password <span className="text-red-500">*</span>
            </span>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              type={showNew ? "text" : "password"}
              className="bg-[#26362C] rounded px-3 py-0.5 pr-10"
            />
            <span
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-8 cursor-pointer text-gray-400"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col relative">
            <span>
              Confirm New Password <span className="text-red-500">*</span>
            </span>
            <input
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Re-Type Password"
              type={showConfirm ? "text" : "password"}
              className="bg-[#26362C] rounded px-3 py-0.5 pr-10"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-8 cursor-pointer text-gray-400"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 mt-5">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#22b357] hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
            >
              {loading ? "Resetting Password..." : "Submit"}
            </button>
            <button
              onClick={() => {
                setNewPassword("");
                setCurrentPassword("");
                setConfirmNewPassword("");
              }}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-400 transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPassword;
