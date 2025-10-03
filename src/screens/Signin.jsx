import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useConstStore from "../store/constStore";
import useUserStore from "../store/userStore";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userDetails = location.state?.details;

  const { baseUrl, setMsg, setShowSuccess, setShowError, setScreenLoading } =
    useConstStore();
  const { setUser, setIsConnected, setToken } = useUserStore();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // console.log({
    //   username: username,
    //   password: password,
    // });
    try {
      // console.log(`${baseUrl}login`);
      // console.log({
      //   username: username,
      //   password: password,
      // });
      const response = await axios.post(`${baseUrl}login`, {
        username: username,
        password: password,
      });

      // console.log({ response });
      if (response.data.status == 200) {
        setMsg(response.data.msg);
        setUser(response.data.user);
        setShowSuccess(true);
        setScreenLoading(true);
        setTimeout(() => {
          setMsg("");
          setShowSuccess(false);
          navigate("/dashboard");
        }, 7000);
        setIsConnected(true);
        setToken(response.data.token);
      } else if (response.data.status == 201) {
        setMsg(response.data.msg);
        setShowError(true);
        setTimeout(() => {
          setMsg("");
          setShowError(false);
        }, 7000);
      } else {
        console.log("Error", response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="bg-white text-black px-5 py-4 rounded-lg max-w-100">
        <div>
          <div className="text-xl">WELCOME TO U2U GLOBAL REWARD PROGRAM</div>
          <div className="text-[12px] font-[600] mt-2">
            To keep connected with us please Sign up with your personal
            information by email address and password.
          </div>
        </div>
        {userDetails && (
          <div className="bg-green-300/60 rounded mt-3 px-2 py-1 text-green-700">
            <div>Registration Done Successfully</div>
            <div>User Id : {userDetails.username}</div>
            <div>Password : {userDetails.show_pass}</div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-[#38C66C] font-semibold py-2 rounded cursor-pointer border border-black hover:border-amber-400 transition ease-in-out duration-300"
          >
            {loading ? "Logging In..." : "LOGIN"}
          </button>
        </form>
        <div className="mt-5 text-sm text-purple-800">
          <Link to="/forgetpassword" className="cursor-pointer">
            Forgot Password?
          </Link>{" "}
          <Link to="/register" className="cursor-pointer">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
