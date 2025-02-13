import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";
import { useDisclosure } from "@nextui-org/modal";
const VerifyEmailModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
        <ModalFooter>
          <button onClick={onClose}></button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerifyEmailModal