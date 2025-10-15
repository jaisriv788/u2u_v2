import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import useConstStore from "../store/constStore";
import Web3 from "web3";
import ABI from "../erc20Abi.json"
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function Signup() {
  const { referralId: referralIdParam } = useParams();
  const [referralLocked, setReferralLocked] = useState(false);
  const [referralId, setReferralId] = useState("");

  const [debouncedReferralId, setDebouncedReferralId] = useState(referralId);
  // const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  // const [country, setCountry] = useState("");
  // const [countries, setCountries] = useState(null);
  // const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);

  const { baseUrl, setMsg, setShowSuccess, contractAddress, setShowError, setWalletAddress, walletAddress, usdtAddress } = useConstStore();

  const navigate = useNavigate();

  function showSuccess(msg) {
    setMsg(msg);
    setShowSuccess(true);
    setTimeout(() => {
      setMsg("");
      setShowSuccess(false);
    }, 2500);
  }

  function showError(msg) {
    setMsg(msg);
    setShowError(true);
    setTimeout(() => {
      setMsg("");
      setShowError(false);
    }, 2500);
  }


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedReferralId(referralId);
    }, 500);

    return () => clearTimeout(handler);
  }, [referralId]);

  async function fetchUser() {
    const res = await axios.post(`${baseUrl}getuser`, {
      wallet_address: debouncedReferralId,
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
    const connectWallet = async () => {
      if (!window.ethereum) {
        showError("Please install MetaMask!");
        return;
      }

      try {
        let accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length === 0) {
          accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        }

        setWalletAddress(accounts[0]);

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x38",
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });

        // await window.ethereum.request({
        //   method: "wallet_addEthereumChain",
        //   params: [
        //     {
        //       chainId: "0x61",
        //       chainName: "Binance Smart Chain Testnet",
        //       nativeCurrency: {
        //         name: "BNB",
        //         symbol: "tBNB", // testnet BNB
        //         decimals: 18,
        //       },
        //       rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        //       blockExplorerUrls: ["https://testnet.bscscan.com/"],
        //     },
        //   ],
        // });

        showSuccess("Wallet Connected")




        window.ethereum.on("accountsChanged", (acc) => {
          setWalletAddress(acc[0] || null);
        });
      } catch (err) {
        if (err.code === -32002) {
          console.error(
            "MetaMask request already pending. Please open MetaMask."
          );
        } else {
          console.error("Wallet connection failed:", err);
          showError("Wallet Connection Failed.");
        }
      }
    };

    connectWallet();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      showError("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true);

      let accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      }

      setWalletAddress(accounts[0]);

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com/"],
          },
        ],
      });

      // await window.ethereum.request({
      //   method: "wallet_addEthereumChain",
      //   params: [
      //     {
      //       chainId: "0x61",
      //       chainName: "Binance Smart Chain Testnet",
      //       nativeCurrency: {
      //         name: "BNB",
      //         symbol: "tBNB", // testnet BNB
      //         decimals: 18,
      //       },
      //       rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      //       blockExplorerUrls: ["https://testnet.bscscan.com/"],
      //     },
      //   ],
      // });

      showSuccess("Wallet Connected")

      window.ethereum.on("accountsChanged", (acc) => {
        setWalletAddress(acc[0] || null);
      });
    } catch (err) {
      if (err.code === -32002) {
        console.error(
          "MetaMask request already pending. Please open MetaMask."
        );
      } else {
        console.error("Wallet connection failed:", err);
        showError("Wallet Connection Failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   const controller = new AbortController();

  //   async function fetchCountries() {
  //     try {
  //       const response = await axios.post(`${baseUrl}country`, null, {
  //         signal: controller.signal,
  //       });
  //       setCountries(response.data.data);
  //     } catch (error) {
  //       if (error.name === "CanceledError" || error.name === "AbortError") {
  //         console.log("Request aborted");
  //       } else {
  //         console.error("Error fetching countries:", error);
  //       }
  //     }
  //   }

  //   fetchCountries();

  //   return () => {
  //     console.log("Component unmounted — canceling request");
  //     controller.abort();
  //   };
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!userFound) {
      showError("User Not Found. Enter Valid Referal Wallet Address.");
      setLoading(false);
      return
    }

    if (!window.ethereum) {
      showError("MetaMask not found.");
      setLoading(false);
      return
    }

    try {

      const res = await axios.post(`${baseUrl}before_payment_registration`, {
        first_name: fullName,//
        sponsor_id: referralId,
        wallet_address: walletAddress,//
        email: email,
        agree_terms: checked,
      });

      if (res.data.status != 200) {
        showError(res.data.msg)
        setLoading(false);
        return
      }
      // console.log({ res });

      const web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(ABI, usdtAddress);
      // const contract = new web3.eth.Contract(ABI, "0xF78A55dB9391E9B689734BA3E45c1C3A5535A857");

      const amount = web3.utils.toWei("55", "ether");

      // console.log(amount)

      const balance = await contract.methods.balanceOf(walletAddress).call();
      console.log("Your token balance:", web3.utils.fromWei(balance, "ether"));

      console.log("⏳ Waiting for user to approve the transfer in MetaMask...");
      const tx = await contract.methods.transfer(contractAddress, amount).send({
        from: walletAddress,
      });
      // const tx = await contract.methods.transfer("0x15be2A2882aC8D982E9C4b1f255fFE683524772f", amount).send({
      //   from: walletAddress,
      // });

      console.log("✅ Transaction confirmed:", tx.transactionHash);



      const response = await axios.post(`${baseUrl}register`, {
        first_name: fullName,
        sponsor_id: referralId,
        wallet_address: walletAddress,
        transaction_hash: tx.transactionHash,
        email: email,
        agree_terms: checked,
      });

      console.log(response.data);

      if (response.data.status == 200) {
        showSuccess(response.data.msg);
        navigate("/signin", { state: { options: "wallet" } });
      } else if (response.data.status == 201) {
        showError(response.data.msg);
      } else {
        showError("Registration Failed!");
      }
    } catch (error) {
      console.log({ error })
      showError(error.response ? error.response.data.msg : "Your transaction request timed out. Please cancel the current request in MetaMask and try again.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black px-2 min-h-screen flex justify-center items-center">

      {loading && <div className=" absolute top-0 mx-2 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-sm mt-4">
        <div className="flex">
          <svg
            className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86A2.07 2.07 0 0021 16.93V7.07A2.07 2.07 0 0018.93 5H5.07A2.07 2.07 0 003 7.07v9.86A2.07 2.07 0 005.07 19z" />
          </svg>
          <div>
            <h3 className="text-yellow-800 font-semibold">Important Notice</h3>
            <p className="text-yellow-700 text-sm mt-1">
              Please do not close or reload this tab during the transaction process.
              Any loss of funds resulting from interruption will be your responsibility.
            </p>
          </div>
        </div>
      </div>}

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
            <span className="text-green-500 front-semibold">Connected Wallet Address</span>
            <input
              type="text"
              placeholder="Connected Wallet Address"
              value={walletAddress ?? ""}
              required
              disabled
              className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Referral Wallet Address"
              value={referralId}
              required
              disabled={referralLocked || !walletAddress}
              onChange={(e) => setReferralId(e.target.value)}
              className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
            />
            {userFound && <span className="text-green-500 italic">{name}</span>}
          </div>

          {/* <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          /> */}
          <input
            type="text"
            placeholder="FullName"
            required
            disabled={!walletAddress}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />
          {/* <select
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
          </select> */}
          {/* <input
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
          /> */}
          <input
            type="email"
            placeholder="Email Address"
            required
            disabled={!walletAddress}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 py-2 px-3 rounded w-full glow-focus"
          />

          {/* <div className="relative w-full">
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
          </div> */}

          {/* <div className="relative w-full">
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
          </div> */}

          <div className=" flex items-center gap-2">
            <input
              required
              id="terms"
              type="checkbox"
              onChange={() => setChecked((prev) => !prev)}
              checked={checked}
              disabled={!walletAddress}
              className="checkbox checkbox-sm checkbox-info"
            />
            <label htmlFor="terms" className="text-sm">
              I agree with the website's{" "}
              <Link className="text-purple-800">Terms and conditions</Link>
            </label>
          </div>
          {walletAddress ? <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden disabled:cursor-not-allowed text-white bg-[#38C66C] font-semibold py-2 rounded cursor-pointer border border-black hover:border-amber-400 transition ease-in-out duration-300"
          >
            REGISTER NOW
            {loading && (
              <div className="absolute bg-[#38C66C] backdrop-blur-xl inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
          </button> : <button
            onClick={connectWallet}
            disabled={loading}
            className="relative overflow-hidden disabled:cursor-not-allowed text-white bg-[#38C66C] font-semibold py-2 rounded cursor-pointer border border-black hover:border-amber-400 transition ease-in-out duration-300"
          >
            Connect Wallet
            {loading && (
              <div className="absolute bg-[#38C66C] backdrop-blur-xl inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
          </button>}

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
