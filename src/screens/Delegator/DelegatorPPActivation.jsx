import { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import FooterTwo from "../../components/common/FooterTwo";
import useConstStore from "../../store/constStore";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router";

function DelegatorPPActivation() {
  const [data, setData] = useState([]);
  const { user, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  const naviagte = useNavigate();

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}packages_list`,
          { user_id: user?.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.data);
        if (response.data.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setScreenLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-4 flex-1 overflow-x-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Contact</div>
        <div className="text-xs">
          <span className="text-green-300">Apps</span> {">>"} Contact
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 my-5 flex-wrap">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[250px] md:min-w-[300px] lg:min-w-[350px] bg-[#1F2C24] rounded-lg py-2 px-5"
          >
            {/* Header */}
            <div className="font-semibold border-b pb-2 border-[#344139]">
              Package Plan
            </div>

            {/* Image and Price */}
            <div className="relative p-6 pt-8 pb-16 mt-3 flex flex-col gap-3 items-center bg-[#0B2816] rounded-lg">
              <img
                className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] object-contain"
                src={item.image}
              />
              <span className="text-sm sm:text-base">
                <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  ${item.price + item.price / 10}
                </span>
                /Pack
              </span>
              <div className="absolute text-xs sm:text-sm md:text-base lg:text-lg bg-[#41C3A9] p-2 text-center rounded-full w-36 sm:w-48 md:w-56 lg:w-64 -bottom-7 font-semibold">
                {item.title}
              </div>
            </div>

            {/* Details */}
            <div className="mt-10 flex flex-col gap-3">
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                Delegator: ${item.min_price}
              </div>
              {/* <div className="flex items-center gap-1 text-xs sm:text-sm">
                <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                Mobile: ${item.max_price}
              </div> */}
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                Bonus (%): {item.roi}
              </div>

              {item.uphone_price && (
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                  UPhone Price: ${item.uphone_price}
                </div>
              )}
              {item.depin_price && (
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                  D-Pin Price: ${item.depin_price}
                </div>
              )}
              {item.u2u_coin && (
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                  Coin: {item.u2u_coin}
                </div>
              )}
              {item.trip && (
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                  Trip: {item.trip}
                </div>
              )}
              {item.promo_kit && (
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                  Promo-Kit: {item.promo_kit}
                </div>
              )}

              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                Validator Platform Fees: {item.fee}%
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <TiTick className="text-emerald-400 w-5 h-5 flex-shrink-0" />{" "}
                Descriptions: {item.descriptions}
              </div>
            </div>
            <div className="mt-7 flex justify-center">
              <button
                onClick={() =>
                  naviagte("/buypackage", { state: { package: item } })
                }
                className=" mx-auto mb-3 bg-[#38C66C] cursor-pointer py-0.5 px-3 rounded hover:bg-[#59b87b]"
              >
                Activate Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <FooterTwo />
    </div>
  );
}

export default DelegatorPPActivation;
