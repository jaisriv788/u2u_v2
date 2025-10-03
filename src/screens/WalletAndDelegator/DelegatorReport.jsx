import { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import axios from "axios";
import Footer from "../../components/common/FooterTwo";
import { useNavigate } from "react-router";

function DelegatorReport() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user?.id);
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.post(
            `${baseUrl}delegatorReport`,
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
            setFilteredData(response.data.data);
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

  useEffect(() => {
    let filtered = [...data];

    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.transaction_id?.toLowerCase().includes(search) ||
          item.user_username?.toLowerCase().includes(search) ||
          item.activated_by_name?.toLowerCase().includes(search) ||
          item.package_name?.toLowerCase().includes(search)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchValue, data]);

  const handleChangeRows = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
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
        <div className="text-lg font-semibold">Delegator Report</div>
        <div className="text-xs">
          <span className="text-green-300">Wallet</span> {">>"}Delegator Report
        </div>
      </div>
      <div className="rounded-lg bg-[#1F2C24] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
          Delegator Report
        </div>

        <div className="pt-3">
          <div className="mt-5 flex sm:flex-row flex-col items-center gap-3 justify-between">
            <div>
              Show{" "}
              <select
                value={rowsPerPage}
                onChange={handleChangeRows}
                className="bg-[#26362C] p-1 rounded-lg"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>{" "}
              entries
            </div>
            <div className="flex gap-2">
              Search:{" "}
              <input
                value={searchValue}
                onChange={handleSearch}
                placeholder="Type to search"
                className="bg-[#26362C] px-2 py-1 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full max-w-full mt-4 h-118">
          <table className="table w-full text-xs ">
            <thead className="text-gray-300">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Transaction Id</th>
                <th>UserId</th>
                <th>Activated By</th>
                <th>Package</th>
                <th>Delegator Amount</th>
                <th>Validator Platform Fee</th>
                <th>Total Amount</th>
                <th>Remark</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center">
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
                    <td>{index + 1}</td>
                    <td className="flex gap-2 items-center text-nowrap">
                      {item.date != "-"
                        ? new Date(item.date).toLocaleString("en-GB", {
                            hour12: false,
                          })
                        : "-"}
                    </td>
                    <td className="text-nowrap">{item.transaction_id}</td>
                    <td className="text-nowrap">{item.user_username}</td>
                    <td className="text-nowrap">{item.activated_by_name}</td>
                    <td className="text-nowrap">{item.package_name}</td>
                    <td className="text-nowrap">{item.delegator_amount}</td>
                    <td className="text-nowrap">{item.validator_fee}</td>
                    <td className="text-nowrap">{item.total_amount}</td>
                    <td className="text-nowrap">{item.remark}</td>
                    <td className="text-nowrap">
                      <span
                        onClick={() =>
                          navigate("/invoice", { state: { invoice: item } })
                        }
                        className="text-green-400 cursor-pointer hover:text-green-300 transition ease-in-out duration-300"
                      >
                        Invoice
                      </span>
                    </td>
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
              className="px-2 py-1 cursor-pointer bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
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

export default DelegatorReport;
