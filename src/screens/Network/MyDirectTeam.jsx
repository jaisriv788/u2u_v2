import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../store/userStore";
import useConstStore from "../../store/constStore";
import Footer from "../../components/common/FooterTwo";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function MyDirectTeam() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [level, setlevel] = useState("");

  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState(item);

  useEffect(() => {
    // console.log({ item });
    const fetchUserData = async () => {
      setScreenLoading(true);
      if (user && isConnected) {
        try {
          const { data: resp } = await axios.post(
            `${baseUrl}direct_team`,
            { user_id: searchData?.id },
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
            setFilteredData(resp.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setScreenLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user, isConnected, baseUrl, token, setScreenLoading, searchData]);

  useEffect(() => {
    const search = searchValue.trim().toLowerCase();

    const filtered = search
      ? data.filter(
          (item) =>
            String(item.name || "")
              .toLowerCase()
              .includes(search) ||
            String(item.user_id || "")
              .toLowerCase()
              .includes(search) ||
            String(item.level || "")
              .toLowerCase()
              .includes(search)
        )
      : data;

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchValue, data]);

  useEffect(() => {
    if (level === "" || level === "0") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => String(item.level) === level));
    }
    setCurrentPage(1);
  }, [level, data]);

  const handleChangeRows = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleLevel = (e) => {
    setlevel(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentRows = filteredData.slice(startIdx, endIdx);

  // ---- Compact pagination helper ----
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
    <div className="flex-1 flex flex-col p-4 overflow-x-hidden">
      {/* <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Team Network</div>
        <div className="text-xs">
          <span className="text-green-300">Network</span> {">>"} Team Network
        </div>
      </div> */}

      <div className="rounded-lg bg-[#1F2C24] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
          Team Network{" "}
          <select
            value={level}
            onChange={handleLevel}
            className="bg-[#26362C] px-1 py-0.5 ml-2 rounded-lg text-sm"
          >
            <option value="">Select Level</option>
            <option value="0">All</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
            <option value="6">Level 6</option>
            <option value="7">Level 7</option>
            <option value="8">Level 8</option>
            <option value="9">Level 9</option>
            <option value="10">Level 10</option>
            <option value="11">Level 11</option>
            <option value="12">Level 12</option>
            <option value="13">Level 13</option>
            <option value="14">Level 14</option>
            <option value="15">Level 15</option>
            <option value="16">Level 16</option>
            <option value="17">Level 17</option>
            <option value="18">Level 18</option>
            <option value="19">Level 19</option>
            <option value="20">Level 20</option>
          </select>
        </div>

        <div className="pt-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              Show{" "}
              <select
                value={rowsPerPage}
                onChange={handleChangeRows}
                className="bg-[#26362C] p-1 rounded-lg"
              >
                {[10, 25, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>{" "}
              entries
            </div>
            <div className="flex gap-2 items-center">
              Search:
              <input
                value={searchValue}
                onChange={handleSearch}
                placeholder="Type to search"
                className="bg-[#26362C] px-2 py-1 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-4 w-full max-w-full h-114">
          <table className="table w-full text-xs">
            <thead className="text-gray-300">
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Name</th>
                <th>View Team</th>
                <th>Total Member</th>
                <th>Created</th>
                <th>Activated</th>
                <th>Delegator Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No Data Found
                  </td>
                </tr>
              ) : (
                currentRows.map((item, idx) => (
                  <tr key={`idx${idx}`}>
                    <td className="text-nowrap">{idx + 1}</td>
                    <td
                      onClick={() =>
                        navigate("/directteamdetails", { state: { item } })
                      }
                      className="text-nowrap text-[#7de3a3] cursor-pointer"
                    >
                      {item.view_team}
                    </td>
                    <td className="text-nowrap">{item.name}</td>
                    <td
                      onClick={() => setSearchData(item)}
                      className="text-nowrap text-[#2bdcc7] cursor-pointer"
                    >
                      {item.view_team}
                    </td>
                    <td className="text-nowrap">{item.total_member}</td>
                    <td className="text-nowrap">
                      {item.created != "-"
                        ? new Date(item.created).toLocaleString("en-GB", {
                            hour12: false,
                          })
                        : "-"}
                    </td>
                    <td className="text-nowrap">
                      {item.activated != "-"
                        ? new Date(item.activated).toLocaleString("en-GB", {
                            hour12: false,
                          })
                        : "-"}
                    </td>
                    <td className="text-nowrap">
                      {item.delegator_amount ?? "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
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
                <span key={`i${i}`} className="px-2 py-1 text-gray-400">
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
              className="px-2 py-1 cursor-pointer bg-[#26362C] rounded hover:bg-[#1F2C24] disabled:opacity-50"
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

export default MyDirectTeam;
