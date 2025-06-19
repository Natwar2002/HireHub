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
import { useEffect, useState } from "react";
import { useCreateProject } from "../../hooks/projects/useCreateProject";
import { useUpdateProject } from "../../hooks/projects/useUpdateProject";
import { useQueryClient } from "@tanstack/react-query";

export default function ProjectDetailsModal({ isOpen, onOpenChange, project}) {
  useEffect(() => {
    setProjectName(project?.projectName || "");
    setProjectDescription(project?.projectDescription || "");
    setGithubLink(project?.githubLink || "");
    setLiveLink(project?.liveLink || "");
  }, [project]);
  
  const [projectName, setProjectName] = useState(project?.projectName);
  const [projectDescription, setProjectDescription] = useState(project?.projectDescription);
  const [githubLink, setGithubLink] = useState(project?.githubLink);
  const [liveLink, setLiveLink] = useState(project?.liveLink);
  const queryClient = useQueryClient();

  const { createProjectMutation, isPending: isCreatePending, isSuccess: isCreateSuccess } = useCreateProject();
  const { updateProjectMutation,  isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUpdateProject(project?._id);

  const resetForm = () => {
    setProjectDescription("");
    setProjectName("");
    setGithubLink("");
    setLiveLink("");
  };

  const handleSubmit = async () => {
    if (
      !projectName.trim() ||
      !projectDescription.trim() ||
      !githubLink.trim()
    ) {
      alert("Please add at least one project.");
      return;
    }

    const payload = { 
      projectName, 
      projectDescription, 
      githubLink, 
      liveLink: liveLink || " " 
    }
    console.log("Projects Payload:", payload);
    if(!project?._id) {
      try {
        const res = await createProjectMutation(payload);
        console.log(res);
      } catch (error) {
        console.log("Error in createProjectMutation: ", error);
      }
    } else {
      try {
        const res = await updateProjectMutation(payload, project?._id);
        console.log(res);
      } catch (error) {
        console.log("Error in updateProjectMutation: ", error);
      }
    }
    queryClient.invalidateQueries('get-user-details');
    onOpenChange(false);
    resetForm();
  };

  return (
    <Modal size="5xl" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent className="overflow-y-auto">
        {(onClose) => (
          <>
            <ModalHeader>{project ? "Edit Project" : "Add Project"}</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input
                  label="Project Name"
                  placeholder="Enter project name"
                  value={projectName}
                  disabled={isCreatePending || isUpdatePending}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <Input
                  label="GitHub Link"
                  placeholder="https://github.com/..."
                  value={githubLink}
                  disabled={isCreatePending || isUpdatePending}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
                <Textarea
                  label="Project Description"
                  placeholder="Describe your project"
                  value={projectDescription}
                  disabled={isCreatePending || isUpdatePending}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="md:col-span-2"
                />
                <Input
                  label="Live Link (optional)"
                  placeholder="https://..."
                  value={liveLink}
                  disabled={isCreatePending || isUpdatePending}
                  onChange={(e) => setLiveLink(e.target.value)}
                  className="md:col-span-2"
                />

              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
              <Button color="primary" onPress={handleSubmit}>
                { project ? (
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