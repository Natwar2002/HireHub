import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Divider,
  Input,
  useDisclosure,
} from "@heroui/react"
import { Plus } from "lucide-react";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import store from "../../redux/store";
import { logout } from "../../redux/actions/authAction";
import { CgMoreVerticalO } from "react-icons/cg";
import UserDetailsModal from "./UserDetailsModal";

export const UserModal = ({ isOpen, onClose, link }) => {

  const  user  = store.getState().auth.user;
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username);

  const { isOpen: isUserDetailsOpen , onOpenChange } = useDisclosure();

  const [confirmAction, setConfirmAction] = useState(null); 
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleNameChange = (e) => setUsername(e.target.value);
  const handleBlur = () => {
    if(username !== user?.username) {
      console.log("Username updated successfully");
    }
    setIsEditing(false);
  };

  const confirmLogout = () => {
    store.dispatch(logout());
    setShowConfirmModal(false);
    onClose();
  };

  const confirmDelete = () => {
    setShowConfirmModal(false);
    onClose();
  };

  const handleConfirm = () => {
    if (confirmAction === "logout") confirmLogout();
    else if (confirmAction === "delete") confirmDelete();
  };

  const openConfirmDialog = (action) => {
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  return (
    <>
      {/* Main Modal */}
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <UserDetailsModal isOpen={isUserDetailsOpen} onOpenChange={onOpenChange} />
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">User Profile</ModalHeader>
              <ModalBody>
                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">
                    <Avatar size="lg" src={link} />
                    <div>
                      <Plus />
                      <span className="text-xs text-muted-foreground">max size 500KB</span>
                    </div>
                  </div>
                  <div>
                    <span className="cursor-pointer" onClick={() => { onOpenChange() }}><CgMoreVerticalO size={22} /></span>
                  </div>
                </div>
                <Divider />
                <div className="mt-2">
                  {isEditing ? (
                    <Input
                      value={username}
                      onChange={handleNameChange}
                      className="my-2"
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    <p className="border-2 rounded-lg p-2 my-2 flex justify-between items-center">
                      <span>{username}</span>
                      <BsPencilSquare className="cursor-pointer" onClick={handleEditToggle} />
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground p-2">{user.email}</p>
                </div>
                <Divider />
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full mt-5">
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() => openConfirmDialog("logout")}
                  >
                    Logout
                  </Button>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => openConfirmDialog("delete")}
                  >
                    Delete
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} backdrop="blur">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                {confirmAction === "logout" ? "Confirm Logout" : "Confirm Account Deletion"}
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to{" "}
                  <span className="font-semibold">{confirmAction}</span> your account?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={() => setShowConfirmModal(false)}>
                  Cancel
                </Button>
                <Button
                  color={confirmAction === "logout" ? "primary" : "danger"}
                  onPress={handleConfirm}
                >
                  Yes {confirmAction}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};