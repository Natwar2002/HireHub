import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@heroui/react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, action }) => {
  if (!action) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {action === "logout" ? "Confirm Logout" : "Confirm Account Deletion"}
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to{" "}
                <span className="font-semibold">{action}</span> your account?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color={action === "logout" ? "primary" : "danger"}
                onPress={onConfirm}
              >
                Yes {action}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;