import FooterTwo from "../../components/common/FooterTwo";
import profileImgSrc from "../../assets/Navbar/profile.png";
import { FaUser } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import useUserStore from "../../store/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import useConstStore from "../../store/constStore";

function Profile() {
  const { user, setUser, token } = useUserStore();
  const { baseUrl, setScreenLoading, setMsg, setShowError, setShowSuccess } =
    useConstStore();

  const [name, setName] = useState(user?.first_name);
  const [address, setAddress] = useState(user?.wallet_address);
  const [U2UAddress, setU2UAddress] = useState(user?.u2u_wallet);
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(user?.country || "");
  const [image, setImage] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpfa, setOtpfa] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  // const [receivedOtp, setReceivedOtp] = useState("");

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

  async function handleOtp() {
    try {
      setSendingOtp(true);
      const response = await axios.post(
        `${baseUrl}sendOtp`,
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
      console.log(response);

      // setReceivedOtp(response.data.data.otp);
      showSuccess("OTP Sent To Your Mail.");
    } catch (error) {
      console.error(error);
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleSubmit() {
    if (otp == "" && otpfa == "") {
      showError("Otp Feild Is Empty.");
      return;
    }
    // if (!checked && otp != receivedOtp) {
    //   showError("Otp Did Not Match.");
    //   return;
    // }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", user?.id);
      formData.append("first_name", name);
      formData.append("wallet_address", address);
      formData.append("country", country);
      formData.append("u2u_wallet", U2UAddress);
      formData.append("otp", otp);
      formData.append("otpfa", otpfa);
      if (image) {
        formData.append("image", image); // File object
      }

      const response = await axios.post(`${baseUrl}updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status == 200) {
        const res = await axios.post(
          `${baseUrl}user_detail`,
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
        // console.log(res);
        if (res.data.status == 200) {
          setOtp("");
          setOtpfa("");
          setImage(null);
          setUser({
            ...res.data.data.user,
            delegator_amount: res.data.data.delegator_amount,
            image: res.data.data.image,
            rank_name: res.data.data.rankname,
          });
          showSuccess("Profile Updated.");
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      showError(error.response.data.msg);
    }
  }

  useEffect(() => {
    // console.log({ user });
    async function fetchCountries() {
      try {
        // console.log("fetching countries");
        setScreenLoading(true);
        const response = await axios.post(`${baseUrl}country`);
        // console.log(response.data.data);
        // console.log("fetched");

        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setScreenLoading(false);
      }
    }

    fetchCountries();

    return () => {
      console.log("Component unmounted — canceling request");
    };
  }, []);

  return (
    <div className="p-4 flex-1 overflow-x-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Contact</div>
        <div className="text-xs">
          <span className="text-green-300">Apps</span> {">>"} Contact
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-5 my-5">
        <div className="xl:w-80 h-fit rounded-lg overflow-hidden">
          <div className="h-40">
            <div className="bg-[#0B2816] pt-3 text-[#38C653] px-3 h-1/2 text-xl font-semibold">
              Welcome Back !
            </div>
            <div className="bg-[#1F2C24] border-b border-[#27382E] px-3 h-1/2 relative">
              <div className="w-16 h-16 bg-[#26362D] rounded-full p-3 flex items-center justify-center absolute -top-7">
                <img
                  className=""
                  src={user?.image ? user?.image : profileImgSrc}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#1F2C24] p-3 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm">
              <FaUser className="text-green-500" />{" "}
              <span className="flex gap-5 xl:gap-2">
                Full Name : <span>{user?.username}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaMobile className="text-green-500" />{" "}
              <span className="flex gap-5 xl:gap-2">
                Mobile :<span> {user?.phone_no}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MdEmail className="text-green-500" />{" "}
              <span className="flex gap-5 xl:gap-2">
                E-Mail : <span>{user?.email}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2C24] flex-1 h-fit rounded-lg p-3">
          <div className="font-semibold text-lg border-b border-[#27382E] pb-2">
            Profile Settings
          </div>

          <div className="mt-2 flex flex-col gap-3 text-sm">
            <div className="flex flex-col">
              <span className="">User Id</span>
              <input
                value={user?.username}
                type="text"
                className="bg-[#26362C] rounded px-3 py-0.5"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <span className="">Applicant Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">E-Mail</span>
              <input
                value={user?.email}
                type="text"
                className="bg-[#26362C] rounded px-3 py-0.5"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <span className="">Country</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="rounded bg-[#26362C] px-3 py-0.5"
              >
                <option value="">Select country</option>
                {countries?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <span className="">USDT BEP-20 Address</span>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">U2U Wallet</span>
              <input
                onChange={(e) => setU2UAddress(e.target.value)}
                value={U2UAddress}
                type="text"
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">Profile Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                  }
                }}
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
              <img
                src={user?.image ? user?.image : profileImgSrc}
                className="w-15"
              />
            </div>

            {user.status_2fa == "disable" && (
              <div className="flex flex-col">
                <span className="">One Time Password</span>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type="text"
                  className="bg-[#26362C] rounded px-3 py-0.5"
                />
                <button
                  onClick={handleOtp}
                  disabled={sendingOtp || loading}
                  className="bg-[#22b357] hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
                >
                  {sendingOtp
                    ? "Sending OTP..."
                    : loading
                    ? "Please Wait.."
                    : "Send OTP"}
                </button>
              </div>
            )}

            {user.status_2fa == "enable" && (
              <div className="flex gap-2 items-center">
                <input
                  id="check"
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    setChecked((prev) => !prev);
                    setOtp("");
                    setOtpfa("");
                  }}
                  className="toggle border-gray-600 bg-gray-500 checked:border-emerald-500 checked:bg-emerald-400 checked:text-emerald-800"
                />
                <label>{!checked ? "OTP" : "Two Factor Authentication"}</label>
              </div>
            )}

            {user?.status_2fa === "enable" &&
              (checked ? (
                <div className="flex flex-col">
                  <span>Two Factor Passkey</span>
                  <input
                    onChange={(e) => setOtpfa(e.target.value)}
                    value={otpfa}
                    type="text"
                    className="bg-[#26362C] rounded px-3 py-0.5"
                  />
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="">One Time Password</span>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    type="text"
                    className="bg-[#26362C] rounded px-3 py-0.5"
                  />
                  <button
                    onClick={handleOtp}
                    disabled={sendingOtp || loading}
                    className="bg-[#22b357] hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
                  >
                    {sendingOtp
                      ? "Sending OTP..."
                      : loading
                      ? "Please Wait.."
                      : "Send OTP"}
                  </button>
                </div>
              ))}

            <div className="flex gap-5 mt-5">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#22b357] hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              <button
                onClick={() => {
                  setName(user?.first_name);
                  setAddress(user?.wallet_address);
                  setCountry(user?.country || "");
                  setImage(null);
                  setOtp("");
                }}
                className="bg-gray-500 hover:bg-gray-400 transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </div>
  );
}

export default Profile;
