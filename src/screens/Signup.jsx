import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import useConstStore from "../store/constStore";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
function Signup() {
  const { referralId: referralIdParam } = useParams();
  const [referralLocked, setReferralLocked] = useState(false);
  const [referralId, setReferralId] = useState("");

  const [debouncedReferralId, setDebouncedReferralId] = useState(referralId);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);

  const { baseUrl, setMsg, setShowSuccess } = useConstStore();

  const navigate = useNavigate();

  function showSuccess(msg) {
    setMsg(msg);
    setShowSuccess(true);
    setTimeout(() => {
      setMsg("");
      setShowSuccess(false);
    }, 7000);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedReferralId(referralId);
    }, 500);

    return () => clearTimeout(handler);
  }, [referralId]);

  async function fetchUser() {
    const res = await axios.post(`${baseUrl}getuser`, {
      username: debouncedReferralId,
    });

    if (res.data.status == 200) {
      setName(res.data.data.first_name);
      setUserFound(true);
      showSuccess("User Found!");
    } else {
      setUserFound(false);
    }
  }
  useEffect(() => {
    if (debouncedReferralId) {
      fetchUser();
    }
  }, [debouncedReferralId]);

  useEffect(() => {
    if (referralIdParam) {
      setReferralId(referralIdParam);
      setReferralLocked(true);
    }
  }, [referralIdParam]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCountries() {
      try {
        const response = await axios.post(`${baseUrl}country`, null, {
          signal: controller.signal,
        });
        setCountries(response.data.data);
      } catch (error) {
        if (error.name === "CanceledError" || error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error("Error fetching countries:", error);
        }
      }
    }

    fetchCountries();

    return () => {
      console.log("Component unmounted — canceling request");
      controller.abort();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== passwordConfirm) {
      alert("Password Do Not Match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("Password Length Must Be 6.");
      setLoading(false);
      return;
    }

    const response = await axios.post(`${baseUrl}register`, {
      first_name: fullName,
      sponsor_id: referralId,
      username,
      country,
      phone_no: number,
      email: email,
      password,
      password_confirmation: passwordConfirm,
      agree_terms: checked,
    });

    // console.log(response.data);

    if (response.data.status == 200) {
      alert(response.data.msg);
      navigate("/signin", { state: { details: response.data.user } });
    } else if (response.data.status == 201) {
      alert(response.data.msg);
    } else {
      alert("Registration Failed!");
    }
    setLoading(false);
  }

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="bg-white text-black px-5 py-4 rounded-lg max-w-120">
        <div>
          <div className="text-xl">WELCOME TO U2U DELEGATOR REWARD PROGRAM</div>
          <div className="text-[12px] font-[600] mt-2">
            To keep connected with us please Sign up with your personal
            information by email address and password.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Referral Id"
              value={referralId}
              required
              disabled={referralLocked}
              onChange={(e) => setReferralId(e.target.value)}
              className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
            />
            {userFound && <span className="text-green-500 italic">{name}</span>}
          </div>

          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />
          <input
            type="text"
            placeholder="FullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          >
            <option value="">Select country</option>
            {countries?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={number}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setNumber(value);
              }
            }}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 py-2 px-3 pr-10 rounded w-full glow-focus"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute bg-purple-800  h-full right-0 top-1/2 rounded flex items-center justify-center transform -translate-y-1/2 w-12 text-white hover:text-gray-200 cursor-pointer focus:outline-none"
              tabIndex={-1} // Prevents button from being accidentally focused
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border border-gray-300 py-2 px-3 pr-10 rounded w-full glow-focus"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute bg-purple-800  h-full right-0 top-1/2 rounded flex items-center justify-center transform -translate-y-1/2 w-12 text-white hover:text-gray-200 cursor-pointer focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          <div className=" flex items-center gap-2">
            <input
              required
              id="terms"
              type="checkbox"
              onChange={() => setChecked((prev) => !prev)}
              checked={checked}
              className="checkbox checkbox-sm checkbox-info"
            />
            <label htmlFor="terms" className="text-sm">
              I agree with the website's{" "}
              <Link className="text-purple-800">Terms and conditions</Link>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading || !userFound}
            className="relative overflow-hidden disabled:cursor-not-allowed text-white bg-[#38C66C] font-semibold py-2 rounded cursor-pointer border border-black hover:border-amber-400 transition ease-in-out duration-300"
          >
            REGISTER NOW
            {loading && (
              <div className="absolute bg-[#38C66C] backdrop-blur-xl inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
          </button>
        </form>
        <div className="mt-5 text-sm text-purple-800">
          <span className="text-black">Already a member?</span>{" "}
          <Link to="/signin" className="cursor-pointer">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
