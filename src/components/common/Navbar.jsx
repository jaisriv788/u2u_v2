import { useState } from "react";
import logoImgSrc from "../../assets/Navbar/logo.jpg";
import profileImgSrc from "../../assets/Navbar/profile.png";
import NavProfileDetail from "./NavProfileDetail";
import { MdMenuOpen } from "react-icons/md";
import useModalStore from "../../store/modalStore";
import useUserStore from "../../store/userStore";

function Navbar() {
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useModalStore();
  const { user } = useUserStore();

  // console.log({ user });

  return (
    <div className="h-15 flex items-center justify-between px-6">
      <div className="flex items-center sm:gap-8 md:gap-15">
        <img
          src={logoImgSrc}
          alt="icon"
          className="h-12 cursor-pointer hidden sm:flex"
        />
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-gradient-to-r cursor-pointer from-[#01CAFF] to-[#91FE9D] w-8 h-8 rounded flex items-center justify-center text-white text-xl"
        >
          <MdMenuOpen />
        </div>
      </div>
      <div
        onClick={() => {
          setIsProfileDetailOpen((prev) => !prev);
        }}
        className="rounded w-10 h-10 bg-[#1F2C24] flex items-center cursor-pointer justify-center hover:bg-[#38C66C] transition ease-in-out duration-300"
      >
        <img
          src={user.image ? user.image : profileImgSrc}
          alt="profile"
          className="h-7 "
        />
      </div>
      {isProfileDetailOpen && (
        <NavProfileDetail setIsProfileDetailOpen={setIsProfileDetailOpen} />
      )}
    </div>
  );
}

export default Navbar;
