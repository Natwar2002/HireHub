import CommonButton from "../Button/Button";
import people from "../../assets/people.png";
import { JobDetails } from "../JobDetails/JobDetails";
import { useDisclosure } from "@heroui/modal";
import { IoBag } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";

export default function JobCard({ job }) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <>
      <JobDetails 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        job={job}
      />
      <div
        className="bg-[#2c2f45] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
          <span className="flex items-center gap-2 text-sm text-muted-foreground"> <img src={people} alt="people" className="h-4 w-4" />{job.applied} Applied</span>
        </div>
        <p className="text-sm text-gray-300">{job?.company} • {job?.location} • {job?.jobType}</p>
        <div className="mt-3 text-gray-400 text-sm">
          <ul className="flex gap-1">
            {job?.tags.map((tag, i) => (
              <span key={i} className="bg-[#44476A] text-white px-2 py-1 rounded-md text-xs">{tag}</span>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-2"><IoBag /> <span>{job?.experience}</span></p>
            <p className="flex items-center gap-2"><MdCurrencyRupee /> <span>{job?.salary}</span></p>
          </div>
          <CommonButton 
            text={"Apply"}
            onClickHandler={onOpen}
          />
        </div>
      </div>
    </>
  );
}
