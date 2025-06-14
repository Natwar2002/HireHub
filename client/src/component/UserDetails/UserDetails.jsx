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
import { Plus, X, XIcon } from "lucide-react";
import { FaPowerOff } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import store from "../../redux/store";
import { logout } from "../../redux/actions/authAction";
import ConfirmModal from "../Modal/ConfirmModal";
import { useRef, useState } from "react";
import UserDetailsModal from "../Modal/UserDetailsModal";
import ProjectDetailsModal from "../Modal/ProjectModal";

export const UserDetails = ({ isOpen, onOpenChange, onClose }) => {

    const userDetails = {
        username: "Natwar Patidar",
        email: "natwar@gmail.com",
        userDetails: {
        highestEducation: {
        qualification: "MCA",
        completionDate: "2024-06-01",
        },
        experience: [
        { title: "Frontend Developer", company: "TechCorp" },
        { title: "Backend Intern", company: "CodeBase" },
        ],
        skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        phoneNo: "9876543210",
        location: {
        city: "Indore",
        state: "Madhya Pradesh",
        },
        linkedinLink: "https://linkedin.com/in/natwarpatidar",
        gitHubLink: "https://github.com/natwarpatidar",
        portfolioLink: "https://natwar.dev",
        resume: "https://drive.google.com/resume-link",
    }
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const { isOpen: isUserDetailsOpen , onOpenChange: onOpenChangeOfUserDetailsModal } = useDisclosure();
    const { isOpen: isProjectModalOpen, onOpenChange: onOpenChangeOfProjectModal } = useDisclosure();
    const avatarInputRef = useRef(null);
    const [avatar, setavatar] = useState(null);

    const handleFileChange = async () => {
        if (!avatar) return;

        const validTypes = ["avatar/jpeg", "avatar/png", "avatar/jpg", "avatar/webp"];
        if (!validTypes.includes(avatar.type)) {
            alert("Please select a valid avatar file (jpg, png, gif, webp)");
            return;
        }

        try {
            // API Call
        } catch (err) {
            console.error(err);
        }
    };
 
    function openConfirmDialog(action) {
        setConfirmAction(action);
        setShowConfirmModal(true);
    }

    function handleConfirm() {
        if (confirmAction === "logout") {
        store.dispatch(logout());
        onClose();
        }
        setShowConfirmModal(false);
    }

    return (
        <>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl" backdrop="opaque">
                <DrawerContent>
                    <DrawerHeader className="flex items-center justify-between relative">
                        <span className="text-lg font-semibold">User Details</span>
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
                    </DrawerHeader>
                        { userDetails?.userDetails ? (
                            <DrawerBody className="space-y-1">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    {
                                        avatar ? (
                                            <Avatar 
                                                size="lg" 
                                                src={URL.createObjectURL(avatar)} 
                                            />) : (
                                            <Avatar 
                                                size="lg" 
                                                src={userDetails?.avatar}
                                            />
                                        )
                                    }
                                    <Plus 
                                        className="absolute left-10 bottom-[-2px] text-blue-700 cursor-pointer" 
                                        onClick={() => {
                                            avatarInputRef?.current?.click();
                                        }}
                                    />
                                    <input
                                        ref={avatarInputRef}
                                        type="file"
                                        accept="avatar/*"
                                        className="hidden"
                                        onChange={(e) => setavatar(e.target.files[0])}
                                    />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">{userDetails?.username.toUpperCase()}</p>
                                    <p className="text-sm text-muted-foreground">{userDetails.email}</p>
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                max size 500KB
                            </span>

                            <Divider />

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
                            <ul className="list-disc pl-4 space-y-1 text-blue-600">
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
                                    <h4 className="text-base font-semibold">{project.projectName}</h4>
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
                                    <Avatar size="lg" />
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
            />
            <ProjectDetailsModal 
                isOpen={isProjectModalOpen} 
                onOpenChange={onOpenChangeOfProjectModal}
            />
        </>
    );
};
