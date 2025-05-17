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
        key={job.id}
        className="bg-[#2c2f45] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
          <span className="flex items-center gap-2 text-sm text-muted-foreground"> <img src={people} alt="people" className="h-4 w-4" />{job.applied} Applied</span>
        </div>
        <p className="text-sm text-gray-300">{job.company} • {job.location} • {job.type}</p>
        <div className="mt-3 text-gray-400 text-sm">
          <p className="flex items-center gap-2"><IoBag /> <span>2-3 Years</span></p>
          <p className="flex items-center gap-2"><MdCurrencyRupee /> <span>{job?.salary}</span></p>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span className="bg-[#44476A] text-white px-2 py-1 rounded-md text-xs">{job.tag}</span>
          <CommonButton 
            text={"Apply"}
            onClickHandler={onOpen}
          />
        </div>
      </div>
    </>
  );
}
