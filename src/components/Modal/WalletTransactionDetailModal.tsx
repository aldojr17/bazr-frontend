import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { formatCurrency } from "../../util/util";
import useTransactionOrderHistory from "../../hooks/transactionOrderHistory";
import { IWalletTransactionModalProps } from "../../interfaces/Components/Wallet";
import { useEffect, useState } from "react";
import { IWalletTransactionDetail } from "../../interfaces/Wallet";

const WalletTransactionDetailModal = (props: IWalletTransactionModalProps) => {
  const { getTransactionDetail } = useTransactionOrderHistory();

  const [transactionDetail, setTransactionDetail] =
    useState<IWalletTransactionDetail>();

  const fetchTransactionDetail = async () => {
    const response = await getTransactionDetail(props.data.transaction_id);
    setTransactionDetail(response.data);
  };

  useEffect(() => {
    fetchTransactionDetail();
  }, []);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"2xl"} textAlign={"center"}>
          Transaction Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            {props.data.transaction_type === "PAYMENT" ? (
              <Text fontSize={"2xl"} color="red.300" fontWeight={"bold"}>
                {"-Rp" + formatCurrency(props.data.amount)}
              </Text>
            ) : (
              <Text fontSize={"2xl"} textColor="green" fontWeight={"bold"}>
                {"+Rp" + formatCurrency(props.data.amount)}
              </Text>
            )}
            <Text fontWeight={"semibold"}>{props.data.title}</Text>
            <Text py={4}>
              {dayjs(props.data.transaction_date).format("lll")}
            </Text>
            <Divider border={"5px"} mb={4} />
            {props.data.transaction_id ? (
              <Text fontSize="md" fontWeight={"semibold"} mb={2}>
                Order Details
              </Text>
            ) : (
              ""
            )}
            {transactionDetail ? (
              <Flex direction={"column"}>
                {transactionDetail.orders.map((order) =>
                  order.items.map((item, idx) => {
                    return (
                      <Flex
                        direction={"row"}
                        justifyContent={"space-between"}
                        key={item.name + idx}
                      >
                        <Text fontSize={"sm"} fontWeight="light">
                          {item.qty + " X " + item.name}
                        </Text>
                        <Text fontSize={"sm"} fontWeight="normal">
                          {"Rp" + formatCurrency(item.total_price)}
                        </Text>
                      </Flex>
                    );
                  })
                )}
                <Flex direction={"row"} justifyContent={"space-between"}>
                  <Text fontSize={"sm"} fontWeight="light">
                    Total Delivery Fee
                  </Text>
                  <Text fontSize={"sm"} fontWeight="normal">
                    {"Rp" +
                      formatCurrency(transactionDetail.total_delivery_fee)}
                  </Text>
                </Flex>
                <Divider border={"2px"} my={2} />
                <Flex direction={"row"} justifyContent={"space-between"} pt={1}>
                  <Text fontSize="md" fontWeight={"semibold"}>
                    Grand Total
                  </Text>
                  <Text fontSize="md" fontWeight={"semibold"}>
                    {"Rp" + formatCurrency(transactionDetail.total)}
                  </Text>
                </Flex>
                <Divider border={"2px"} my={2} />
                <Flex direction={"row"} justifyContent={"space-between"} pt={1}>
                  <Text fontSize="md" fontWeight={"semibold"}>
                    Payment Method
                  </Text>
                  <Text fontSize="md" fontWeight={"medium"}>
                    {transactionDetail.payment_method}
                  </Text>
                </Flex>
              </Flex>
            ) : (
              ""
            )}
          </>
        </ModalBody>
        {props.data.transaction_id ? (
          <ModalFooter>
            <Flex justifyContent={"center"} width="100%">
              <Text fontWeight={"bold"}>
                {"Transaction ID - " + props.data.transaction_id}
              </Text>
            </Flex>
          </ModalFooter>
        ) : (
          ""
        )}
      </ModalContent>
    </Modal>
  );
};

export default WalletTransactionDetailModal;
