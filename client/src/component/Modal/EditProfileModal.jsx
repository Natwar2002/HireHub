import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";
import { useRef, useState } from "react";
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateUser } from '../../hooks/user/useUpdateUser'

export default function EditProfileModal({ isOpen, onOpenChange, userDetails }) {
  const [username, setUsername] = useState(userDetails?.username);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { updateUserMutation } = useUpdateUser();
  const queryClient = useQueryClient();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (!username?.trim() && !selectedImage) {
      alert("Username or photo is required.");
      return;
    }

    const payload = {
      username,
      avatar: selectedImage,
    };

    try {
      const res = updateUserMutation(payload);
      console.log("Submitted: ", res);
    } catch (error) {
      console.log(error);
    }
    queryClient.invalidateQueries({ queryKey: ['get-user-details'] });
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody className="flex flex-col gap-4 items-center">

                <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <div
                  className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 cursor-pointer hover:border-primary flex items-center justify-center overflow-hidden"
                  onClick={handleImageClick}
                >
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
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
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                      className="hidden"
                  />
                </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
