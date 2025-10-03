import { Link } from "react-router";
import icon from "../assets/Navbar/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import useConstStore from "../store/constStore";

function ForgetPassword() {
  const [userId, setUserId] = useState("");
  const { baseUrl } = useConstStore();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}submitForgetPassword`, {
        user_id: userId,
        url: "https://u2uglobal.xyz/resetpassword",
      });
      console.log(response)
      if (response.data.status == 200) {
        setUserId("");
        alert("Email sent successfully. Please check your email.");
      }
    } catch (err) {
      alert(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center  bg-[#F2F2F2]">
      <div className="bg-white shadow-xl p-4 max-w-100 rounded-xl">
        <img src={icon} alt="Logo" className="w-7 mx-auto my-3" />
        <div className="text-sm text-center">
          Too keep connected with us please login with your personal information
          by email address and password.
        </div>

        <div
          className="flex items-center mt-3 rounded-full px-5 py-3 text-lg gap-3 
             bg-white shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff]"
        >
          <FaRegUser className="text-gray-500" />
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User Id"
            className="w-full bg-transparent focus:outline-none font-semibold text-gray-700"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="my-4 bg-[#A32A91] text-white text-lg font-semibold py-2 rounded-full hover:bg-black transition ease-in-out duration-300 cursor-pointer w-full"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link
            to="/signin"
            className="font-bold hover:text-[#A32A91] transition ease-in-out duration-300 underline"
          >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
