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
import { IShopEditModalProps } from "../../../interfaces/Order";

function OrderEditModal(props: IShopEditModalProps) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent rounded={"lg"}>
          <ModalHeader>Confirm Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.content}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => props.onClose()}>
              Close
            </Button>
            <Button
              variant={"solid"}
              bgColor={"orange.300"}
              isLoading={props.isLoading}
              onClick={props.onConfirm}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderEditModal;
