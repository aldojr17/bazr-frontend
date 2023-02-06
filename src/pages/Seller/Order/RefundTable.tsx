import {
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import Icon from "../../../assets/icons";
import Pagination from "../../../components/Pagination/Pagination";
import useRefund from "../../../hooks/useRefund";
import useShopOrder from "../../../hooks/useShopOrder";
import { IRefund, IRefundDetail } from "../../../interfaces/Refund";
import { refundStatusses } from "../../../util/constant";
import { formatCurrency } from "../../../util/util";
import OrderRefundChatModal from "./OrderRefundChatModal";
import OrderRefundDetailModal from "./OrderRefundDetailModal";

function RefundTable() {
  const { shopOrders, isLoading } = useShopOrder();
  const { refundLoading, fetchSellerRefund, fetchRefundDetail } = useRefund();

  const chatModal = useDisclosure();
  const detailModal = useDisclosure();

  const [refundList, setRefundList] = useState<IRefund[]>([]);
  const [refundDetail, setRefundDetail] = useState<IRefundDetail | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handleTagStatus = (orderStatus: string) => {
    switch (orderStatus) {
      case refundStatusses.IN_PROGRESS:
        return (
          <Tag variant={"solid"} colorScheme={"gray"}>
            {refundStatusses.IN_PROGRESS}
          </Tag>
        );
      case refundStatusses.APPROVED:
        return (
          <Tag variant={"solid"} colorScheme={"green"}>
            {refundStatusses.APPROVED}
          </Tag>
        );
      case refundStatusses.REJECTED:
        return (
          <Tag variant={"solid"} colorScheme={"red"}>
            {refundStatusses.REJECTED}
          </Tag>
        );
      case refundStatusses.REFUNDED:
        return (
          <Tag variant={"solid"} colorScheme={"teal"}>
            {refundStatusses.REFUNDED}
          </Tag>
        );

      default:
        return <Tag>-</Tag>;
    }
  };

  const handleChatBuyer = (
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
    if (!detailModal.isOpen) {
      fetchSellerRefund({ page: page }).then((res) => {
        setRefundList(res.data.data);
        setTotalPage(res.data.total_page);
      });
    }
  }, [detailModal.isOpen, page]);

  return (
    <>
      <TableContainer>
        <Table variant={"striped"}>
          <Thead>
            <Tr>
              <Th>Refund ID</Th>
              <Th>Order ID</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            )}

            {!isLoading && shopOrders?.data.length === 0 && (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  Empty Data
                </Td>
              </Tr>
            )}

            {!isLoading &&
              refundList?.map((refundItem, index) => (
                <Tr key={index}>
                  <Td>{refundItem.id ?? ""}</Td>
                  <Td>{refundItem.order_id ?? ""}</Td>
                  <Td>Rp{formatCurrency(refundItem.amount ?? 0)}</Td>
                  <Td>{handleTagStatus(refundItem.status_name ?? "")}</Td>
                  <Td textAlign={"center"}>
                    {refundItem.status_name !== refundStatusses.APPROVED &&
                      refundItem.status_name !== refundStatusses.REFUNDED && (
                        <Tooltip
                          hasArrow
                          label="Chat with Buyer"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            id={refundItem.id.toString()}
                            mx={1}
                            aria-label="Chat with Buyer"
                            variant={"outline"}
                            icon={<Icon.Chat />}
                            onClick={handleChatBuyer}
                          />
                        </Tooltip>
                      )}
                    <Tooltip
                      hasArrow
                      label="Refund Detail"
                      bg="gray.300"
                      color="dark"
                    >
                      <IconButton
                        id={refundItem.id.toString()}
                        mx={1}
                        aria-label="Refund Detail"
                        icon={<BsEye />}
                        onClick={handleRefundDetail}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination
        data={{ total_page: totalPage, current_page: page }}
        setPage={setPage}
      />

      <OrderRefundChatModal
        config={"seller"}
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
        config={"seller"}
        isOpen={detailModal.isOpen}
        isLoading={refundLoading}
        onClose={() => detailModal.onClose()}
        refundDetail={refundDetail!}
      />
    </>
  );
}

export default RefundTable;
