import React, { useEffect, useState } from 'react'
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import axios from 'axios';

function WalletVerify() {
    const {
        baseUrl,
        walletAddress,
        setWalletAddress,
        setMsg,
        setShowError,
        setShowSuccess,
    } = useConstStore();
    const { user, setUser, token } = useUserStore();

    const [disableSubmit, setDisableSubmit] = useState(false);

    function showError(msg) {
        setMsg(msg);
        setShowError(true);
        setTimeout(() => {
            setMsg("");
            setShowError(false);
        }, 5000);
    }

    function showSuccess(msg) {
        setMsg(msg);
        setShowSuccess(true);
        setTimeout(() => {
            setMsg("");
            setShowSuccess(false);
        }, 5000);
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
        try {
            setDisableSubmit(true)

            const response = await axios.post(
                `${baseUrl}wallet_address_verification`,
                {
                    user_id: user?.id,
                    wallet_address: walletAddress
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data)

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

                if (res.data.status == 200) {
                    setUser({
                        ...res.data.data.user,
                        delegator_amount: res.data.data.delegator_amount,
                        image: res.data.data.image,
                        rank_name: res.data.data.rankname,
                    });
                    showSuccess("Profile Updated.");
                }
                showSuccess(response.data.msg)
            } else {
                showError(response.data.msg)
            }
        } catch (error) {
            console.log(error)
            showError(error.response.data.msg)
        } finally {
            setDisableSubmit(false)
        }
    }

    return (
        <div className="flex-1 flex justify-center items-start p-4">
            <div className="bg-[#1F2C24] rounded-2xl shadow-lg w-full sm:w-10/12 md:w-8/12 xl:w-6/12 border border-[#26362C] transition-all duration-300 hover:shadow-[#22b357]/10 mt-8">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#35443b] px-6 py-4">
                    <h2 className="text-xl font-semibold text-white tracking-wide">
                        Wallet Verification
                    </h2>
                    {walletAddress && (
                        <span className="text-xs text-[#56CF82] bg-[#26362C] px-3 py-1 rounded-full">
                            Connected
                        </span>
                    )}
                </div>

                {/* Body */}
                <div className="flex flex-col gap-5 px-6 py-6 text-sm text-gray-200">
                    {/* Wallet Address Input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[#8BA696] font-medium">Wallet Address</label>
                        <div className="relative">
                            <input
                                value={user?.wallet_address_main ? user?.wallet_address_main : walletAddress}
                                type="text"
                                placeholder="Connect Wallet"
                                disabled
                                className="bg-[#26362C] w-full rounded-lg px-4 py-2 pr-12 text-gray-200 placeholder-gray-400 border border-[#35443b] focus:outline-none focus:border-[#22b357] transition"
                            />
                            {walletAddress && (
                                <div className="absolute right-3 top-2.5 text-[#22b357] text-xs">
                                    ✓
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-3">
                        {user?.wallet_address_main ? <button
                            disabled
                            className={`px-5 py-2 disabled:cursor-not-allowed rounded-lg font-medium transition duration-300 bg-[#22b357] hover:bg-[#56CF82] text-white`}
                        >
                            Already Verified
                        </button> : walletAddress ? (
                            <button
                                onClick={handleSubmit}
                                disabled={disableSubmit}
                                className={`px-5 py-2 cursor-pointer rounded-lg font-medium transition duration-300
              ${disableSubmit
                                        ? "bg-[#26362C] text-gray-400 cursor-not-allowed"
                                        : "bg-[#22b357] hover:bg-[#56CF82] text-white"
                                    }`}
                            >
                                {disableSubmit ? "Verifying..." : "Verify Wallet Address"}
                            </button>
                        ) : (
                            <button
                                onClick={connectWallet}
                                disabled={disableSubmit}
                                className={`px-5 py-2 cursor-pointer rounded-lg font-medium transition duration-300
              ${disableSubmit
                                        ? "bg-[#26362C] text-gray-400 cursor-not-allowed"
                                        : "bg-[#22b357] hover:bg-[#56CF82] text-white"
                                    }`}
                            >
                                {disableSubmit ? "Connecting..." : "Connect Wallet"}
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletVerify