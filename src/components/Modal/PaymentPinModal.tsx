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
  PinInput,
  PinInputField,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { IPaymentPinProps } from "../../interfaces/Components";

const PaymentPinModal = ({ ...props }: IPaymentPinProps) => {
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
                {props.title ? props.title : "Enter Your 6 Digit Pin"}
              </Text>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                width="100%"
              >
                <PinInput
                  placeholder="_"
                  onChange={(value) => {
                    props.setPinInput(value);
                    props.handlePinChange(value);
                  }}
                  value={props.pinInput}
                  mask
                >
                  {[...Array(6)].map((_, i) => {
                    return (
                      <PinInputField
                        boxSize={{
                          base: "2em",
                          sm: "2em",
                          md: "3em",
                          lg: "4em",
                          xl: "4em",
                        }}
                        fontSize={"2em"}
                        backgroundColor={"gray.100"}
                        borderColor="black"
                        tabIndex={i + 1}
                        key={i}
                      />
                    );
                  })}
                </PinInput>
              </HStack>
            </VStack>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentPinModal;
