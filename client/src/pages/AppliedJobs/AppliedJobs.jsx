import { useDisclosure } from "@heroui/modal";
import {Avatar, Chip} from "@heroui/react";
import { AiOutlineRight } from "react-icons/ai";
import { JobDetails } from '../../component/JobDetails/JobDetails'
import { useState } from "react";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { useGetApplications } from '../../hooks/applications/useGetApplications'

const Applications = [
    {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    type: "Full Time",
    tag: "Frontend",
    salary: "5-6LPA",
    status: 'Applied'
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataCore",
    location: "Bangalore",
    type: "Remote",
    tag: "Backend",
    salary: "5-6LPA",
    status: 'Seen'
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Mumbai",
    type: "Hybrid",
    tag: "Design",
    salary: "5-6LPA",
    status: 'Rejected'

  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Meta",
    location: "London",
    type: "Hybrid",
    tag: "Fullstack",
    salary: "50-60LPA",
    status: 'Accepted'
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "PixelCraft",
    location: "Mumbai",
    type: "Hybrid",
    tag: "DevOps",
    salary: "5-6LPA",
    status: 'Accepted'
  },
]

export const AppliedJobs = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [app, setApp] = useState(null);
    
    const { applications, isError } = useGetApplications();

    function handleClick(application) {
        setApp(application);
        onOpen();
    };

    if(isError) {
        return(
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel not found</span>
            </div>
        );
    }

    return (
        <>  
            <JobDetails 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                job={app}
                isVisible={false}
            />
            <div className="lg:mx-[200px] mx-28">
                <h1 className="m-6 text-4xl">Applications</h1>
                <div>
                    {
                        applications?.map(application => (
                            <div 
                                key={application?.jobDetails._id}
                                className="border-2 rounded-xl p-5 m-5 flex justify-between items-center"
                            >
                                <div className="w-full flex gap-4 items-center justify-between pr-10">
                                    <div className="flex gap-4">
                                        <Avatar size="lg" src={application?.jobDetails?.logo} />
                                        <div className="text-sm text-muted-foreground">
                                            <p className="text-lg text-white">{application?.jobDetails.company}</p>
                                            <p>{application?.jobDetails.jobTitle}</p>
                                            <p>{application?.jobDetails.location}</p>
                                        </div>
                                    </div>
                                    <Chip 
                                        classNames={{
                                            base: `bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30`,
                                            content: "drop-shadow shadow-black text-white",
                                        }}
                                        variant="shadow"
                                    >{application?.status}</Chip>
                                </div>
                                <AiOutlineRight 
                                    size={20} 
                                    onClick={() => handleClick(application.jobDetails)}
                                    className="cursor-pointer hover:animate-wiggle"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}