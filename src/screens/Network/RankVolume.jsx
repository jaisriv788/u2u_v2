import { useEffect, useState } from "react";
import Footer from "../../components/common/FooterTwo";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import axios from "axios";

function RankVolume() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setScreenLoading(true);
      if (user && isConnected) {
        try {
          const { data: resp } = await axios.post(
            `${baseUrl}rank_volume`,
            { user_id: user?.id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // console.log(resp.data);

          if (resp.status === 200) {
            setData(resp.data.ranks);
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
        <div className="text-lg font-semibold">Rank Volume</div>
        <div className="text-xs">
          <span className="text-green-300">Rank Volume</span> {">>"} Network
        </div>
      </div>
      <div className="rounded-lg overflow-hidden bg-[#1F2C24] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3 ">
          Rank Volume
        </div>

        <div className="overflow-x-auto mt-4 ">
          <table className="table w-full text-xs ">
            <thead className="text-gray-300">
              <tr>
                <th>Strong Leg / Other Leg (Criteria)</th>
                <th>Strong Leg Volume</th>
                <th>Other Leg Volume</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-nowrap ">{item.criteria}</td>
                    <td className="text-nowrap">{item.strong_leg}</td>
                    <td className="text-nowrap">{item.other_leg}</td>
                    <td className="text-nowrap">{item.reward}</td>
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

export default RankVolume;
