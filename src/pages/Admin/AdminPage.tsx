import {
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Text,
} from "@chakra-ui/react";
import useRefund from "../../hooks/useRefund";
import { IRefund } from "../../interfaces/Refund";
import { formatCurrency } from "../../util/util";
import { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Pagination from "../../components/Pagination/Pagination";
import useToast from "../../hooks/useToast";

function AdminPage() {
  const [refundList, setRefundList] = useState<IRefund[]>([]);
  const { fetchAdminRefund, approveRefundAdmin } = useRefund();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { successToast, errorToast } = useToast();

  const updateRefundList = async () => {
    const response = await fetchAdminRefund({ page: page });

    if (!response.is_success) {
      errorToast(response.message);
      return;
    }

    setRefundList(response.data.data);
    setTotalPage(response.data.total_page);
  };

  const handleApproveRefund = async (ref: number) => {
    const response = await approveRefundAdmin(ref, { status: "refunded" });

    if (!response.is_success) {
      errorToast(response.message);
      return;
    }
    successToast("Refund processed");
    updateRefundList();
  };

  useEffect(() => {
    updateRefundList();
  }, [page]);

  return (
    <Flex
      maxHeight="100vh"
      maxWidth="100vw"
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"whiteAlpha.700"}
      p={3}
    >
      <Text fontSize={"5xl"} fontWeight="bold">
        Manage System Refund
      </Text>
      <TableContainer maxHeight="80vh" width="80%" overflowY={"scroll"}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Order ID</Th>
              <Th textAlign={"center"}>Seller</Th>
              <Th textAlign={"center"}>Buyer</Th>
              <Th textAlign={"center"}>Amount</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {refundList.length > 0 ? (
              refundList.map((ref, idx) => {
                return (
                  <Tr key={idx}>
                    <Td textAlign={"center"}>{ref.order_id}</Td>
                    <Td textAlign={"center"}>{ref.seller_name}</Td>
                    <Td textAlign={"center"}>{ref.buyer_name}</Td>
                    <Td textAlign={"center"}>
                      {"Rp" + formatCurrency(ref.amount)}
                    </Td>
                    <Td textAlign={"center"}>
                      <IconButton
                        mx={1}
                        aria-label="Refund"
                        bgColor={"green.300"}
                        icon={<BsFillCheckCircleFill />}
                        onClick={() => handleApproveRefund(ref.id)}
                      />
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td textAlign="center" fontSize={"2xl"}>
                  No Refunds Available
                </Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {refundList.length === 0 ? (
        ""
      ) : (
        <Pagination
          data={{ total_page: totalPage, current_page: page }}
          setPage={setPage}
        />
      )}
    </Flex>
  );
}

export default AdminPage;
