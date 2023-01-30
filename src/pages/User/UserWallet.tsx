import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  Text,
  VStack,
  Select,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Icon from "../../assets/icons";
import PaymentPinModal from "../../components/Modal/PaymentPinModal";
import SealabsPayTopupWalletModal from "../../components/Modal/SealabsPayTopupWalletModal";
import WalletActivationModal from "../../components/Modal/WalletActivationModal";
import WalletPasswordModal from "../../components/Modal/WalletPasswordModal";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import useWallet from "../../hooks/useWallet";
import {
  IPinPasswordRequestPayload,
  IPinRequestPayload,
  IPinUpdateRequestPayload,
} from "../../interfaces/Auth";
import { formatCurrency } from "../../util/util";

function UserWallet() {
  const { user } = useUser();
  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure();
  const {
    isOpen: isOpenNew,
    onOpen: onOpenNew,
    onClose: onCloseNew,
  } = useDisclosure();
  const {
    isOpen: isOpenConfig,
    onOpen: onOpenConfig,
    onClose: onCloseConfig,
  } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenTopup,
    onOpen: onOpenTopup,
    onClose: onCloseTopup,
  } = useDisclosure();
  const [pinInput, setPinInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [jwt, setJwt] = useState("");
  const { verifyPasswordPin, updatePin, activateWallet } = useWallet();
  const { successToast, errorToast } = useToast();

  const verifyPassword = async () => {
    let payloadPin: IPinPasswordRequestPayload = {
      password: passwordInput,
    };

    const response = await verifyPasswordPin(payloadPin);

    if (response.is_success) {
      successToast("Verified");
      onCloseVerify();
      setPasswordInput("");
      setJwt(response.data.token);
      onOpenNew();
    } else {
      setPasswordInput("");
      errorToast("Pin error", response.message);
      onCloseVerify();
    }
  };

  const handleNewPin = async (value: string) => {
    if (value.length === 6) {
      let payloadPin: IPinUpdateRequestPayload = {
        token: jwt,
        pin: value,
      };

      const response = await updatePin(payloadPin);

      if (response.is_success) {
        successToast("Pin Updated Successfully");
        onCloseNew();
        setPinInput("");
      } else {
        errorToast("Error", response.message);
        setPinInput("");
        onCloseNew();
      }
    }
  };

  const handleNewWallet = async (value: string) => {
    if (value.length === 6) {
      let payloadPin: IPinRequestPayload = {
        pin: value,
      };

      const response = await activateWallet(payloadPin);

      if (response.is_success) {
        successToast("Wallet Activated");
        onCloseConfig();
        setPinInput("");
      } else {
        errorToast("Error", response.message);
        setPinInput("");
        onCloseConfig();
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (!user.wallet_detail.is_activated) {
        onOpenAlert();
      }
    }
  }, []);

  return (
    <Box
      px={{
        base: "1em",
        sm: "2em",
        md: "3em",
        lg: "6em",
        xl: "12em",
      }}
      py={{
        base: "1em",
        sm: "1.5em",
        md: "2em",
        lg: "2.5em",
        xl: "4em",
      }}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        width={"100%"}
        justifyContent={{ base: "center", lg: "space-around" }}
      >
        <VStack
          alignItems={"start"}
          border={"2px"}
          width={{ base: "100%", lg: "40%" }}
          p={8}
          borderRadius={"15px"}
          height={"fit-content"}
        >
          <HStack justifyContent={"space-between"} pb={5} width={"100%"}>
            <Heading
              size={{
                base: "md",
                sm: "lg",
              }}
              textAlign={"center"}
            >
              <Icon.Wallet boxSize={8} /> My Wallet{" "}
              <Text fontSize={"md"} as="b">
                ID: {user?.wallet_detail.id}
              </Text>
            </Heading>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button
                  backgroundColor={"white"}
                  boxShadow={"none"}
                  variant={"unstyled"}
                >
                  <Icon.Gear boxSize={6} fill={"primary"} />
                </Button>
              </PopoverTrigger>
              <PopoverContent width={"fit-content"}>
                <PopoverArrow />
                <PopoverBody>
                  <Button onClick={onOpenVerify}>Change Wallet Pin</Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>

          <Text fontSize={{ base: "2em", lg: "2.5em" }} as="b">
            Rp{formatCurrency(user?.wallet_detail.balance!)}
          </Text>
          <Divider />
          <Flex width={"100%"} pt={5}>
            {/* TODO: Link Top Up with BE */}
            <Button
              width={"100%"}
              variant="solid"
              colorScheme="blue"
              onClick={onOpenTopup}
            >
              Top-up
            </Button>
          </Flex>
        </VStack>
        <VStack
          alignItems={"start"}
          border={"2px"}
          width={{ base: "100%", lg: "55%" }}
          p={8}
          borderRadius={"15px"}
          mt={{ base: "8", lg: "0" }}
        >
          <Heading
            pb={3}
            size={{
              base: "md",
              sm: "lg",
            }}
          >
            Transaction History
          </Heading>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={4}
            width={"100%"}
            pb={7}
          >
            {/* TODO: update with transaction history pagination */}
            <Select placeholder="Select Date">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select placeholder="Payment Method">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select placeholder="Transaction Type">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
          <Divider />
          <Box width={"100%"}>
            {/* TODO: update with transaction history */}
            <Text fontSize={"x-large"} py={6}>
              Friday, Jan 11 2021
            </Text>
            <HStack width={"100%"} justifyContent={"space-between"}>
              <Text>SeaLabs Pay Topup</Text>
              <Text>+Rp10.000</Text>
            </HStack>
            <HStack width={"100%"} justifyContent={"space-between"}>
              <Text>Payment</Text>
              <Text>-Rp150.000</Text>
            </HStack>
          </Box>
        </VStack>
      </Flex>
      <WalletPasswordModal
        isOpen={isOpenVerify}
        onOpen={onOpenVerify}
        onClose={onCloseVerify}
        setPasswordInput={setPasswordInput}
        verifyPasswordKb={verifyPassword}
        verifyPasswordMs={verifyPassword}
      />
      <PaymentPinModal
        isOpen={isOpenNew}
        onOpen={onOpenNew}
        onClose={onCloseNew}
        handlePinChange={handleNewPin}
        pinInput={pinInput}
        setPinInput={setPinInput}
        title={"Enter Your New 6 Digit Pin"}
      />
      <PaymentPinModal
        isOpen={isOpenConfig}
        onOpen={onOpenConfig}
        onClose={onCloseConfig}
        handlePinChange={handleNewWallet}
        pinInput={pinInput}
        setPinInput={setPinInput}
        title={"Please Enter A 6 Digit Pin"}
      />
      <WalletActivationModal
        isOpen={isOpenAlert}
        onOpen={onOpenAlert}
        onClose={onCloseAlert}
        nextModal={onOpenConfig}
      />
      <SealabsPayTopupWalletModal
        isOpen={isOpenTopup}
        onOpen={onOpenTopup}
        onClose={onCloseTopup}
      />
    </Box>
  );
}

export default UserWallet;
