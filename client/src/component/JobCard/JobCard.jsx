import CommonButton from "../Button/Button";
import people from "../../assets/people.png";
import { JobDetails } from "../JobDetails/JobDetails";
import { useDisclosure } from "@heroui/modal";

export default function JobCard({ job }) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <JobDetails 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        job={job}
      />
      <div className="w-[420px] p-6 rounded-xl border border-[#727272] text-sm">
        <div className="flex items-center gap-5">
          <span className="border rounded-lg px-6 py-3">{job.type}</span>
          <span className="border rounded-lg px-6 py-3">{job.mode}</span>
          <span className="border rounded-lg px-6 py-3">{job.salary}</span>
        </div>
        <div className="my-5">
          <p className="text-xl font-cabinet font-light">{job.title}</p>
          <span className="font-extralight">{job.company}</span>
        </div>
        <div className="flex items-center justify-between">
          <CommonButton 
            text={"Apply"}
            onClickHandler={onOpen}
          />
          <span className="flex items-center gap-2"> <img src={people} alt="people" />{job.applied} Applied</span>
        </div>
      </div>
    </>
  );
}
