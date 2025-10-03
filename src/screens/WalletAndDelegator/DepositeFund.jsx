import { useEffect, useState } from "react";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import Web3 from "web3";
import erc20Abi from "../../erc20Abi.json";
import contractAbi from "../../contractAbi.json";
import axios from "axios";

function DepositeFund() {
  const options = ["USDT-BEP20"];

  const [option, setOption] = useState("USDT-BEP20");
  const [amount, setAmount] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const {
    baseUrl,
    usdtAddress,
    contractAddress,
    walletAddress,
    setWalletAddress,
    setMsg,
    setShowError,
    setShowSuccess,
  } = useConstStore();

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
      setDisableSubmit(true);

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
      setDisableSubmit(false);
    }
  }

  async function handleSubmit() {
    if (amount == 0 || amount == "") {
      showError("Amount Can Not Be Zero.");
      return;
    }

    if (amount < 1) {
      showError("Amount Can Not Be Less Than 1.");
      return;
    }

    if (!window.ethereum) {
      showError("Please install MetaMask!");
      return;
    }
    try {
      setDisableSubmit(true);

      const web3 = new Web3(window.ethereum);

      const amountInWei = web3.utils.toWei(amount.toString(), "ether");

      const usdt = new web3.eth.Contract(erc20Abi, usdtAddress);

      await usdt.methods
        .approve(contractAddress, amountInWei.toString())
        .send({ from: walletAddress });

      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      const receipt = await contract.methods
        .deposit(amountInWei)
        .send({ from: walletAddress });

      console.log("Deposit confirmed ✅", receipt);

      const response = await axios.post(
        `${baseUrl}depositUsdtFund`,
        {
          user_id: user?.id,
          amount,
          method: option,
          transaction_id: receipt.transactionHash,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      console.log("API updated successfully");
      showSuccess("Transaction confirmed ✅");
    } catch (err) {
      console.error("Transaction failed!", err);
      showError("Tranaction Failed!");
    } finally {
      setDisableSubmit(false);
    }
  }

  return (
    <div className="flex-1 flex justify-center p-4">
      <div className="bg-[#1F2C24] mt-5 rounded-lg w-full sm:w-10/12 md:w-9/12 h-fit">
        <div className="text-lg font-semibold border-b py-3 px-5 border-[#35443b]">
          Deposit{" "}
        </div>
        <div className="py-5 px-5 flex flex-col gap-3 text-sm">
          <div className="flex flex-col relative">
            <span>Enter Amount</span>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              placeholder="Enter Amount"
              className="bg-[#26362C] rounded px-3 py-0.5 pr-10"
            />
          </div>

          <div className="flex flex-col">
            <span className="">Country</span>
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              required
              className="rounded bg-[#26362C] px-3 py-0.5"
            >
              {options?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-5 mt-5">
            {walletAddress ? (
              <button
                onClick={handleSubmit}
                disabled={disableSubmit}
                className="bg-[#22b357] disabled:cursor-not-allowed hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                {disableSubmit ? "Depositing..." : "Submit"}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                disabled={disableSubmit}
                className="bg-[#22b357] disabled:cursor-not-allowed hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                {disableSubmit ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositeFund;
