import React from "react";
import SwitchButton from "../Switch/SwitchButton";
import Logo from "../../assets/job-search.png";

export default function NavBar() {
  return (
    <div className="w-[80vw] h-10 flex items-center justify-between mx-auto mt-10 ">
      <div className="flex items-center max-xl:flex-col max-xl:items-start ">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10" />
          <p className="text-2xl font-bold">HireHub</p>
        </div>
        <div className="relative left-12 flex gap-6">
          <span className="cursor-pointer hover:text-purple-400">Home</span>
          <span className="cursor-pointer  hover:text-purple-400">
            Internships
          </span>
          <span className="cursor-pointer  hover:text-purple-400">
            Contests
          </span>
          <span className="cursor-pointer  hover:text-purple-400">Premium</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 max-lg:flex-col max-md:flex-row">
          <button className="px-14 py-4 bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] rounded-xl max-xl:py-1">
            Register
          </button>
          <button className="px-14 py-4 border-[2px] border-[#A582F7] rounded-xl max-xl:py-1">
            Get a Job
          </button>
        </div>
        <SwitchButton />
      </div>
    </div>
  );
}
