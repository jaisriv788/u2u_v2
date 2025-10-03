import React, { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import axios from "axios";
import Footer from "../../components/common/FooterTwo";
import { useNavigate } from "react-router";

function MyDirect() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  const navigate = useNavigate();

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const response = await axios.post(
            `${baseUrl}my_direct`,
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
          item.username?.toLowerCase().includes(search) ||
          item.first_name?.toLowerCase().includes(search) ||
          item.phone_no?.toLowerCase().includes(search) ||
          item.email?.toLowerCase().includes(search)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchValue, data]);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleChangeRows = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

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

    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.username?.toLowerCase().includes(search) ||
          item.first_name?.toLowerCase().includes(search) ||
          item.phone_no?.toLowerCase().includes(search) ||
          item.email?.toLowerCase().includes(search)
      );
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
      <div className="rounded-lg bg-[#1F2C24] px-5 py-2 mb-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
          My Direct Team
        </div>

        <div className="pt-3">
          <div className="text-sm text-gray-300">
            View your referral network
          </div>
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

        {/* ✅ Constrain the wrapper so it never grows wider than the screen */}
        <div className="overflow-x-auto w-full max-w-full mt-4 h-128">
          <table className="table w-full text-xs">
            <thead className="text-gray-300">
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>View Team</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                currentRows.map((item, index) => (
                  <React.Fragment key={startIdx + index}>
                    <tr
                      className={
                        (index + startIdx) % 2 === 0
                          ? "bg-[#303C34]"
                          : "bg-[#1F2C24]"
                      }
                    >
                      <td className="flex gap-2 items-center text-nowrap">
                        <button
                          onClick={() => toggleExpand(startIdx + index)}
                          className={`w-5 h-5 cursor-pointer flex items-center justify-center rounded-full text-white font-semibold transition-transform duration-300 transform ${
                            expandedIndex === startIdx + index
                              ? "bg-red-500 rotate-45"
                              : "bg-green-400 hover:bg-green-500"
                          }`}
                        >
                          +
                        </button>
                        <span className="font-medium text-gray-100 text-nowrap">
                          {startIdx + index + 1}
                        </span>
                      </td>
                      <td
                        onClick={() =>
                          navigate("/directteamdetails", { state: { item } })
                        }
                        className="text-[#9DE0B6] cursor-pointer text-nowrap"
                      >
                        {item.username}
                      </td>

                      <td className="text-nowrap">{item.first_name}</td>
                      <td className="text-nowrap">{item.phone_no}</td>
                      <td className="text-nowrap">{item.email}</td>
                      <td
                        onClick={() =>
                          navigate("/mydirectteam", { state: { item } })
                        }
                        className="text-[#58C4BB] cursor-pointer text-nowrap"
                      >
                        {item.username}
                      </td>
                    </tr>

                    {expandedIndex === startIdx + index && (
                      <tr>
                        <td colSpan={6}>
                          <div className="p-4 text-sm text-gray-200 animate-slideDown">
                            <p>
                              <strong>Created:</strong>{" "}
                              {item.created_at
                                ? new Date(item.created_at).toLocaleString(
                                    "en-GB",
                                    { hour12: false }
                                  )
                                : "-"}
                            </p>
                            <p>
                              <strong>Activated:</strong>{" "}
                              {item.activated_at || "-"}
                            </p>
                            <p>
                              <strong>Delegator Amount:</strong> $
                              {item.total_lend_amount || "0"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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

export default MyDirect;
