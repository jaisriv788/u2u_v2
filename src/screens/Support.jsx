import { useState } from "react";
import Message from "../components/Support/Message";
import Tickets from "../components/Support/Tickets";

function Supprot() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-4 flex-1 overflow-x-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Support</div>
        <div className="text-xs">
          <span className="text-green-300">Support</span> {">>"} Support
        </div>
      </div>

      <Message refresh={refresh} setRefresh={setRefresh} />
      <Tickets refresh={refresh} />
    </div>
  );
}

export default Supprot;
