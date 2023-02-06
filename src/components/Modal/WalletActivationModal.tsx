import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Image,
  ModalBody,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { IWalletActivationModalProps } from "../../interfaces/Components";

const WalletActivationModal = ({ ...props }: IWalletActivationModalProps) => {
  const nextModal = async () => {
    props.onClose();
    props.nextModal();
  };

  return (
    <Modal
      onClose={props.onClose}
      size="4xl"
      isOpen={props.isOpen}
      closeOnOverlayClick={false}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>
          <Image loading="lazy" src="/logo.svg" width={"8em"} />
        </ModalHeader>
        <ModalBody>
          <Center height={"60vh"}>
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="100%"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Wallet Has Not Been Activated!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Please set up a 6 digit pin for your wallet, click "Next" to
                continue.
              </AlertDescription>
            </Alert>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button onClick={nextModal}>Next</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletActivationModal;
