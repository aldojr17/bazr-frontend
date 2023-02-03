import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
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

  const {
    isOpen: isOpenAddNew,
    onClose: onCloseAddNew,
    onOpen: onOpenAddNew,
  } = useDisclosure();

  useEffect(() => {
    getSealabsPay();
  }, []);

  // useEffect(() => {
  //   fetchProfile();
  // }, [chosenSealabsPay]);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={{ base: "full", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your Sealabs Pay account to pay</ModalHeader>
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
                          ? "secondaryLighten"
                          : "white"
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
                <Heading>No Sealabs Pay Yet. Add One!</Heading>
              )}
            </VStack>
            {props.children}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onOpenAddNew();
                props.onClose();
              }}
            >
              Add New
            </Button>
            <Button mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SealabsPayAddNewAccountModal
        isOpen={isOpenAddNew}
        onClose={onCloseAddNew}
      />
    </>
  );
};

export default SealabsPayChooseAccountModal;
