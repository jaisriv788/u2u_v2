import { TbSpeakerphone } from "react-icons/tb";

function Marquee() {
  return (
    <div className="relative h-fit flex items-center">
      <TbSpeakerphone className="absolute left-5 text-black font-semibold text-3xl" />
      <marquee className="rounded-lg py-2.5 text-[17px] bg-gradient-to-r from-[#01C9FE] to-[#90FD9E] text-black">
        <span className="font-semibold">Notice: </span>Welcome to the{" "}
        <span className="text-sky-950 font-semibold">
          U2U DELEGATOR REWARD PROGRAM!{" "}
        </span>
        Enjoy your rewards and keep growing your team.
      </marquee>
    </div>
  );
}

export default Marquee;
