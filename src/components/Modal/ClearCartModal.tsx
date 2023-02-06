import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IClearCartModalProps } from "../../interfaces/Components";

function ClearCartModal(props: IClearCartModalProps) {
  const { isOpen, onClose, onClearCart } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Clear Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure want to clear your cart?</ModalBody>
        <ModalFooter>
          <Button colorScheme="default" onClick={onClearCart}>
            Clear Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ClearCartModal;
