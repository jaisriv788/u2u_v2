import { useLocation } from "react-router";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router";

function BuyPackage() {
  const location = useLocation();
  const selectedPackage = location.state?.package;

  //   console.log(selectedPackage);
  const { baseUrl } = useConstStore();
  const { user, token } = useUserStore();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [responseMsg, setResponseMsg] = useState("");
  const [isModal2Open, setIsModal2Open] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}package_confirm`,
        {
          user_id: user?.id,
          payment_method: "deposit_wallet",
          package_id: selectedPackage.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseMsg(response.data.msg);
      setIsModalOpen(false);
      setIsModal2Open(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-4">
      <div className="bg-[#1F2C24] h-fit rounded-3xl shadow-2xl w-full p-6 sm:p-10 flex flex-col overflow-hidden">
        {/* Title */}
        <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
          {selectedPackage.title}
        </h2>

        {/* Image and Details Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 w-full">
          {/* Package Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
            <img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-full h-auto object-contain rounded-xl shadow-lg border-2 border-gray-700"
            />
          </div>

          {/* Package Details */}
          <div className="flex-1 flex flex-col gap-4 w-full lg:w-1/2">
            <div className="flex flex-col gap-2 bg-[#2B3A2E] p-4 rounded-xl shadow-inner">
              {[
                selectedPackage.min_price &&
                  `Delegator: $${selectedPackage.min_price}`,
                selectedPackage.roi && `Bonus (%): ${selectedPackage.roi}`,
                selectedPackage.uphone_price &&
                  `UPhone Price: $${selectedPackage.uphone_price}`,
                selectedPackage.depin_price &&
                  `D-Pin Price: $${selectedPackage.depin_price}`,
                selectedPackage.u2u_coin && `Coin: ${selectedPackage.u2u_coin}`,
                selectedPackage.trip && `Trip: ${selectedPackage.trip}`,
                selectedPackage.promo_kit &&
                  `Promo-Kit: ${selectedPackage.promo_kit}`,
                (selectedPackage.fee || selectedPackage.fee === 0) &&
                  `Validator Platform Fees: ${selectedPackage.fee}%`,
                selectedPackage.descriptions &&
                  `Descriptions: ${selectedPackage.descriptions}`,
              ]
                .filter(Boolean) // remove falsy values (undefined, null, "")
                .map((text, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 break-words"
                  >
                    <TiTick className="text-emerald-400 w-6 h-6 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 font-medium">{text}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r cursor-pointer from-emerald-400 via-green-500 to-teal-400 hover:from-emerald-500 hover:via-green-600 hover:to-teal-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Buy Now
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 overflow-auto p-4">
            <div className="bg-[#1F2C24] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center max-h-[90vh] overflow-auto">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-6">
                Are you sure you want to buy this package?
              </h3>
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  {loading ? "Purchasing..." : "Confirm"}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-700  cursor-pointer hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isModal2Open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 overflow-auto p-4">
            <div className="bg-[#1F2C24] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center max-h-[90vh] overflow-auto">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-6">
                {responseMsg}.
              </h3>
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                <button
                  onClick={() => {
                    setIsModal2Open(false);
                    navigate("/delegatorppactivation");
                  }}
                  className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyPackage;
