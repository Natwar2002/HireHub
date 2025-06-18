import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Textarea,
} from "@heroui/react";
import { PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { useCreateProject } from "../../hooks/projects/useCreateProject";

export default function ProjectDetailsModal({ isOpen, onOpenChange }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [projects, setProjects] = useState([]);

  const { createProjectMutation } = useCreateProject();

  const addProject = () => {
    if (
      projectName.trim() &&
      projectDescription.trim() &&
      githubLink.trim()
    ) {
      setProjects((prev) => [
        ...prev,
        {
          projectName,
          projectDescription,
          githubLink,
          liveLink,
        },
      ]);
      setProjectName("");
      setProjectDescription("");
      setGithubLink("");
      setLiveLink("");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (projects.length === 0) {
      alert("Please add at least one project.");
      return;
    }

    const payload = projects;
    console.log("Projects Payload:", payload);

    const res = createProjectMutation(payload);
    console.log(res);
    
    onOpenChange(false);
  };

  return (
    <Modal size="5xl" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent className="overflow-y-auto">
        {(onClose) => (
          <>
            <ModalHeader>Add Your Projects</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input
                  label="Project Name"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <Input
                  label="GitHub Link"
                  placeholder="https://github.com/..."
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
                <Textarea
                  label="Project Description"
                  placeholder="Describe your project"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="md:col-span-2"
                />
                <Input
                  label="Live Link (optional)"
                  placeholder="https://..."
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                  className="md:col-span-2"
                />

                <Button
                  onClick={addProject}
                  className="col-span-full w-fit"
                  size="sm"
                  variant="ghost"
                >
                  <PlusIcon className="mr-1 size-4" /> Add Project
                </Button>

                <ul className="col-span-full flex flex-col gap-1 mt-2">
                  {projects.map((proj, i) => (
                    <li
                      key={i}
                      className="text-sm border rounded-md px-3 py-2 flex justify-between items-start flex-col gap-1 md:flex-row md:items-center"
                    >
                      <div>
                        <p className="font-medium">{proj.projectName}</p>
                        <p className="text-muted-foreground text-xs">{proj.projectDescription}</p>
                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-blue-500 text-sm">GitHub</a>
                        {proj.liveLink && (
                          <span className="ml-2 text-blue-500 text-sm">
                            | <a href={proj.liveLink} target="_blank" rel="noreferrer">Live</a>
                          </span>
                        )}
                      </div>
                      <X className="cursor-pointer size-4 self-end md:self-center" onClick={() => removeProject(i)} />
                    </li>
                  ))}
                </ul>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
              <Button color="primary" onPress={handleSubmit}>Add Project</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}