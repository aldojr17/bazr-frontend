import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import Icon from "../../assets/icons";
import Pagination from "../../components/Pagination/Pagination";
import useRefund from "../../hooks/useRefund";
import { IRefund, IRefundDetail } from "../../interfaces/Refund";
import { refundStatusses } from "../../util/constant";
import { formatCurrency } from "../../util/util";
import OrderRefundChatModal from "../Seller/Order/OrderRefundChatModal";
import OrderRefundDetailModal from "../Seller/Order/OrderRefundDetailModal";

function UserOngoingRefund() {
  const chatModal = useDisclosure();
  const detailModal = useDisclosure();

  const { refundLoading, fetchBuyerRefund, fetchRefundDetail } = useRefund();

  const [refundList, setRefundList] = useState<IRefund[]>([]);
  const [refundDetail, setRefundDetail] = useState<IRefundDetail | null>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const updateRefundList = async () => {
    const response = await fetchBuyerRefund({ page: page });
    setRefundList(response.data.data);
    setTotalPage(response.data.total_page);
  };

  const handleChatSeller = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const refundId = e.currentTarget.id;

    fetchRefundDetail(parseInt(refundId)).then((data) =>
      setRefundDetail(data.data)
    );

    chatModal.onOpen();
  };

  const handleRefundDetail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const refundId = e.currentTarget.id;

    fetchRefundDetail(parseInt(refundId)).then((data) =>
      setRefundDetail(data.data)
    );

    detailModal.onOpen();
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
            {refundList.map((ref, index) => {
              return (
                <Tr key={index}>
                  <Td textAlign={"center"}>{ref.order_id}</Td>
                  <Td textAlign={"center"}>{ref.seller_name}</Td>
                  <Td textAlign={"center"}>
                    {"Rp" + formatCurrency(ref.amount)}
                  </Td>
                  <Td textAlign={"center"}>
                    {ref.status_name !== refundStatusses.APPROVED &&
                      ref.status_name !== refundStatusses.REFUNDED && (
                        <IconButton
                          id={ref.id.toString()}
                          mx={1}
                          aria-label="Refund"
                          bgColor={"orange.400"}
                          icon={<BsFillChatDotsFill />}
                          onClick={handleChatSeller}
                        />
                      )}
                    <IconButton
                      id={ref.id.toString()}
                      mx={1}
                      aria-label="Refund Detail"
                      icon={<Icon.Show />}
                      onClick={handleRefundDetail}
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

      <OrderRefundChatModal
        config={"buyer"}
        isOpen={chatModal.isOpen}
        isLoading={refundLoading}
        onClose={() => chatModal.onClose()}
        chats={refundDetail?.chats!}
        refundId={refundDetail?.id!}
        buyerId={refundDetail?.buyer_id!}
        buyerName={refundDetail?.buyer_name!}
        sellerId={refundDetail?.seller_id!}
        sellerName={refundDetail?.seller_name!}
        lastUpdated={refundDetail?.chats_last_updated!}
      />

      <OrderRefundDetailModal
        config={"buyer"}
        isOpen={detailModal.isOpen}
        isLoading={refundLoading}
        onClose={() => detailModal.onClose()}
        refundDetail={refundDetail!}
      />
    </Flex>
  );
}

export default UserOngoingRefund;
