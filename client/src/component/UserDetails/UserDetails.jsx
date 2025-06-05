import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { FaPowerOff } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import store from "../../redux/store";
import { logout } from "../../redux/actions/authAction";
import ConfirmModal from "../Modal/ConfirmModal";
import { useState } from "react";

export const UserDetails = ({ isOpen, onOpenChange, onClose }) => {

    const user = {
        username: "Natwar Patidar",
        email: "natwar@example.com",
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
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);

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
                {() => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">User Details</DrawerHeader>

                        <DrawerBody className="space-y-1">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar size="lg" />
                                    <Plus className="absolute left-10 bottom-[-2px] text-blue-700 cursor-pointer" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">{user.username}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                max size 500KB
                            </span>

                            <Divider />

                            <div>
                                <h3 className="font-semibold mb-1">Highest Education</h3>
                                <p>
                                    {user.highestEducation?.qualification} (
                                    {user.highestEducation?.completionDate
                                        ? new Date(user.highestEducation.completionDate).toLocaleDateString()
                                        : "N/A"}
                                    )
                                </p>
                            </div>

                        <Divider />

                        <div>
                            <h3 className="font-semibold mb-1">Experience</h3>
                            {user.experience?.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-1">
                                {user.experience.map((exp, idx) => (
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
                            {user.skills?.map((skill, idx) => (
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
                            <p>Phone: {user.phoneNo}</p>
                            <p>Location: {user.location?.city}, {user.location?.state}</p>
                        </div>

                        <Divider />

                        <div>
                            <h3 className="font-semibold mb-1">Links</h3>
                            <ul className="list-disc pl-4 space-y-1 text-blue-600">
                            {user.linkedinLink && (
                                <li>
                                <a href={user.linkedinLink} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                                </li>
                            )}
                            {user.gitHubLink && (
                                <li>
                                <a href={user.gitHubLink} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                                </li>
                            )}
                            {user.portfolioLink && (
                                <li>
                                <a href={user.portfolioLink} target="_blank" rel="noopener noreferrer">
                                    Portfolio
                                </a>
                                </li>
                            )}
                            {user.resume && (
                                <li>
                                <a href={user.resume} target="_blank" rel="noopener noreferrer">
                                    Resume
                                </a>
                                </li>
                            )}
                            </ul>
                        </div>
                        </DrawerBody>

                        <DrawerFooter className="flex justify-between">
                            <Button
                                onPress={openConfirmDialog}
                            >
                                <span>Logout</span>
                                <FaPowerOff />
                            </Button>
                            <Button
                                onPress={() => {}}
                            >
                                <span>Edit</span>
                                <BsPencilSquare />
                            </Button>
                        </DrawerFooter>
                    </>
                )}
                </DrawerContent>
            </Drawer>

            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirm}
                action={confirmAction}
            />
        </>
    );
};
