import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useConstStore from "../store/constStore";
import useDashboardStore from "../store/dashboardStore";
import axios from "axios";
// import Marquee from "../components/Dashboard/Marquee";
import Intro from "../components/Dashboard/Intro";
import Card from "../components/Dashboard/Card";
import { FaWallet } from "react-icons/fa";
import Graph from "../components/Dashboard/Graph";
import DetailedCards from "../components/Dashboard/DetailedCards";
import Link from "../components/Dashboard/Link";
import Img from "../components/Dashboard/Img";
import YouTube from "../components/Dashboard/YouTube";
import Transaction from "../components/Dashboard/Transaction";
import Footer from "../components/common/Footer";

function Dashboard() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const [dashboardRes, generalRes] = await Promise.all([
            axios.post(
              `${baseUrl}dashboard`,
              { user_id: user?.id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.get(`${baseUrl}generalSetting`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

          // Handle dashboard response
          if (dashboardRes.data.status === 200) {
            setDashBoardData(dashboardRes.data.data);
          }

          // Handle general settings response
          if (generalRes.data.status === 200) {
            if (generalRes.data.data.popup_status === 1) {
              setShowModal(true);
              setTitle(generalRes.data.data.popup_title);
              setMsg(generalRes.data.data.popup_message.split("\n"));
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setScreenLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, isConnected]);

  const Data = [
    {
      title: "WITHDRAW BALANCE",
      balance: dashboardData?.user_wallet?.balance.toFixed(4),
      icon: FaWallet,
      show: true,
    },
    {
      title: "DEPOSIT BALANCE",
      balance: dashboardData?.user_wallet?.deposit_balance.toFixed(4),
      icon: FaWallet,
      show: true,
    },
    {
      title: "DIRECT TEAM",
      balance: dashboardData?.total_direct,
      icon: FaWallet,
      show: false,
    },
    {
      title: "LEVEL TEAM",
      balance: dashboardData?.all_team,
      icon: FaWallet,
      show: false,
    },
  ];

  const Data2 = [
    {
      title: "DELEGATOR REWARD",
      amount: dashboardData?.daily_profit.toFixed(4),
      balanceRoi: dashboardData?.user_wallet?.roi_pending.toFixed(4),
      tag: (
        <div>
          Earn delegator rewards{" "}
          <span className="text-[#1FD022] font-semibold">10.8%</span> per month
        </div>
      ),
      showBtn: true,
    },
    {
      title: "DIRECT BONUS",
      amount: dashboardData?.direct_income.toFixed(4),
      tag: (
        <div>
          Earn direct bonus up to{" "}
          <span className="text-[#1FD022] font-semibold">10%</span> from team
        </div>
      ),
    },
    {
      title: "DELEGATOR LEVEL BONUS",
      amount: dashboardData?.level_profit.toFixed(4),
      tag: (
        <div>
          Earn passive delegator level rewards up to{" "}
          <span className="text-[#1FD022] font-semibold">20</span> level
        </div>
      ),
    },
    {
      title: "RANK & REWARD",
      amount: dashboardData?.rank_income.toFixed(4),
      tag: (
        <div>
          Qualify rank & earn up to{" "}
          <span className="text-[#1FD022] font-semibold">$ 20,00,000</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col gap-3 max-w-screen">
      {showModal && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – {title}
              </span>

              <p className="mb-3">{msg[0]}</p>
              <p className="mb-3">{msg.slice(1, msg.length - 1)}</p>
              <p className="mb-3">
                <span>{msg[msg.length - 1].split("–")[0]}</span> <br /> -
                <span className="text-green-500">
                  {msg[msg.length - 1].split("–")[1]}
                </span>
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <Marquee /> */}
      <Intro />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
        {Data.map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            title={item.title}
            balance={item.balance}
            show={item.show}
          />
        ))}
      </div>
      <Graph />
      <div className="grid lg:grid-cols-2 gap-3 sm:gap-5">
        {Data2.map((item, index) => (
          <DetailedCards
            key={index}
            title={item.title}
            amount={item.amount}
            show={item.showBtn}
            balanceRoi={item.balanceRoi}
          >
            {item.tag}
          </DetailedCards>
        ))}
      </div>
      <Link />
      <Img />
      <YouTube />
      <Transaction />
      <Footer />
    </div>
  );
}

export default Dashboard;
