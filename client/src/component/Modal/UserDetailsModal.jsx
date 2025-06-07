import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Select,
  SelectItem,
  DatePicker,
} from "@heroui/react";
import { PlusIcon, X } from "lucide-react";
import { useState } from "react";

const qualifications = ["BTech", "MTech", "BCA", "MCA", "BCom", "MCom", "Other"];

const useListInput = (initial = "", minLength = 1) => {
  const [value, setValue] = useState(initial);
  const [list, setList] = useState([]);

  const addItem = () => {
    const trimmed = value.trim();
    if (trimmed.length >= minLength) {
      setList((prev) => [...prev, trimmed]);
      setValue("");
    } else {
      alert(`Minimum ${minLength} characters required`);
    }
  };

  const removeItem = (item) => {
    setList((prev) => prev.filter((i) => i !== item));
  };

  return { value, setValue, list, addItem, removeItem };
};

export default function UserDetailsModal({ isOpen, onOpenChange }) {
  const [qualification, setQualification] = useState("");
  const [completionDate, setCompletionDate] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [resume, setResume] = useState("");

  const skills = useListInput("", 2);

  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [experienceList, setExperienceList] = useState([]);

  const addExperience = () => {
    if (expTitle.trim() && expCompany.trim()) {
      setExperienceList((prev) => [...prev, { title: expTitle, company: expCompany }]);
      setExpTitle("");
      setExpCompany("");
    } else {
      alert("Fill both title and company");
    }
  };

  const removeExperience = (idx) => {
    setExperienceList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (
      !qualification ||
      !completionDate ||
      !phoneNo ||
      !state ||
      !city ||
      !linkedinLink ||
      !gitHubLink ||
      !portfolioLink ||
      !resume ||
      skills.list.length === 0 ||
      experienceList.length === 0
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const payload = {
      highestEducation: {
        qualification,
        completionDate,
      },
      experience: experienceList,
      skills: skills.list,
      phoneNo,
      location: { state, city },
      linkedinLink,
      gitHubLink,
      portfolioLink,
      resume,
    };

    console.log("UserDetails Payload:", payload);
    // Add API call here
  };

  return (
    <Modal size="5xl" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent className="overflow-y-auto">
        {(onClose) => (
          <>
            <ModalHeader>Enter User Details</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="Qualification" onChange={(e) => setQualification(e.target.value)}>
                  {qualifications.map((q) => (
                    <SelectItem key={q} value={q}>
                      {q}
                    </SelectItem>
                  ))}
                </Select>
                <DatePicker label="Completion Date" value={completionDate} onChange={setCompletionDate} />

                <Input label="Phone Number" placeholder="Enter phone" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                <Input label="State" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                <Input label="City" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />

                <Input label="LinkedIn Link" placeholder="https://linkedin.com/in/..." value={linkedinLink} onChange={(e) => setLinkedinLink(e.target.value)} />
                <Input label="GitHub Link" placeholder="https://github.com/..." value={gitHubLink} onChange={(e) => setGitHubLink(e.target.value)} />
                <Input label="Portfolio Link" placeholder="https://..." value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} />
                <Input label="Resume Link" placeholder="Public URL (Cloudinary, Drive etc.)" value={resume} onChange={(e) => setResume(e.target.value)} />

                {/* Skills List */}
                <div className="col-span-full">
                  <Input
                    label="Skills"
                    placeholder="Add skill"
                    value={skills.value}
                    onChange={(e) => skills.setValue(e.target.value)}
                    endContent={<PlusIcon onClick={skills.addItem} className="cursor-pointer size-4" />}
                    onKeyDown={(e) => e.key === "Enter" && skills.addItem()}
                  />
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {skills.list.map((item, i) => (
                      <li key={i} className="border px-2 py-1 rounded-md text-sm flex items-center gap-1">
                        {item} <X className="cursor-pointer size-4" onClick={() => skills.removeItem(item)} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Experience */}
                <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
                  <Input label="Experience Title" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} />
                  <Input label="Company" value={expCompany} onChange={(e) => setExpCompany(e.target.value)} />
                  <Button onClick={addExperience} className="col-span-full w-fit" size="sm" variant="ghost">
                    <PlusIcon className="mr-1 size-4" /> Add Experience
                  </Button>
                  <ul className="col-span-full flex flex-col gap-1 mt-2">
                    {experienceList.map((exp, i) => (
                      <li key={i} className="text-sm border rounded-md px-2 py-1 flex justify-between items-center">
                        <span>{exp.title} @ {exp.company}</span>
                        <X className="cursor-pointer size-4" onClick={() => removeExperience(i)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
              <Button color="primary" onPress={handleSubmit}>Save</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
