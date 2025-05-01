import React from "react";
import CommonButton from "../Button/Button";
import people from "../../assets/people.png";

export default function JobCard() {
  return (
    <div className="w-[420px] p-6 rounded-xl border border-[#727272]">
      <div className="flex items-center gap-5">
        <span className="border rounded-lg px-6 py-3">Full Time</span>
        <span className="border rounded-lg px-6 py-3">OnSite</span>
        <span className="border rounded-lg px-6 py-3">6-10LPA</span>
      </div>
      <div className="my-5">
        <p className="text-2xl font-cabinet font-light">Frontend Developer</p>
        <span className="font-extralight">Physics Wallah Pvt limited</span>
      </div>
      <div className="flex items-center justify-between">
        <CommonButton text={"Apply"} />
        <span className="flex items-center gap-2"> <img src={people} alt="people" />24 Applied</span>
      </div>
    </div>
  );
}
