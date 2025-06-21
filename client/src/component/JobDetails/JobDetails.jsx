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
import { Chip } from "@heroui/react";
import { MdCurrencyRupee } from "react-icons/md";
import { FaUsers, FaUserTie } from "react-icons/fa";
import CommonButton from "../Button/Button";
import { useCreateApplication } from "../../hooks/applications/useCreateApplication";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import store from "../../redux/store";

export const JobDetails = ({ job, isOpen, onOpenChange, isVisible = true }) => {
  const [skills, setSkills] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const { user } = store.getState().auth;
  const { createApplicationMutation, error, isSuccess } =
    useCreateApplication();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (job) {
      setSkills(job.requiredSkills);
      setResponsibilities(job.responsibilities);
    }
  }, [job]);

  async function handleApply(jobId) {
    await createApplicationMutation(jobId);
    if (error) {
      console.log("something is wrong");
    }
    if (isSuccess) {
      queryClient.invalidateQueries("GetJobs");
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      placement="bottom"
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
                <div className="text-sm">
                  <p>
                    Posted By: <span>{job?.posted_by || "Natwar"}</span>
                  </p>
                </div>
                {isVisible && (
                  <CommonButton
                    text={
                      job.applications.includes(user.id) ? "Applied" : "Apply"
                    }
                    onClickHandler={() => handleApply(job?._id)}
                    isApplied={job.applications.includes(user.id)}
                  />
                )}
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
