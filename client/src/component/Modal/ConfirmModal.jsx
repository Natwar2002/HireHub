import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@heroui/react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, action, title, message }) => {
  if (!action) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{title || `Confirm ${action}`}</ModalHeader>
            <ModalBody>
              <p>{message || `Are you sure you want to ${action}?`}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>Cancel</Button>
              <Button color={action === "delete" ? "danger" : "primary"} onPress={onConfirm}>
                Yes, {action}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;