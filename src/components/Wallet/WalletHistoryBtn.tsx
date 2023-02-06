import { HStack, VStack, Text, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IWalletHistoryBtnProps } from "../../interfaces/Components/Wallet";
import { formatCurrency } from "../../util/util";
import WalletTransactionDetailModal from "../Modal/WalletTransactionDetailModal";

const WalletHistoryBtn = (props: IWalletHistoryBtnProps) => {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const type = props.data.transaction_type;

  return (
    <>
      <HStack
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"1px"}
        borderColor={"gray.200"}
        p={3}
        _hover={{
          background: "gray.200",
          color: "teal.500",
          cursor: "pointer",
        }}
        onClick={onOpen}
      >
        <VStack alignItems={"start"}>
          <Text fontWeight={"semibold"} fontSize={"sm"} color={"gray.500"}>
            {props.data.transaction_type}
          </Text>
          <Text fontWeight={"semibold"} fontSize={"sm"} color={"gray.500"}>
            {dayjs(props.data.transaction_date).format("LT")}
          </Text>
        </VStack>
        {type === "PAYMENT" ? (
          <Text fontWeight={"bold"} textColor="#F1435A">
            {"-Rp" + formatCurrency(props.data.amount)}
          </Text>
        ) : (
          <Text fontWeight={"bold"} textColor="green">
            {"+Rp" + formatCurrency(props.data.amount)}
          </Text>
        )}
      </HStack>
      <WalletTransactionDetailModal
        isOpen={isOpen}
        onClose={onClose}
        data={props.data}
      />
    </>
  );
};

export default WalletHistoryBtn;
