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
} from "@heroui/react";
import { PlusIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateUserDetails } from "../../hooks/user/useUpdateUserDetails";
import { useCreateUserDetails } from "../../hooks/user/useCreateUserDetails";
import { useQueryClient } from "@tanstack/react-query";

const qualifications = ["BTech", "MTech", "BCA", "MCA", "BCom", "MCom", "Other"];
const completionYears = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028"];

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

  return { value, setValue, list, setList, addItem, removeItem };
};

export default function UserDetailsModal({ isOpen, onOpenChange, userDetails }) {
  const [qualification, setQualification] = useState("");
  const [completionYear, setCompletionYear] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [resume, setResume] = useState(null);
  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [experienceList, setExperienceList] = useState([]);

  const skills = useListInput("", 2);
  const queryClient = useQueryClient();
  const { updateUserDetailsMutation, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUpdateUserDetails();
  const { createUserDetailsMutation, isPending: isCreatePending, isSuccess: isCreateSuccess } = useCreateUserDetails();

  useEffect(() => {
    if (isOpen && userDetails) {
      setQualification(userDetails?.highestEducation?.qualification || "");
      setCompletionYear(userDetails?.highestEducation?.completionYear || "");
      setPhoneNo(userDetails?.phoneNo || "");
      setState(userDetails?.location?.state || "");
      setCity(userDetails?.location?.city || "");
      setLinkedinLink(userDetails?.linkedinLink || "");
      setGitHubLink(userDetails?.gitHubLink || "");
      setPortfolioLink(userDetails?.portfolioLink || "");
      setResume(userDetails?.resume || null);
      skills.setList(userDetails?.skills || []);
      skills.setValue("");
      setExperienceList(userDetails?.experience || []);
    } else if (isOpen) {
      resetForm();
    }
  }, [userDetails, isOpen]);

  const resetForm = () => {
    setQualification("");
    setCompletionYear("");
    setPhoneNo("");
    setState("");
    setCity("");
    setLinkedinLink("");
    setGitHubLink("");
    setPortfolioLink("");
    setResume(null);
    skills.setValue("");
    skills.setList([]);
    setExpTitle("");
    setExpCompany("");
    setExperienceList([]);
  };

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

  const handleSubmit = async() => {
    if (
      !qualification ||
      !completionYear ||
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
      highestEducation: { qualification, completionYear },
      experience: experienceList,
      skills: skills.list,
      phoneNo,
      location: { state, city },
      linkedinLink,
      gitHubLink,
      portfolioLink,
      resume,
    };

    if (userDetails) {
      try {
        const res = await updateUserDetailsMutation(payload);
        console.log(res);
      } catch (error) {
        console.log("Error in updateUserDetailsMutation: ", error);
      }
    } else {
      try {
        const res = await createUserDetailsMutation(payload);
        console.log(res);
      } catch (error) {
        console.log("Error in createUserDetailsMutation: ", error);
      }
    }

    queryClient.invalidateQueries(["get-user-details"]);
    onOpenChange(false);
    resetForm();
  };

  return (
    <Modal size="5xl" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent key={userDetails?._id || "new"} className="overflow-y-auto">
        {(onClose) => (
          <>
            <ModalHeader>{userDetails ? "Edit User Details" : "Enter User Details"}</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Qualification"
                  selectedKeys={qualification ? [qualification] : []}
                  onSelectionChange={(keys) => setQualification(Array.from(keys)[0])}
                  disabled={isCreatePending || isUpdatePending}
                >
                  {qualifications.map((q) => (
                    <SelectItem key={q} value={q}>
                      {q}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Completion Year"
                  selectedKeys={completionYear ? [completionYear] : []}
                  onSelectionChange={(keys) => setCompletionYear(Array.from(keys)[0])}
                  disabled={isCreatePending || isUpdatePending}
                >
                  {completionYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </Select>

                <Input 
                  label="Phone Number" 
                  value={phoneNo} 
                  onChange={(e) => setPhoneNo(e.target.value)}
                  disabled={isCreatePending || isUpdatePending}
                />

                <Input 
                  label="State" 
                  value={state} 
                  onChange={(e) => setState(e.target.value)}
                  disabled={isCreatePending || isUpdatePending}
                />

                <Input 
                  label="City" 
                  value={city} 
                  onChange={(e) => 
                  setCity(e.target.value)} 
                  disabled={isCreatePending || isUpdatePending}
                />

                <Input 
                  label="LinkedIn Link" 
                  value={linkedinLink} 
                  onChange={(e) => setLinkedinLink(e.target.value)}
                  disabled={isCreatePending || isUpdatePending}
                />
                
                <Input 
                  label="GitHub Link" 
                  value={gitHubLink} 
                  onChange={(e) => setGitHubLink(e.target.value)} 
                  disabled={isCreatePending || isUpdatePending}
                />

                <Input 
                  label="Portfolio Link" 
                  value={portfolioLink} 
                  onChange={(e) => setPortfolioLink(e.target.value)} 
                  disabled={isCreatePending || isUpdatePending}
                />

                <div className="flex flex-col">
                  <label className="text-xs text-muted-foreground font-medium mb-1">
                    <input
                      type="file"
                      accept=".pdf"
                      disabled={isCreatePending || isUpdatePending}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const isPDF = file.type === "application/pdf";
                          const under2MB = file.size <= 2 * 1024 * 1024;

                          if (!isPDF) return alert("Only PDF files allowed.");
                          if (!under2MB) return alert("Max size is 2MB.");

                          setResume(file);
                        }
                      }}
                      className="text-xs border border-gray-300 rounded-lg cursor-pointer bg-zinc-800 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-zinc-800"
                    />
                    <span>Upload Resume (.pdf max 2MB)</span>
                  </label>
                  {resume && (
                    <p className="text-xs text-gray-300 mt-1">
                      Selected: {resume.name || resume}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div className="col-span-full">
                  <Input
                    disabled={isCreatePending || isUpdatePending}
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
                  <Input 
                    label="Experience Title" 
                    value={expTitle} 
                    onChange={(e) => setExpTitle(e.target.value)} 
                    disabled={isCreatePending || isUpdatePending}
                  />

                  <Input 
                    label="Company" 
                    value={expCompany} 
                    onChange={(e) => setExpCompany(e.target.value)} 
                    disabled={isCreatePending || isUpdatePending}
                  />

                  <Button 
                    disabled={isCreatePending || isUpdatePending} 
                    onPress={addExperience} 
                    className="col-span-full w-fit" 
                    size="sm" 
                    variant="ghost"
                  >
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
              <Button 
                color="danger" 
                variant="light" 
                onPress={() => { onClose(); resetForm(); }}
                disabled={isCreatePending || isUpdatePending}
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                disabled={isCreatePending || isUpdatePending}
              >
                { userDetails ? (
                  isUpdatePending || isUpdateSuccess ? 'Updating...' : 'Save'
                ) : (
                  isCreatePending || isCreateSuccess ? 'Creating...' : 'Save'
                ) }

              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}