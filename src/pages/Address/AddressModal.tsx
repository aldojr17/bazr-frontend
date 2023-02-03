import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useAddress from "../../hooks/useAddress";
import { IPropsAddressModal } from "../../interfaces/Address";
import AddressModalBody from "./AddressModalBody";

function AddressModal(props: IPropsAddressModal) {
  const { isOpen, onClose, setRefetchUserAddress } = props;
  const { modalTitle } = useAddress();

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalTitle.title}
          <Divider marginTop={3} />
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box paddingBottom={5}>
            <AddressModalBody
              onClose={onClose}
              setRefetchUserAddress={setRefetchUserAddress}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddressModal;
