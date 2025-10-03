import { useLocation } from "react-router";
import Footer from "../common/FooterTwo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useConstStore from "../../store/constStore";
import useUserStore from "../../store/userStore";
import { FaUserAlt } from "react-icons/fa";
import { format } from "date-fns";

function Chat() {
  const location = useLocation();
  const { item } = location.state;
  const bottomRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();

  useEffect(() => {
    firstLoad && setScreenLoading(true);
    const fetchChatData = async () => {
      try {
        if (isConnected && user) {
          const response = await axios.post(
            `${baseUrl}ticket_reply`,
            { ticket_id: item?.ticket },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.status == 200) {
            setChats(response.data.data);
            setFirstLoad(false);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        firstLoad && setScreenLoading(false);
      }
    };

    fetchChatData();
  }, [refresh]);

  useEffect(() => {
    // Scroll to bottom whenever chats change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  async function handleSubmitMsg() {
    if (msg == "") {
      alert("Message Can Not Be Empty.");
      return;
    }
    try {
      if (isConnected && user) {
        setLoading(true);
        const response = await axios.post(
          `${baseUrl}ticket_reply_store`,
          { ticket: item?.ticket, comment: msg },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status == 200) {
          setMsg("");
          setRefresh(!refresh);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 p-4 flex flex-col overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Support</div>
        <div className="text-xs">
          <span className="text-green-300">Datatable</span> {">>"} Support
        </div>
      </div>
      <div className="rounded-lg bg-[#1F2C24] px-5 py-2 my-5">
        <div className="font-semibold border-b border-gray-500 pb-3">
          Support
        </div>
        <div className="my-3 flex flex-col gap-3 max-h-90 overflow-y-auto overflow-x-hidden">
          {chats.map((chat, index) =>
            chat.type == 1 ? (
              <div
                key={index}
                className="flex items-end justify-end gap-2 w-full"
              >
                <div className="bg-green-900/40 text-white rounded-2xl px-4 py-2 shadow-md break-words max-w-[60%]">
                  <div className="text-sm font-semibold text-green-300">
                    {user.username}
                  </div>
                  <div className="text-base break-words">{chat.comment}</div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    {format(
                      new Date(chat.created_at),
                      "MMMM do, yyyy - h:mm a"
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-700 text-white shrink-0">
                  <FaUserAlt size={12} />
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="flex items-end justify-start gap-2 w-full"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white shrink-0">
                  <FaUserAlt size={12} />
                </div>
                <div className="bg-gray-800 text-white rounded-2xl px-4 py-2 shadow-md break-words max-w-[60%]">
                  <div className="text-sm font-semibold text-gray-300">
                    U2U DELEGATOR REWARD PROGRAM
                  </div>
                  <div className="text-base break-words">{chat.comment}</div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {format(
                      new Date(chat.created_at),
                      "MMMM do, yyyy - h:mm a"
                    )}
                  </div>
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm">Leave a Reply</span>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full focus:outline-none bg-[#26362C] rounded-lg p-2 h-20"
            placeholder="Message"
          />
          <button
            onClick={handleSubmitMsg}
            disabled={loading}
            className="bg-[#38C66C] hover:bg-[#56CF82] transition ease-in-out duration-300 tex-white rounded w-fit px-5 cursor-pointer mt-2"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
