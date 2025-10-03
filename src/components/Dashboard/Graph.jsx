import { RiCoinFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { GiChessQueen } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import useDashboardStore from "../../store/dashboardStore";
import Chart from "react-apexcharts";

function Graph() {
  const { dashboardData } = useDashboardStore();

  if (!dashboardData) {
    return null;
  }

  const series = [dashboardData?.daily_profit, dashboardData?.pending_roi];

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: ["ROI", "Pending"],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, w }) {
        // pick your own color based on the slice
        const colors = ["#38C66C", "#828985"]; // one color per slice
        const bg = colors[seriesIndex] || "#333";
        const label = w.globals.labels[seriesIndex];

        return `
      <div style="
        background:${bg};
        color:#fff;
        padding:6px 10px;
        border-radius:6px;
        font-size:14px;">
        <strong>${label}</strong>: ${series[seriesIndex]}
      </div>
    `;
      },
    },
    stroke: {
      show: true,
      width: 6,
      colors: "#1F2C24",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "radial",
        shadeIntensity: 0.5,
        gradientToColors: ["#78FCA3", "#1F2C24"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#7EDA9F", "#fff"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
  };

  const options1 = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: ["Direct Income", "Delegator Reward", "Delegator Level", "Pending"],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, w }) {
        // pick your own color based on the slice
        const colors = ["#38C66C", "#4CC9B0", "#FFD166", "#828985"]; // one color per slice
        const bg = colors[seriesIndex] || "#333";
        const label = w.globals.labels[seriesIndex];

        return `
      <div style="
        background:${bg};
        color:#fff;
        padding:6px 10px;
        border-radius:6px;
        font-size:14px;">
        <strong>${label}</strong>: ${series[seriesIndex]}
      </div>
    `;
      },
    },
    stroke: {
      show: true,
      width: 6,
      colors: "#1F2C24",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "radial",
        shadeIntensity: 0.5,
        gradientToColors: ["#78FCA3", "#4CC9B0", "#FFD166", "#1F2C24"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#7EDA9F", "#84D8C7", "#fff", "#fff"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
  };

  const series1 = [
    dashboardData?.direct_income,
    dashboardData?.daily_profit,
    dashboardData?.level_profit,
    dashboardData?._4x_pending,
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-3 sm:gap-5">
      <div className="rounded-lg bg-[#1F2C24] p-3">
        <div className="flex items-center gap-2 border-b border-[#334038] pb-2 font-bold">
          <RiCoinFill className="text-gray-300" /> DELEGATOR REWARD 2.4x
        </div>
        <div className="py-3 flex gap-3 sm:flex-row flex-col">
          <div className="text-sm flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <IoIosSettings className="text-[#38C66C]" /> Delegator Amount - $
              {dashboardData?.total_investment.toFixed(4)}
            </div>
            <div className="flex items-center gap-2">
              <GiChessQueen className="text-[#34A48B]" /> DELEGATOR Rewards- $
              {dashboardData?.total_capping_2x.toFixed(4)}
            </div>
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-[#4E7AD9]" />
              Earned Reward - $ {dashboardData?.daily_profit.toFixed(4)}
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding className="text-[#FFD166]" />
              Pending Reward - $ {dashboardData?.pending_roi.toFixed(4)}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {" "}
            <Chart options={options} series={series} type="donut" width="280" />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#1F2C24] p-3">
        <div className="flex items-center gap-2 border-b border-[#334038] pb-2 font-bold">
          <RiCoinFill className="text-gray-300" />
          AFFILIATE REWARD 4.5x
        </div>
        <div className="py-3 flex gap-3 sm:flex-row flex-col">
          <div className="text-sm flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <IoIosSettings className="text-[#38C66C]" /> Delegator Amount - $
              {dashboardData?.total_investment.toFixed(4)}
            </div>
            <div className="flex items-center gap-2">
              <GiChessQueen className="text-[#34A48B]" /> DELEGATOR Rewards- $
              {dashboardData?.total_capping_4x.toFixed(4)}
            </div>
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-[#4E7AD9]" />
              Earned Reward - $ {dashboardData?._4x_income.toFixed(4)}
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding className="text-[#FFD166]" />
              Pending Reward - $ {dashboardData?._4x_pending.toFixed(4)}
            </div>
          </div>
          <div className="flex items-center justify-center flex-1">
            {" "}
            <Chart
              options={options1}
              series={series1}
              type="donut"
              width="280"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
