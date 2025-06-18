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

  const { createProjectMutation } = useCreateProject();

  const handleSubmit = () => {
    if (
      !projectName.trim() ||
      !projectDescription.trim() ||
      !githubLink.trim()
    ) {
      alert("Please add at least one project.");
      return;
    }

    const payload = { projectName, projectDescription, githubLink, liveLink: liveLink || " " }

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