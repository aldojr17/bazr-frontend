import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillChatDotsFill } from "react-icons/bs";
import RefundChatModal from "../../components/Modal/RefundChatModal";
import useRefund from "../../hooks/useRefund";
import { formatCurrency } from "../../util/util";
import { useState, useEffect } from "react";
import { IRefund } from "../../interfaces/Refund";
import Pagination from "../../components/Pagination/Pagination";

function UserOngoingRefund() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refundList, setRefundList] = useState<IRefund[]>([]);
  const { fetchBuyerRefund } = useRefund();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const updateRefundList = async () => {
    const response = await fetchBuyerRefund({ page: page });
    setRefundList(response.data.data);
    setTotalPage(response.data.total_page);
  };

  useEffect(() => {
    updateRefundList();
  }, [page]);

  return (
    <Flex direction={"column"}>
      <Text fontSize={"2xl"} fontWeight="semibold" my={3}>
        Refunds
      </Text>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Order Id</Th>
              <Th textAlign={"center"}>Seller</Th>
              <Th textAlign={"center"}>Amount</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {refundList.map((ref) => {
              return (
                <Tr>
                  <Td textAlign={"center"}>{ref.order_id}</Td>
                  <Td textAlign={"center"}>{ref.seller_name}</Td>
                  <Td textAlign={"center"}>
                    {"Rp" + formatCurrency(ref.amount)}
                  </Td>
                  <Td textAlign={"center"}>
                    <IconButton
                      mx={1}
                      aria-label="Refund"
                      bgColor={"orange.400"}
                      icon={<BsFillChatDotsFill />}
                      onClick={onOpen}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        data={{ total_page: totalPage, current_page: page }}
        setPage={setPage}
      />
      <RefundChatModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default UserOngoingRefund;
