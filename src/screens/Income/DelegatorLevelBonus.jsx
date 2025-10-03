import { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import axios from "axios";
import Footer from "../../components/common/FooterTwo";

function DelegatorLevelBonus() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.post(
            `${baseUrl}delegator_level_bonus`,
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
            setData(response.data.data.logs);
            setFilteredData(response.data.data.logs);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setScreenLoading(false);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleDateFilter = () => {
    let filtered = [...data];

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((item) => {
        const created = new Date(item.created_at);
        return created >= from && created <= to;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentRows = filteredData.slice(startIdx, endIdx);

  const getPageNumbers = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);
    if (left > 2) pages.push("…");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex-1 p-4 flex flex-col overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold"> Delegator Level Bonus</div>
        <div className="text-xs">
          <span className="text-green-300">Income</span> {">>"} Delegator Level
          Bonus
        </div>
      </div>
      <div className="rounded-lg bg-[#1F2C24] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
          Delegator Level Bonus
        </div>

        <div className="pt-3">
          <div className="mt-3 flex md:flex-row flex-col md:gap-5 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="md:w-50 rounded-lg px-3 bg-[#26362C] text-sm py-1.5"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="md:w-50 rounded-lg px-3 bg-[#26362C] text-sm py-1.5"
              />
            </div>
            <button
              onClick={handleDateFilter}
              className="bg-green-400 h-fit md:self-end px-5 py-1 rounded-lg cursor-pointer hover:bg-green-500 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full max-w-full mt-4 h-118">
          <table className="table w-full text-xs">
            <thead className="text-gray-300">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>UserId</th>
                <th>Level</th>
                <th>Amount</th>
                <th>%</th>
                <th>Bonus</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                currentRows.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      (index + startIdx) % 2 === 0
                        ? "bg-[#303C34]"
                        : "bg-[#1F2C24]"
                    }
                  >
                    <td className="text-nowrap">{index + 1}</td>
                    <td className="text-nowrap">
                      {item.created_at != "-"
                        ? new Date(item.created_at).toLocaleString("en-GB", {
                            hour12: false,
                          })
                        : "-"}
                    </td>

                    <td className="text-nowrap">{item.username}</td>
                    <td className="text-nowrap">{item.level}</td>
                    <td className="text-nowrap">$ {item.net_amount}</td>
                    <td className="text-nowrap">{item.perc}</td>
                    <td className="text-nowrap">$ {item.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="text-gray-400 text-sm hidden sm:block">
            Showing {filteredData.length ? startIdx + 1 : 0} to{" "}
            {Math.min(endIdx, filteredData.length)} of {filteredData.length}{" "}
            entries
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-2 cursor-pointer py-1 bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
            >
              Prev
            </button>
            {getPageNumbers().map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="px-2 py-1 text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-2 cursor-pointer py-1 rounded ${
                    currentPage === p
                      ? "bg-green-400 text-white"
                      : "bg-[#26362C] text-gray-200 hover:bg-[#1F2C24]"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 cursor-pointer py-1 bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DelegatorLevelBonus;
