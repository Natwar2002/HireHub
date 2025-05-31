import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  DatePicker,
} from "@heroui/react";

import SelectJob from "./SelectJob";
import { Plus, PlusIcon, X } from "lucide-react";

import { useState } from "react";
export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function PostJobModal({ isOpen, onOpenChange }) {
  const [jobDescription, setJobDescription] = useState("");
  const [tags, setTags] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [jobDescriptionList, setJobDescriptionList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [skillsRequiredList, setSkillsRequiredList] = useState([]);
  const [responsibilitiesList, setResponsibilitiesList] = useState([]);

  const removeItemJd = (data) => {
    const filterItem = jobDescriptionList.filter((item) => item !== data);
    setJobDescriptionList(filterItem);
  };
  const removeItemTag = (data) => {
    const filterItem = tagsList.filter((item) => item !== data);
    setTagsList(filterItem);
  };
  const removeItemSkills = (data) => {
    const filterItem = skillsRequiredList.filter((item) => item !== data);
    setSkillsRequiredList(filterItem);
  };
  const removeItemRes = (data) => {
    const filterItem = responsibilitiesList.filter((item) => item !== data);
    setResponsibilitiesList(filterItem);
  };

  return (
    <>
      <Modal
        size="full"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="overflow-scroll">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Post New Job
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  <div className="w-full flex flex-col gap-4">
                    <Input
                      label="Company"
                      placeholder="Enter Company Name"
                      variant="bordered"
                      min={4}
                    />
                    <Input
                      label="Job Title"
                      placeholder="Enter Job Title"
                      variant="bordered"
                      min={4}
                    />

                    <Input
                      label="Job Description"
                      placeholder="Enter Job Description"
                      variant="bordered"
                      value={jobDescription}
                      endContent={
                        <PlusIcon
                          onClick={() => {
                            if (jobDescription.length < 10) {
                              console.log("enter at least 10 words");
                            } else {
                              setJobDescriptionList((pre) => [
                                ...pre,
                                jobDescription,
                              ]);
                              setJobDescription("");
                            }
                          }}
                          className="size-4 cursor-pointer"
                        />
                      }
                      onChange={(e) => setJobDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          if (jobDescription.length < 10) {
                            console.log("enter at least 10 words");
                          } else {
                            setJobDescriptionList((pre) => [
                              ...pre,
                              jobDescription,
                            ]);
                            setJobDescription("");
                          }
                        }
                      }}
                    />
                    <ul>
                      {jobDescriptionList.map((item, index) => (
                        <li
                          className="text-sm px-2 border border-[#6c6c6c] 
                        m-1 p-0.5 rounded-md flex items-center justify-between"
                          key={index + Date.now()}
                        >
                          {item}{" "}
                          <X
                            onClick={() => removeItemJd(item)}
                            className="size-4 cursor-pointer"
                          />
                        </li>
                      ))}
                    </ul>
                    <Input
                      label="Tags"
                      placeholder="Enter Hash Tags"
                      variant="bordered"
                      endContent={
                        <PlusIcon
                          onClick={() => {
                            if (tags.includes("#")) {
                              setTagsList((pre) => [...pre, tags]);
                              setTags("");
                            }
                          }}
                          className="size-4 cursor-pointer"
                        />
                      }
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      onKeyDown={(e) => {
                        if (tags.includes("#")) {
                          if (e.key == "Enter") {
                            setTagsList((pre) => [...pre, tags]);
                            setTags("");
                          }
                        }
                      }}
                    />
                    <ul>
                      {tagsList.map((item, index) => (
                        <li
                          className="text-sm px-2 border border-[#6c6c6c] 
                        m-1 p-0.5 rounded-md flex items-center justify-between"
                          key={index + Date.now()}
                        >
                          {item}{" "}
                          <X
                            onClick={() => removeItemTag(item)}
                            className="size-4 cursor-pointer"
                          />
                        </li>
                      ))}
                    </ul>
                    <Input
                      label="Required Skills"
                      placeholder="Enter skills set"
                      variant="bordered"
                      endContent={
                        <PlusIcon
                          onClick={() => {
                            if (skillsRequired.length < 6) {
                              console.log("need at least 6 word");
                            } else {
                              setSkillsRequiredList((pre) => [
                                ...pre,
                                skillsRequired,
                              ]);
                              setSkillsRequired("");
                            }
                          }}
                          className="size-4 cursor-pointer"
                        />
                      }
                      value={skillsRequired}
                      onChange={(e) => setSkillsRequired(e.target.value)}
                      onKeyDown={(e) => {
                        if (skillsRequired.length < 6) {
                          console.log("need at least 6 word");
                        } else {
                          if (e.key == "Enter") {
                            setSkillsRequiredList((pre) => [
                              ...pre,
                              skillsRequired,
                            ]);
                            setSkillsRequired("");
                          }
                        }
                      }}
                    />
                    <ul>
                      {skillsRequiredList.map((item, index) => (
                        <li
                          className="text-sm px-2 border border-[#6c6c6c] 
                        m-1 p-0.5 rounded-md flex items-center justify-between"
                          key={index + Date.now()}
                        >
                          {item}{" "}
                          <X
                            onClick={() => removeItemSkills(item)}
                            className="size-4 cursor-pointer"
                          />
                        </li>
                      ))}
                    </ul>
                    <Input
                      label="Location"
                      placeholder="Enter location"
                      variant="bordered"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-4">
                    <Input
                      label="Experience"
                      placeholder="Enter experience"
                      variant="bordered"
                    />
                    <Input
                      label="Responsibilities"
                      placeholder="Enter responsibilities"
                      variant="bordered"
                      endContent={
                        <PlusIcon
                          onClick={() => {
                            if (responsibilities.length < 10) {
                              console.log("need at least 10 word");
                            } else {
                              setResponsibilitiesList((pre) => [
                                ...pre,
                                responsibilities,
                              ]);
                              setResponsibilities("");
                            }
                          }}
                          className="size-4 cursor-pointer"
                        />
                      }
                      value={responsibilities}
                      onChange={(e) => setResponsibilities(e.target.value)}
                      onKeyDown={(e) => {
                        if (responsibilities.length < 10) {
                          console.log("need at least 10 word");
                        } else {
                          if (e.key == "Enter") {
                            setResponsibilitiesList((pre) => [
                              ...pre,
                              responsibilities,
                            ]);
                            setResponsibilities("");
                          }
                        }
                      }}
                    />
                    <ul>
                      {responsibilitiesList.map((item, index) => (
                        <li
                          className="text-sm px-2 border border-[#6c6c6c] 
                        m-1 p-0.5 rounded-md flex items-center justify-between"
                          key={index + Date.now()}
                        >
                          {item}{" "}
                          <X
                            onClick={() => removeItemRes(item)}
                            className="size-4 cursor-pointer"
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="">
                      <p className="px-1 text-sm text-[#ccc]">Salary Range</p>
                      <div className="flex items-center gap-6 px-1 mt-2">
                        <Input
                          label="Min"
                          labelPlacement="outside-left"
                          placeholder="0.00"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                          type="number"
                        />
                        <Input
                          label="Max"
                          labelPlacement="outside-left"
                          placeholder="0.00"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                          type="number"
                        />
                      </div>
                    </div>
                    <SelectJob />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <DatePicker
                        isRequired
                        className="max-w-[284px]"
                        label="Deadline Date"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
