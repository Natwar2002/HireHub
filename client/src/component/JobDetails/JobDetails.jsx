import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { IoBag } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { addToast, Button, Chip } from "@heroui/react";
import { MdCurrencyRupee } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useCreateApplication } from "../../hooks/applications/useCreateApplication";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import store from "../../redux/store";

export const JobDetails = ({ job, isOpen, onOpenChange, isVisible = true }) => {
  const [skills, setSkills] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const { user, userDetails } = store.getState().auth;
  const { createApplicationMutation } = useCreateApplication();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (job) {
      setSkills(job.requiredSkills);
      setResponsibilities(job.responsibilities);
    }
  }, [job]);
  
  async function handleApply(jobId) {
    if(!userDetails?.userDetails) {
      addToast({
        title: "Error while applying",
        description: "Please enter the user details before applying",
        color: "danger"
      })
      onOpenChange(false);
      return;
    }
    try {
      await createApplicationMutation(jobId);
    } catch (error) {
      console.log("Failed to apply: ", error);
    }
    queryClient.invalidateQueries("GetJobs");
    onOpenChange(false);
  }

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      placement="right"
      backdrop="opaque"
    >
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Job Details
            </DrawerHeader>
            <DrawerBody>
              <div className="flex gap-4 items-start">
                <Avatar
                  radius="md"
                  className="w-[90px] h-[90px] text-large"
                  src={job?.logo}
                />
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-bold">{job?.company}</h1>
                  <h2 className="text-sm font-semibold text-muted-foreground">
                    {job?.title}
                  </h2>
                  <div className="flex gap-3 text-xs h-4">
                    <p>
                      Posted: <span>7 Days ago</span>
                    </p>{" "}
                    <Divider orientation="vertical" />
                    <p>
                      Deadline: <span>15/5/25</span>
                    </p>{" "}
                    <Divider orientation="vertical" />
                    <p className="flex items-center gap-2">
                      <FaUsers /> <span>{job?.applied}</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <div className="text-xs text-muted-foreground mb-2">
                <p className="flex items-center gap-2">
                  <FaLocationDot /> <span>{job?.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <IoBag /> <span>2-3 Years</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdCurrencyRupee /> <span>{job?.salary}</span>
                </p>
              </div>

              <p className="text-lg font-semibold">Required Skills</p>
              <div className="flex gap-2 flex-wrap text-muted-foreground">
                {skills.map((skill) => (
                  <Chip
                    radius="full"
                    key={skill}
                    className="text-muted-foreground text-xs"
                  >
                    {skill}
                  </Chip>
                ))}
              </div>

              <p className="text-lg font-semibold mt-3">
                Role & Responsibilities
              </p>
              <div className="text-sm text-muted-foreground">
                {responsibilities.map((res) => (
                  <li key={res}>{res}</li>
                ))}
              </div>
            </DrawerBody>
            <DrawerFooter>
              <div className="w-full flex justify-between items-center">
                <div className="text-sm flex items-center gap-2 border-2 px-4 rounded-lg cursor-not-allowed">
                  <span>Posted By</span>
                  <Avatar
                    src={job?.postedBy?.avatar}
                    alt={job?.postedBy?.username}
                    className="w-8 h-8"
                    name={job?.postedBy?.username?.charAt(0)?.toUpperCase()}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {job?.postedBy?.username || "User"}
                    </span>
                    <span className="text-xs text-gray-400 truncate max-w-[150px]">
                      {job?.postedBy?.email || "No email"}
                    </span>
                  </div>
                </div>
                {isVisible && (
                  <Button
                    variant="shadow"
                    className="bg-[#9353D3]"
                    onPress={() => handleApply(job?._id)}
                  >
                    {job.applications.includes(user.id) ? "Applied" : "Apply"}
                  </Button>
                )}
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
