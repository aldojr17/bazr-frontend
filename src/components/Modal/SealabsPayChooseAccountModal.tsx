import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Icon from "../../assets/icons";
import useSealabsPay from "../../hooks/useSealabsPay";
import useUser from "../../hooks/useUser";
import { ISealabsPayChooseAccountModalProps } from "../../interfaces/Components";
import SealabsPayCard from "../Card/SealabsPayCard";
import SealabsPayAddNewAccountModal from "./SealabsPayAddNewAccountModal";

const SealabsPayChooseAccountModal: React.FC<
  ISealabsPayChooseAccountModalProps
> = ({ ...props }) => {
  const { sealabsPay, chosenSealabsPay, getSealabsPay, setChosenSealabsPay } =
    useSealabsPay();
  const { user } = useUser();
  const addNewModal = useDisclosure();

  useEffect(() => {
    getSealabsPay();
  }, []);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={{ base: "full", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your Sealabs Pay account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {sealabsPay.length > 0 ? (
                sealabsPay.map((val) => {
                  return (
                    <SealabsPayCard
                      key={val.id}
                      chosen={
                        chosenSealabsPay.id === val.id
                          ? "primaryLighten"
                          : "lightLighten"
                      }
                      nameOnCard={val.name_on_card}
                      cardNumber={val.card_number}
                      activeDate={val.active_date}
                      id={val.id}
                      user_id={Number(user?.id)}
                      isDefault={user?.default_sealabs_pay_id === val.id}
                      onClick={() => {
                        setChosenSealabsPay(val);
                      }}
                    />
                  );
                })
              ) : (
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  bgColor={"lightLighten"}
                  borderRadius={"lg"}
                  gap={5}
                  p={8}
                >
                  <Icon.Warning boxSize={10} />
                  <Text
                    align={"center"}
                    fontSize={"md"}
                    fontWeight={"semibold"}
                  >
                    It looks like you don't have any SeaLabs Pay connected to
                    your account.
                  </Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      addNewModal.onOpen();
                      props.onClose();
                    }}
                  >
                    Add SeaLabs Pay
                  </Button>
                </Flex>
              )}
            </VStack>
            {sealabsPay.length > 0 && <>{props.children}</>}
          </ModalBody>
          <ModalFooter>
            <Flex direction={"row"} gap={2} justifyContent={"end"}>
              {sealabsPay.length > 0 && (
                <Button
                  variant="primaryOutline"
                  onClick={() => {
                    addNewModal.onOpen();
                    props.onClose();
                  }}
                >
                  Add SeaLabs Pay
                </Button>
              )}
              <Button variant={"primary"} onClick={props.onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SealabsPayAddNewAccountModal
        isOpen={addNewModal.isOpen}
        onClose={addNewModal.onClose}
      />
    </>
  );
};

export default SealabsPayChooseAccountModal;
