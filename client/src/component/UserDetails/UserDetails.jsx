import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Plus, X } from "lucide-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import store from "../../redux/store";
import { logout } from "../../redux/actions/authAction";
import ConfirmModal from "../Modal/ConfirmModal";
import { useState } from "react";
import UserDetailsModal from "../Modal/UserDetailsModal";
import ProjectDetailsModal from "../Modal/ProjectModal";
import EditProfileModal from "../Modal/EditProfileModal";
import { FaTrashRestore } from "react-icons/fa";
import { useDeleteProject } from '../../hooks/projects/useDeleteProject';

export const UserDetails = ({ isOpen, onOpenChange, onClose, userDetails }) => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [project, setProject] = useState(null);
    const { isOpen: isUserDetailsOpen , onOpenChange: onOpenChangeOfUserDetailsModal } = useDisclosure();
    const { isOpen: isProjectModalOpen, onOpenChange: onOpenChangeOfProjectModal } = useDisclosure();
    const { isOpen: isEditProfileModalOpen, onOpenChange: onOpenChangeOfEditProfileModal } = useDisclosure(); 

    const { deleteProjectMutation } = useDeleteProject();
 
    function openConfirmDialog(action) {
        setConfirmAction(action);
        setShowConfirmModal(true);
    }

    async function handleConfirm() {
        if (confirmAction === "logout") {
            store.dispatch(logout());
            onClose();
        }
        if (confirmAction === "delete" && project) {
            console.log("Deleting project:", project);
            const res = await deleteProjectMutation(project?._id);
            console.log(res);
        }

        setConfirmAction("");
        setProject(null);
        setShowConfirmModal(false);
    }

    function handleProjectDelete(project) {
        setProject(project);
        setConfirmAction("delete");
        setShowConfirmModal(true);
    }

    return (
        <>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" backdrop="opaque">
                <DrawerContent>
                    <DrawerHeader className="flex items-center justify-between relative">
                        <div className="flex items-center gap-4">
                            <div>
                                {
                                    userDetails?.avatar ? (
                                        <Avatar 
                                            size="lg" 
                                            src={userDetails?.avatar} 
                                        />) : (
                                        <Avatar 
                                            size="lg" 
                                            src={" "}
                                        />
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{userDetails?.username.toUpperCase()}</p>
                                <p className="text-sm text-muted-foreground">{userDetails?.email}</p>
                            </div>
                        </div>
                    
                        <div className="mr-6">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                onPress={onClose}
                                className="absolute right-1 top-1"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </Button>
                            <div className="flex items-center justify-between gap-4">
                                <Button variant="flat" onPress={() => onOpenChangeOfEditProfileModal() }>
                                    <span>Edit</span>
                                    <HiOutlinePencilAlt />
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                        <Divider />
                        { userDetails?.userDetails ? (
                            <DrawerBody className="space-y-1">
                                <div>
                                    <h3 className="font-semibold mb-1">Highest Education</h3>
                                    <p>
                                        {userDetails.userDetails?.highestEducation?.qualification} (
                                        {userDetails.userDetails?.highestEducation?.completionDate
                                            ? new Date(userDetails.userDetails?.highestEducation.completionDate).toLocaleDateString()
                                            : "N/A"}
                                        )
                                    </p>
                                </div>

                                <Divider />

                                <div>
                                    <h3 className="font-semibold mb-1">Experience</h3>
                                    {userDetails.userDetails?.experience?.length > 0 ? (
                                    <ul className="list-disc pl-4 space-y-1">
                                        {userDetails.userDetails?.experience.map((exp, idx) => (
                                        <li key={idx}>
                                            {exp.title} at {exp.company}
                                        </li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <p>No experience listed</p>
                                    )}
                                </div>

                                <Divider />

                                <div>
                                    <h3 className="font-semibold mb-1">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                    {userDetails.userDetails?.skills?.map((skill, idx) => (
                                        <span
                                        key={idx}
                                        className="px-2 py-1 bg-muted text-sm rounded-md border border-border"
                                        >
                                        {skill}
                                        </span>
                                    ))}
                                    </div>
                                </div>

                                <Divider />

                                <div>
                                    <h3 className="font-semibold mb-1">Contact Info</h3>
                                    <p>Phone: {userDetails.userDetails?.phoneNo}</p>
                                    <p>Location: {userDetails.userDetails?.location?.city}, {userDetails.userDetails?.location?.state}</p>
                                </div>

                                <Divider />

                                <div>
                                    <h3 className="font-semibold mb-1">Links</h3>
                                    <ul className="space-y-1 text-blue-600 flex items-center gap-3">
                                    {userDetails.userDetails?.linkedinLink && (
                                        <li>
                                        <a href={userDetails.userDetails?.linkedinLink} target="_blank" rel="noopener noreferrer">
                                            LinkedIn
                                        </a>
                                        </li>
                                    )}
                                    {userDetails.userDetails?.gitHubLink && (
                                        <li>
                                        <a href={userDetails.userDetails?.gitHubLink} target="_blank" rel="noopener noreferrer">
                                            GitHub
                                        </a>
                                        </li>
                                    )}
                                    {userDetails.userDetails?.portfolioLink && (
                                        <li>
                                        <a href={userDetails.userDetails?.portfolioLink} target="_blank" rel="noopener noreferrer">
                                            Portfolio
                                        </a>
                                        </li>
                                    )}
                                    {userDetails.resume && (
                                        <li>
                                        <a href={userDetails.userDetails?.resume} target="_blank" rel="noopener noreferrer">
                                            Resume
                                        </a>
                                        </li>
                                    )}
                                    </ul>
                                </div>

                            <div>
                                <h3 className="font-semibold mb-1">Projects</h3>
                                {userDetails?.userDetails?.projects?.length > 0 ? (
                                    <ul className="space-y-4">
                                    {userDetails.userDetails.projects.map((project, idx) => (
                                        <li key={idx} className="p-4 border rounded-md bg-muted">
                                            <div className="flex justify-between">
                                                <h4 className="text-base font-semibold">{project.projectName}</h4>
                                                <div className="flex gap-2">
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <FaEllipsisVertical />
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label="Example with disabled actions">
                                                            <DropdownItem key="edit" onPress={() => {
                                                                setProject(project);
                                                                onOpenChangeOfProjectModal();
                                                            }}>
                                                                <div className="flex gap-2 items-center">
                                                                    <BsPencilSquare />
                                                                    <span>Edit</span>
                                                                </div>
                                                            </DropdownItem>

                                                            <DropdownItem key="delete" className="text-danger" color="danger" onPress={() => {handleProjectDelete(project)}}>
                                                                <div className="flex gap-2 items-center">
                                                                    <FaTrashRestore />
                                                                    <span>Delete</span>
                                                                </div>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {project.projectDescription}
                                            </p>
                                            <div className="flex gap-4 text-blue-600 text-sm">
                                                {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline"
                                                >
                                                    Live Demo
                                                </a>
                                                )}
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline"
                                                >
                                                GitHub
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                    <Button
                                        variant="shadow"
                                        color="primary"
                                        className="mt-4 px-6 py-2 text-base rounded-lg"
                                        onPress={() => onOpenChangeOfProjectModal()}
                                    >
                                        <Plus className="mr-2" />
                                        Add Project
                                    </Button>
                                    </ul>
                                ) : (
                                    <div>
                                        <p className="text-sm text-muted-foreground">No projects listed yet</p>
                                        { userDetails && ( 
                                            <Button
                                                variant="shadow"
                                                color="primary"
                                                className="mt-4 px-6 py-2 text-base rounded-lg"
                                                onPress={() => onOpenChangeOfProjectModal()}
                                            >
                                                <Plus className="mr-2" />
                                                Add Project
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>

                        </DrawerBody>
                        ) : (
                            <DrawerBody className="flex flex-col items-center justify-center text-center space-y-4 py-10">
                                <div className="flex flex-col items-center">
                                    <Avatar size="lg" src={userDetails?.avatar} />
                                    <h2 className="text-xl font-semibold mt-4">No Details Found</h2>
                                    <p className="text-sm text-muted-foreground max-w-xs">
                                        You haven't added your personal or professional details yet.
                                        This helps us personalize your experience and improve visibility to recruiters.
                                    </p>
                                </div>
                                <Button
                                    variant="shadow"
                                    color="primary"
                                    className="mt-4 px-6 py-2 text-base rounded-lg"
                                    onPress={() => onOpenChangeOfUserDetailsModal()}
                                >
                                    <Plus className="mr-2" />
                                    Add Your Details
                                </Button>
                            </DrawerBody>
                        )}

                    <DrawerFooter className="flex justify-between">
                        <Button
                            variant="shadow"
                            color="danger"
                            className="mt-4 px-6 py-2 text-base rounded-lg"
                            onPress={() => openConfirmDialog("logout")}
                        >
                            <span>Logout</span>
                            <FaPowerOff />
                        </Button>
                        <Button
                            variant="shadow"
                            className="mt-4 px-6 py-2 text-base rounded-lg"
                            onPress={() => { onOpenChangeOfUserDetailsModal() }}
                        >
                            <span>Edit</span>
                            <BsPencilSquare />
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirm}
                action={confirmAction}
            />

            <UserDetailsModal 
                isOpen={isUserDetailsOpen} 
                onOpenChange={onOpenChangeOfUserDetailsModal} 
                createDetails={true}
                userDetails={userDetails}
            />
            <ProjectDetailsModal 
                isOpen={isProjectModalOpen} 
                onOpenChange={onOpenChangeOfProjectModal}
                project={project}
            />
            
            <EditProfileModal 
                isOpen={isEditProfileModalOpen} 
                onOpenChange={onOpenChangeOfEditProfileModal}
                userDetails={userDetails?.userDetails}
            />
        </>
    );
};
