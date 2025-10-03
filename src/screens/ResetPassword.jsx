import { Link, useNavigate } from "react-router";
import icon from "../assets/Navbar/logo.jpg";
import { RiLockPasswordFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import useConstStore from "../store/constStore";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { token } = useParams();
  const { baseUrl } = useConstStore();

  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    if (password !== rePassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    if (password == "" || rePassword == "") {
      alert("Password fields cannot be empty");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}submitResetPassword`, {
        token: token,
        password: password,
        password_confirmation: rePassword,
      });
      if (response.data.status == 200) {
        setPassword("");
        setRePassword("");
        alert("password reset successful");
        setLoading(false);
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-[#F2F2F2]">
      <div className="bg-white shadow-xl p-4 max-w-100 rounded-xl w-96">
        <img src={icon} alt="Logo" className="w-7 mx-auto my-3" />
        <div className="font-bold text-xl text-center">Reset Password</div>

        {/* Password Input */}
        <div
          className="flex items-center mt-3 rounded-full px-5 py-3 text-lg gap-3 
             bg-white shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff]"
        >
          <RiLockPasswordFill className="text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full bg-transparent focus:outline-none font-semibold text-gray-700"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
          >
            {showPassword ? (
              <RiEyeOffFill className="text-gray-500" />
            ) : (
              <RiEyeFill className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Re-enter Password Input */}
        <div
          className="flex items-center mt-3 rounded-full px-5 py-3 text-lg gap-3 
             bg-white shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff]"
        >
          <RiLockPasswordFill className="text-gray-500" />
          <input
            type={showRePassword ? "text" : "password"}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-Enter Password"
            className="w-full bg-transparent focus:outline-none font-semibold text-gray-700"
          />
          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="focus:outline-none"
          >
            {showRePassword ? (
              <RiEyeOffFill className="text-gray-500" />
            ) : (
              <RiEyeFill className="text-gray-500" />
            )}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={Loading}
          className="my-4 bg-[#A32A91] text-white text-lg font-semibold py-2 rounded-full hover:bg-black transition ease-in-out duration-300 cursor-pointer w-full"
        >
          {Loading ? "Processing..." : "Reset Password"}
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

export default ResetPassword;
