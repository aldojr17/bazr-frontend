import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Icon from "../../assets/icons";
import PaymentPinModal from "../../components/Modal/PaymentPinModal";
import SealabsPayTopupWalletModal from "../../components/Modal/SealabsPayTopupWalletModal";
import WalletActivationModal from "../../components/Modal/WalletActivationModal";
import WalletPasswordModal from "../../components/Modal/WalletPasswordModal";
import Pagination from "../../components/Pagination/Pagination";
import WalletHistoryBtn from "../../components/Wallet/WalletHistoryBtn";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import useWallet from "../../hooks/useWallet";
import {
  IPinPasswordRequestPayload,
  IPinRequestPayload,
  IPinUpdateRequestPayload,
} from "../../interfaces/Auth";
import {
  IGroupedWalletHistory,
  IWalletHistoryResponsePayload,
} from "../../interfaces/Wallet";
import { formatCurrency } from "../../util/util";

function UserWallet() {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
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
  const [walletHistory, setWalletHistory] =
    useState<IWalletHistoryResponsePayload>();
  const [groupedHistory, setGroupedHistory] = useState<IGroupedWalletHistory[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");

  const { verifyPasswordPin, updatePin, activateWallet, getWalletHistory } =
    useWallet();
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
      errorToast("Invalid password", response.message);
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

  const getHistory = async () => {
    const response = await getWalletHistory({ type: type, page: page });
    setWalletHistory(response);

    const groups = response.data.data.reduce((groups: any, transaction) => {
      const date = transaction.transaction_date.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        transactions: groups[date],
      };
    });
    setGroupedHistory(groupArrays);
  };

  useEffect(() => {
    if (user) {
      if (!user.wallet_detail.is_activated) {
        onOpenAlert();
      }
    }

    getHistory();
  }, [page, type]);

  return (
    <Container maxW="container.xl">
      <Box
        py={{
          base: "1em",
          sm: "1.5em",
          md: "2em",
          lg: "2.5em",
          xl: "4em",
        }}
      >
        <Flex
          width={"100%"}
          justifyContent={{ base: "center", lg: "space-around" }}
          direction={{ base: "column", lg: "row" }}
        >
          <VStack
            alignItems={"start"}
            boxShadow={"default"}
            border="2px"
            borderColor={"light"}
            borderRadius={"lg"}
            width={{ base: "100%", lg: "40%" }}
            p={8}
            height={"fit-content"}
          >
            <Flex direction={"column"} width={"100%"}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <HStack>
                  <Icon.Wallet fill={"primary"} />
                  <Heading
                    variant={"sectionHeading"}
                    fontSize={{ base: "md", sm: "xl", md: "2xl" }}
                    mb={0}
                  >
                    Wallet
                  </Heading>
                </HStack>

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

              <Flex direction={"row"} justifyContent={"start"} gap={2}>
                <Text fontWeight={"semibold"}>ID:</Text>
                <Text
                  textAlign={"end"}
                  color={"darkLighten"}
                  fontWeight={"semibold"}
                >
                  {user?.wallet_detail.id}
                </Text>
              </Flex>
            </Flex>

            <Divider />
            <Text fontWeight={"semibold"}>Balance:</Text>
            <Text
              align={"center"}
              fontSize={{ base: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color={"primary"}
              width={"100%"}
            >
              Rp{formatCurrency(user?.wallet_detail.balance!)}
            </Text>
            <Button
              width={"100%"}
              variant="solid"
              colorScheme="green"
              onClick={onOpenTopup}
              mt={3}
            >
              Top-up
            </Button>
          </VStack>
          <VStack
            alignItems={"start"}
            width={{ base: "100%", lg: "55%" }}
            p={8}
            boxShadow={"default"}
            border="2px"
            borderColor={"light"}
            borderRadius={"15px"}
            mt={{ base: "8", lg: "0" }}
          >
            <Heading
              variant={"sectionHeading"}
              fontSize={{ base: "md", sm: "xl", md: "2xl" }}
              mb={0}
            >
              Wallet History
            </Heading>
            <HStack width={"100%"} pb={7}>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option disabled={true} value="">
                  Transaction Type
                </option>
                <option value="all">All</option>
                <option value="topup">Topup</option>
                <option value="payment">Payment</option>
              </Select>
            </HStack>
            <Divider />
            {walletHistory && groupedHistory ? (
              <>
                <Box width={"100%"}>
                  {groupedHistory.map((data) => {
                    return (
                      <>
                        <Text
                          textTransform={"uppercase"}
                          fontWeight={"bold"}
                          p={2}
                        >
                          {dayjs(data.date).format("ll")}
                        </Text>
                        {data.transactions.map((detail) => {
                          return <WalletHistoryBtn data={detail} />;
                        })}
                      </>
                    );
                  })}
                  <Center>
                    <Pagination
                      data={{
                        total_page: walletHistory.data.total_page!,
                        current_page: page,
                      }}
                      setPage={setPage}
                    />
                  </Center>
                </Box>
              </>
            ) : (
              <Flex width={"100%"} justifyContent={"center"}>
                <Spinner mt={10} size="xl" />
              </Flex>
            )}
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
          getWalletHistory={getHistory}
        />
      </Box>
    </Container>
  );
}

export default UserWallet;
