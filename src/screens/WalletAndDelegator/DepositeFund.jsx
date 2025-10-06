import { useEffect, useState } from "react";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import axios from "axios";
import { FaCopy } from "react-icons/fa";

function DepositeFund() {
  const [amount, setAmount] = useState("");
  const [hash, setHash] = useState("");
  const [file, setFile] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const {
    baseUrl,
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // get the first selected file
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

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
        alert(
          "Copy the address, Send the payment and then make the request to the admin to update your balance and amount must be greater than 1."
        );
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
    if (!hash) {
      showError("Enter a valid transaction hash.");
      return;
    }
    if (!file) {
      showError("Select Image As Proof Of Transaction.");
      return;
    }

    try {
      setDisableSubmit(true);

      console.log({ amount, hash, file });
      const response = await axios.post(
        `${baseUrl}depositUsdtFund`,
        {
          user_id: user?.id,
          amount,
          method: "USDT-BEP20",
          transaction_id: hash,
          proof_of_payment: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.status == 200) {
        console.log("API updated successfully");
        showSuccess("Transaction confirmed.");
      } else {
        showError(response.data.msg);
      }
    } catch (err) {
      console.error("Transaction failed!", err);
      showError(err.response.data.msg);
    } finally {
      setDisableSubmit(false);
      setAmount("");
      setHash("");
      setFile(null);
    }
  }

  return (
    <div className="flex-1 flex justify-center p-4">
      <div className="bg-[#1F2C24] mt-5 rounded-lg w-full sm:w-10/12 md:w-9/12 h-fit">
        <div className="text-lg font-semibold border-b py-3 px-5 border-[#35443b]">
          Deposit{" "}
        </div>
        <div className="py-5 px-5 flex flex-col gap-3 text-sm">
          <div className="flex gap-3 items-center relative">
            <span>Wallet Address -</span>
            <span className="hidden sm:block">0x2Cbff126427A1a099e21135BF16f4f88a5dE786e</span>
            <span className="sm:hidden block">0x2Cbff12..8a5dE786e</span>
            <FaCopy
              onClick={() => {
                navigator.clipboard
                  .writeText("0x2Cbff126427A1a099e21135BF16f4f88a5dE786e")
                  .then(() => {
                    console.log("Text copied to clipboard ✅");
                    alert("Copied!");
                  })
                  .catch((err) => {
                    console.error("Failed to copy: ", err);
                  });
              }}
              className="cursor-pointer hover:text-gray-300 transition ease-in-out duration-300"
            />
          </div>

          {/* <div className="flex sm:gap-3 flex-col sm:flex-row sm:items-center relative">
            <span>Wallet Address -</span>
            <div className="flex items-center gap-2">
              <span>0x2Cbff126427A1a099e21135BF16f4f88a5dE786e</span>
              <FaCopy
                onClick={() => {
                  navigator.clipboard
                    .writeText("0x2Cbff126427A1a099e21135BF16f4f88a5dE786e")
                    .then(() => {
                      console.log("Text copied to clipboard ✅");
                      alert("Copied!");
                    })
                    .catch((err) => {
                      console.error("Failed to copy: ", err);
                    });
                }}
                className="cursor-pointer hover:text-gray-300 transition ease-in-out duration-300"
              />
            </div>
          </div> */}

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
            <span className="">Transaction Hash</span>
            <input
              onChange={(e) => setHash(e.target.value)}
              value={hash}
              type="text"
              placeholder="Enter Tx Hash"
              className="bg-[#26362C] rounded px-3 py-0.5 pr-10"
            />
          </div>

          <div className="flex flex-col">
            <span className="">Transaction Hash</span>
            <input
              onChange={handleFileChange}
              accept="image/*"
              type="file"
              className="bg-[#26362C] rounded px-3 py-0.5 pr-10"
            />
          </div>

          <div className="flex gap-5 mt-5">
            {walletAddress ? (
              <button
                onClick={handleSubmit}
                // disabled
                disabled={disableSubmit}
                className="bg-[#22b357] disabled:cursor-not-allowed hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
              >
                {disableSubmit ? "Depositing..." : "Submit"}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                // disabled
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
