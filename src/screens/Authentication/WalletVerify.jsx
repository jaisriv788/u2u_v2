import React, { useEffect, useState } from 'react'
import useConstStore from "../../store/constStore";

function WalletVerify() {
    const {
        baseUrl,
        walletAddress,
        setWalletAddress,
        setMsg,
        setShowError,
        setShowSuccess,
    } = useConstStore();

    const [disableSubmit, setDisableSubmit] = useState(false);

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
        try {
            setDisableSubmit(true)
            showSuccess(baseUrl)
        } catch (error) {
            console.log(error)
        } finally {
            setDisableSubmit(false)
        }
    }

    return (
        <div className="flex-1 flex justify-center p-4">
            <div className="bg-[#1F2C24] mt-5 rounded-lg w-full sm:w-10/12 md:w-9/12 h-fit">
                <div className="text-lg font-semibold border-b py-3 px-5 border-[#35443b]">
                    Wallet Verification{" "}
                </div>
                <div className="py-5 px-5 flex flex-col gap-3 text-sm">
                    <div className="flex flex-col relative">
                        <span>Wallet Address</span>
                        <input
                            value={walletAddress ?? ""}
                            type="text"
                            placeholder="Connect Wallet"
                            disabled
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
                                {disableSubmit ? "Verifying..." : "Verify Wallet Address"}
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
        </div>)
}

export default WalletVerify