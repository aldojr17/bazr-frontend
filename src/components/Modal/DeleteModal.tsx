import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import { BsXCircle } from "react-icons/bs";
import { IDeleteModalProps } from "../../interfaces/Components";

function DeleteModal(props: IDeleteModalProps) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent rounded={"lg"}>
          <ModalCloseButton />
          <ModalBody paddingY={"30px"}>
            <VStack spacing={"30px"}>
              <BsXCircle size={100} color={"red"} />
              <Text fontWeight={"semibold"} fontSize={"25px"}>
                Are You Sure?
              </Text>
              <Text>Do you really want to delete these records?</Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent={"center"} mb={"30px"}>
            <Button variant="ghost" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"red"}
              isLoading={props.isLoading}
              onClick={props.onDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
