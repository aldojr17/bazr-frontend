import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Image,
  ModalCloseButton,
  ModalBody,
  Center,
  VStack,
  Text,
  HStack,
  Input,
  ModalFooter,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { IWalletPasswordModalProps } from "../../interfaces/Components";

const WalletPasswordModal = ({ ...props }: IWalletPasswordModalProps) => {
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
          <Image src="/logo.svg" width={"8em"} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center height={"60vh"}>
            <VStack
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={10}
              width="100%"
            >
              <Text
                fontSize={{
                  base: "1em",
                  sm: "1em",
                  md: "1em",
                  lg: "2em",
                  xl: "2em",
                }}
                as="b"
              >
                Password Verification
              </Text>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                width="100%"
              >
                <InputGroup size="lg" width={"70%"}>
                  <Input
                    pr="4.5rem"
                    type={"password"}
                    placeholder="Enter password"
                    fontSize={"2xl"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      props.setPasswordInput(event.currentTarget.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        props.verifyPasswordKb(e);
                      }
                    }}
                  />
                </InputGroup>
              </HStack>
            </VStack>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={props.verifyPasswordMs}
          >
            Verify
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletPasswordModal;
