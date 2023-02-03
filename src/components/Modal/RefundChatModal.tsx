import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IRefundChatModalProps } from "../../interfaces/Components";

function RefundChatModal(props: IRefundChatModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chat With Seller</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex width="100%" direction="column" gap={4}>
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Evidence</FormLabel>
              <Input type="file" />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RefundChatModal;
