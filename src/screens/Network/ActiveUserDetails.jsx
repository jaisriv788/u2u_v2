import { useEffect, useState } from "react";
import Footer from "../../components/common/FooterTwo";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

function ActiveUserDetails() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  useEffect(() => {
    // console.log({ item });
    const fetchUserData = async () => {
      setScreenLoading(true);
      if (user && isConnected) {
        try {
          const { data: resp } = await axios.post(
            `${baseUrl}levelNetworkView`,
            { user_id: user?.id, level: item.level },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        //   console.log(resp.data);
          if (resp.status === 200) {
            setData(resp.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setScreenLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user, isConnected, baseUrl, token, setScreenLoading]);
  return (
    <div className="flex-1 p-4 flex flex-col overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Level Network</div>
        <div className="text-xs">
          <span className="text-green-300">Network</span> {">>"} Level Network
        </div>
      </div>
      <div className="rounded-lg bg-[#1F2C24] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3 ">
          Level Network
        </div>

        <div className="overflow-x-auto mt-4 w-full max-w-full">
          <table className="table w-full text-xs ">
            <thead className="text-gray-300">
              <tr>
                <th className="text-center">S.no</th>
                <th className="text-center">Level</th>
                <th className="text-center">Username</th>
                <th className="text-center">Lend Amount</th>
                <th className="text-center">Roi Received</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-nowrap text-center">{index + 1}</td>
                    <td className="text-nowrap text-center">{item.level}</td>
                    <td className="text-center">{item.username}</td>
                    <td className="text-center">${item.lend_amount}</td>
                    <td
                      onClick={() =>
                        navigate("/amountdetail", { state: { item } })
                      }
                      className="text-center text-green-400 cursor-pointer"
                    >
                      ${item.roi_received.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ActiveUserDetails;
