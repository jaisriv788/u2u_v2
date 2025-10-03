import FooterTwo from "../../components/common/FooterTwo";
import { GoGraph } from "react-icons/go";
import useUserStore from "../../store/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import useConstStore from "../../store/constStore";

function Delegate() {
  const { user, token } = useUserStore();
  const { baseUrl, setScreenLoading, setMsg, setShowError, setShowSuccess } =
    useConstStore();

  const [balance, setBalance] = useState(null);
  const [checked, setChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [password, setPassword] = useState("");
  const [refreshed, setRefreshed] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (amount == "" || password == "" || remark == "") {
      showError("Feilds can not be empty!");
      return;
    }
    if (!checked && userId == "") {
      showError("UserId Feilds can not be empty!");
      return;
    }
    // console.log({
    //   user_id: user?.id,
    //   username: !checked ? userId : user?.username,
    //   pay_amount: amount,
    //   password,
    //   self: checked,
    //   remark,
    // });
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}investmentSave`,
        {
          user_id: user?.id,
          username: !checked ? userId : user?.username,
          pay_amount: amount,
          password,
          self: checked,
          remark,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.data.status == 200) {
        setChecked(false);
        setUserId("");
        setAmount("");
        setPlatformFee("");
        setTotalAmount("");
        setRemark("");
        setPassword("");
        setRefreshed(!refreshed);
        showSuccess("Activation Successfull");
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      showError(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        setScreenLoading(true);
        const response = await axios.post(
          `${baseUrl}user_wallet`,
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
        setBalance(response.data.data);
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
  }, [refreshed]);

  return (
    <div className="p-4 flex-1 overflow-x-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Activation</div>
        <div className="text-xs">
          <span className="text-green-300">Wallet</span> {">>"} Activation
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-5 my-5">
        <div className="xl:w-90 h-fit rounded-lg overflow-hidden">
          <div className="bg-[#1F2C24] p-4 flex flex-col gap-3 ">
            <div className="flex items-center gap-2 text-sm ">
              <div className="font-semibold text-lg text-red-500 bg-red-500/30 p-2 rounded">
                <GoGraph />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">Deposit Balance </div>
                  <div className="text-xs">Hello, u2ufirst</div>
                </div>
                <div className="text-gray-300 font-semibold">
                  {" "}
                  ${balance?.deposit_balance.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2C24] flex-1 h-fit rounded-lg p-3">
          <div className="font-semibold text-lg border-b border-[#27382E] pb-2">
            Activation
          </div>

          <div className="mt-2 flex flex-col gap-3 text-sm">
            <div className="flex gap-2 items-center">
              <input
                id="check"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked((prev) => !prev)}
                className="toggle border-gray-600 bg-gray-500 checked:border-emerald-500 checked:bg-emerald-400 checked:text-emerald-800"
              />
              <label>Activation for Self</label>
            </div>
            {!checked && (
              <div className="flex flex-col">
                <span className="">Enter UserId</span>
                <input
                  placeholder="Enter UserId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  type="text"
                  className="bg-[#26362C] rounded px-3 py-0.5"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="">Enter Amount</span>
              <input
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  const tenPerc = val / 10;
                  const total = parseFloat(val) + parseFloat(tenPerc);

                  setAmount(val);
                  setPlatformFee(tenPerc ? tenPerc : "");
                  setTotalAmount(total ? total : "");
                }}
                type="number"
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">Validator Platform fee (10 %)</span>
              <input
                placeholder="Platform Fee (10%)"
                type="text"
                value={platformFee}
                disabled
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">Total Amount</span>
              <input
                placeholder="Total Amount"
                type="text"
                value={totalAmount}
                disabled
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">Enter Remark</span>
              <textarea
                type="text"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter Remark"
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="">Password</span>
              <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-[#26362C] rounded px-3 py-0.5"
              />
            </div>

            <div className="flex gap-5 mt-5">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#22b357] hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                {loading ? "Activating..." : "Submit"}
              </button>
              <button
                disabled={loading}
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

export default Delegate;
