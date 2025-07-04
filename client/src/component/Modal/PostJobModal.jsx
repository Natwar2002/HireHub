import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  DatePicker,
  Select,
  SelectItem,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { PlusIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCreateJob } from "../../hooks/jobPost/useCreateJob";

export const SelectorIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M8 9l4 -4l4 4" />
    <path d="M16 15l-4 4l-4 -4" />
  </svg>
);

const useListInput = (initial = "", minLength = 1) => {
  const [value, setValue] = useState(initial);
  const [list, setList] = useState([]);

  const addItem = () => {
    const trimmed = value.trim();
    if (trimmed.length >= minLength && !list.includes(trimmed)) {
      setList((prev) => [...prev, trimmed]);
      setValue("");
    } else if (list.includes(trimmed)) {
      alert("Item already added");
    } else {
      alert(`Enter at least ${minLength} characters`);
    }
  };

  const removeItem = (item) =>
    setList((prev) => prev.filter((i) => i !== item));

  return { value, setValue, list, addItem, removeItem };
};

export default function PostJobModal({ isOpen, onOpenChange }) {
  const tags = useListInput("", 2);
  const skills = useListInput("", 2);
  const responsibilities = useListInput("", 10);

  const [jobDesc, setJobDesc] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState("");
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();

  const jobType = [
    { key: "Full-time", label: "Full-time" },
    { key: "Part-time", label: "Part-time" },
    { key: "Internship", label: "Internship" },
    { key: "Contract", label: "Contract" },
    { key: "Freelance", label: "Freelance" },
  ];

  const { createJobMutation, isPending } = useCreateJob();

  const handleSubmit = async () => {
    if (
      !company.trim() ||
      !title.trim() ||
      !location.trim() ||
      !salary.trim() ||
      !experience.trim() ||
      !deadlineDate ||
      !selectedJobType ||
      !jobDesc.trim() ||
      !selectedImage ||
      tags.list.length === 0 ||
      skills.list.length === 0 ||
      responsibilities.list.length === 0
    ) {
      alert(
        "Please fill all fields and ensure list fields have at least one entry."
      );
      return;
    }

    const deadline = new Date(
      deadlineDate.year,
      deadlineDate.month - 1,
      deadlineDate.day
    );

    const payload = {
      company,
      jobTitle: title,
      location,
      salary,
      experience,
      deadline,
      jobType: selectedJobType,
      jobDescription: jobDesc,
      tags: tags.list.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)),
      requiredSkills: skills.list,
      responsibilities: responsibilities.list,
      logo: selectedImage
    }
    
    await createJobMutation(payload);
    onOpenChange(false);
    navigate("/jobs");
  };

  return (
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
              <div className="flex gap-2 flex-col md:flex-row w-full">
                <div className="w-full basis-1/2 max-w-[50%] flex flex-col gap-4 flex-wrap">
                  <Input
                    label="Company"
                    placeholder="Enter Company Name"
                    variant="bordered"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={isPending}
                  />
                  <Input
                    label="Job Title"
                    placeholder="Enter Job Title"
                    variant="bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isPending}
                  />
                  <Input
                    label="Job Description"
                    placeholder="Enter Job Description"
                    variant="bordered"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    disabled={isPending}
                  />

                  <Input
                    label="Tags"
                    placeholder="Select tag (eg. Frontend, Backend)"
                    variant="bordered"
                    value={tags.value}
                    disabled={isPending}
                    endContent={
                      <PlusIcon
                        onClick={tags.addItem}
                        className="size-4 cursor-pointer"
                      />
                    }
                    onChange={(e) => tags.setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && tags.addItem()}
                  />
                  <ul className="flex items-center">
                    {tags.list.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm px-2 border m-1 p-0.5 rounded-md flex justify-between items-center gap-2"
                      >
                        {item}
                        <X
                          onClick={() => tags.removeItem(item)}
                          className="size-4 cursor-pointer"
                        />
                      </li>
                    ))}
                  </ul>

                  <Input
                    label="Required Skills"
                    placeholder="Enter skill"
                    variant="bordered"
                    value={skills.value}
                    endContent={
                      <PlusIcon
                        onClick={skills.addItem}
                        className="size-4 cursor-pointer"
                      />
                    }
                    onChange={(e) => skills.setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && skills.addItem()}
                  />
                  <ul className="flex items-center">
                    {skills.list.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm px-2 border m-1 p-0.5 rounded-md flex justify-between items-center gap-2"
                      >
                        {item}{" "}
                        <X
                          onClick={() => skills.removeItem(item)}
                          className="size-4 cursor-pointer"
                        />
                      </li>
                    ))}
                  </ul>

                  <Input
                    label="Location"
                    placeholder="Enter Location"
                    variant="bordered"
                    value={location}
                    disabled={isPending}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Input
                    label="Salary"
                    placeholder="Enter Salary (e.g. 12 LPA)"
                    variant="bordered"
                    value={salary}
                    disabled={isPending}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>

                <div className="w-full flex flex-col gap-4">
                  <Input
                    label="Experience"
                    placeholder="Enter Experience"
                    variant="bordered"
                    value={experience}
                    disabled={isPending}
                    onChange={(e) => setExperience(e.target.value)}
                  />

                  <Input
                    label="Responsibilities"
                    placeholder="Enter Responsibility"
                    variant="bordered"
                    disabled={isPending}
                    value={responsibilities.value}
                    endContent={
                      <PlusIcon
                        onClick={responsibilities.addItem}
                        className="size-4 cursor-pointer"
                      />
                    }
                    onChange={(e) => responsibilities.setValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && responsibilities.addItem()
                    }
                  />
                  <ul>
                    {responsibilities.list.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm px-2 border m-1 p-0.5 rounded-md flex justify-between"
                      >
                        {item}{" "}
                        <X
                          onClick={() => responsibilities.removeItem(item)}
                          className="size-4 cursor-pointer"
                        />
                      </li>
                    ))}
                  </ul>

                  <DatePicker
                    isRequired
                    className="max-w-[284px]"
                    label="Deadline Date"
                    value={deadlineDate}
                    disabled={isPending}
                    onChange={setDeadlineDate}
                  />
                  <Select
                    className="max-w-xs"
                    labelPlacement="inside"
                    placeholder="Select Job Type"
                    selectorIcon={<SelectorIcon />}
                    disabled={isPending}
                    selectedKeys={[selectedJobType]}
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys)[0];
                      setSelectedJobType(key);
                    }}
                    required
                    aria-label="Job Type"
                  >
                    {jobType.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>
                  <div
                    className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 cursor-pointer hover:border-primary flex items-center justify-center overflow-hidden"
                    onClick={handleImageClick}
                  >
                    {selectedImage ? (
                      <img
                        src={
                          typeof selectedImage === "string"
                            ? selectedImage
                            : URL.createObjectURL(selectedImage)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-400 text-center px-2">
                        Click to upload
                      </span>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      disabled={isPending}
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit} disabled={isPending}>
                { isPending ? "Posting..." : "Post" }
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
