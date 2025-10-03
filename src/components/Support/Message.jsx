import { useState } from "react";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
const Category = [
  "ACTIVATION",
  "PROMO PACKAGE",
  "WITHDRAWAL",
  "DEPOSIT",
  "PROFILE",
  "OTHERS",
];

const Priority = ["Normal", "Medium", "High"];

function Message({ refresh, setRefresh }) {
  const { baseUrl } = useConstStore();
  const { user, token } = useUserStore();

  const [msg, setMsg] = useState("");
  const [supportCategory, setSupportCategory] = useState("ACTIVATION");
  const [supportPriority, setSupportPriority] = useState("Normal");
  const [loading, setLoading] = useState(false);

  async function handleSumbit() {
    if (msg == "") {
      alert("Enter Message To Raise Ticket.");
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(
        `${baseUrl}store_ticket`,
        {
          subject: supportCategory,
          priority: supportPriority,
          detail: msg,
          user_id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == 200) {
        setMsg("");
        setSupportCategory("ACTIVATION");
        setSupportPriority("Normal");
        alert("Ticket Raised Successfully");
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#1F2C24] rounded-lg p-4 my-5">
      <div className="font-semibold text-lg border-b border-[#27382E] pb-2">
        Support
      </div>

      <div className="mt-2 flex flex-col gap-3 text-sm">
        <div className="flex flex-col">
          <span className="">Category</span>
          <select
            value={supportCategory}
            onChange={(e) => setSupportCategory(e.target.value)}
            className="rounded bg-[#26362C] px-3 py-0.5"
          >
            {Category?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <span className="">Priority</span>
          <select
            value={supportPriority}
            onChange={(e) => setSupportPriority(e.target.value)}
            className="rounded bg-[#26362C] px-3 py-0.5"
          >
            {Priority?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <span className="">Message</span>
          <textarea
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="bg-[#26362C] rounded px-3 py-0.5 h-28"
          />
        </div>

        <div className="flex gap-5 mt-5">
          <button
            onClick={handleSumbit}
            disabled={loading}
            className="bg-[#22b357] hover:bg-[#56CF82] transition ease-in-out duration-300 cursor-pointer px-3 py-0.5 rounded w-fit mt-3"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
