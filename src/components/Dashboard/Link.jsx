import { FaCopyright, FaFacebook } from "react-icons/fa";
import QRCode from "react-qr-code";
import useUserStore from "../../store/userStore";
import { FaWhatsapp } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import useDashboardStore from "../../store/dashboardStore";
import Chart from "react-apexcharts";

function Link() {
  const { user } = useUserStore();
  const { dashboardData } = useDashboardStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://u2uglobal.xyz/register/${user?.username}`
      );
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const text = `https://u2uglobal.xyz/register/${user?.username}`;

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          value: {
            show: true,
            color: "#fff", // <-- white color for values
            fontSize: "16px",
            fontWeight: "bold",
          },
          total: {
            show: true,
            label: "TOTAL",
            formatter: function () {
              return "";
            },
            style: {
              color: "#fff", // white color for total label
              fontSize: "16px",
              fontWeight: "bold",
            },
          },
        },
        track: {
          strokeWidth: "60%",
          background: "#333",
        },
        hollow: {
          size: "60%",
        },
      },
    },
    labels: ["Delegator Reward", "Delegator Level", "Direct Income"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: "#fff",
      },
      markers: {
        width: 12,
        height: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
      formatter: function (seriesName, opts) {
        // seriesName is the label, opts.seriesIndex gives the index
        const value = opts.w.config.series[opts.seriesIndex];
        return `${seriesName}: ${value}%`; // label with value
      },
    },
  };

  const first = +(
    (dashboardData?.daily_profit / dashboardData?.total_capping_2x) *
    100
  ).toFixed(4);
  const middle = +(
    (dashboardData?.level_profit / dashboardData?.total_capping_4x) *
    100
  ).toFixed(4);
  const last = +(
    (dashboardData?.direct_income / dashboardData?.total_capping_4x) *
    100
  ).toFixed(4);

  const series = [first, middle, last];

  return (
    <div className="grid lg:grid-cols-2 gap-3 sm:gap-5">
      <div
        className="bg-gradient-to-br from-[#06060C] via-[#060D13] to-[#0E4A30]
                   rounded-lg px-4 py-6
                   flex flex-col sm:flex-row
                   items-center 
                   justify-between
                   gap-6
                   overflow-hidden"
      >
        <div className="text-center sm:text-left w-full sm:max-w-[60%]">
          <div className="text-white font-semibold">Invitation Link</div>

          <div className="text-sm text-white break-words">
            https://u2uglobal.xyz/register/
            {user?.username}
          </div>

          <div className="flex justify-center sm:justify-start gap-3 mt-5 text-white">
            <FaCopyright
              className="cursor-pointer"
              onClick={handleCopy}
              size={28}
            />
            <FaFacebook
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/share_channel/?type=reshare&link=https%3A%2F%2Fworldofsoftware.in%2Fu2u_global%2Fregister%2FU2Ufirst&app_id=966242223397117&source_surface=external_reshare&display&hashtag#",
                  "_"
                )
              }
              size={28}
            />
            <FaWhatsapp
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?text=https://worldofsoftware.in/u2u_global/register/U2Ufirst",
                  "_"
                )
              }
              size={28}
            />
          </div>
        </div>

        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <QRCode
            value={text}
            size={130}
            style={{
              width: "100%",
              maxWidth: "130px",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#0F0F1D] via-[#102031] to-[#24BB79] rounded-lg p-3 flex flex-col gap-3">
        <div className="font-bold flex gap-2 items-center border-b pb-2 border-gray-600">
          <FaInbox /> INCOME CAPPING - ( 2.4X ) OR ( 4.5X )
        </div>

        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={180}
        />
      </div>
    </div>
  );
}

export default Link;
