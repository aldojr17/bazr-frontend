import {
  Button,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsEye, BsFiles, BsPencil, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/Modal/DeleteModal";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import useVoucher from "../../../hooks/useVoucher";
import routes from "../../../routes/Routes";
import { formatCurrency } from "../../../util/util";

function VoucherTable(props: { status: string }) {
  const { vouchers, isLoading, fetchAllVoucher, deleteVoucher } = useVoucher();
  const { successToast, errorToast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<number>(0);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleDeleteVocher = async (id: number) => {
    const response = await deleteVoucher(id);
    if (response.is_success) {
      successToast(response.message);
      onClose();
      fetchAllVoucher(props.status, 1, 10, user?.shop_id!);
    } else {
      errorToast(response.message);
    }
  };

  const handleShowModal = (id: number) => {
    setId(id);
    onOpen();
  };

  const handleNextPage = () => {
    const page = (vouchers?.current_page ?? 0) + 1;
    fetchAllVoucher(props.status, page, 10, user?.shop_id!);
  };

  const handlePrevPage = () => {
    const page = (vouchers?.current_page ?? 0) - 1;
    fetchAllVoucher(props.status, page, 10, user?.shop_id!);
  };

  const isOngoing = (startDate: string, expiryDate: string): boolean => {
    return (
      dayjs().isAfter(dayjs(startDate)) && dayjs().isBefore(dayjs(expiryDate))
    );
  };

  const isUpcoming = (startDate: string, expiryDate: string): boolean => {
    return (
      dayjs().isBefore(dayjs(startDate)) && dayjs().isBefore(dayjs(expiryDate))
    );
  };

  const isEnded = (startDate: string, expiryDate: string): boolean => {
    return (
      dayjs().isAfter(dayjs(startDate)) && dayjs().isAfter(dayjs(expiryDate))
    );
  };

  useEffect(() => {
    fetchAllVoucher(props.status, 1, 10, user?.shop_id!);
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th isNumeric>Quota</Th>
              <Th isNumeric>Benefit</Th>
              <Th isNumeric>Benefit Percentage</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={7} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            ) : null}

            {!isLoading && vouchers?.data.length === 0 ? (
              <Tr>
                <Td colSpan={7} textAlign="center">
                  Empty Data
                </Td>
              </Tr>
            ) : null}

            {!isLoading &&
              vouchers?.data.map((voucher, index) => {
                return (
                  <Tr key={index}>
                    <Td>{voucher.code}</Td>
                    <Td>
                      {dayjs(voucher.start_date).format("YYYY-MM-DD hh:mmA")}
                    </Td>
                    <Td>
                      {dayjs(voucher.expiry_date).format("YYYY-MM-DD hh:mmA")}
                    </Td>
                    <Td isNumeric>{voucher.quota}</Td>
                    <Td isNumeric>Rp {formatCurrency(voucher.benefit)}</Td>
                    <Td isNumeric>{voucher.benefit_percentage}%</Td>
                    <Td textAlign={"center"}>
                      {isEnded(voucher.start_date, voucher.expiry_date) ? (
                        <Tooltip
                          hasArrow
                          label="Detail"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Detail"
                            bgColor={"blue.300"}
                            icon={<BsEye />}
                            onClick={() => {
                              navigate(
                                routes.SELLER_VOUCHER_DETAIL(voucher.id)
                              );
                            }}
                          />
                        </Tooltip>
                      ) : null}

                      {isOngoing(voucher.start_date, voucher.expiry_date) ||
                      isUpcoming(voucher.start_date, voucher.expiry_date) ? (
                        <Tooltip
                          hasArrow
                          label="Edit"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Edit"
                            bgColor={"yellow.300"}
                            icon={<BsPencil />}
                            onClick={() => {
                              navigate(routes.SELLER_VOUCHER_EDIT(voucher.id));
                            }}
                          />
                        </Tooltip>
                      ) : null}

                      <Tooltip
                        hasArrow
                        label="Duplicate"
                        bg="gray.300"
                        color="black"
                      >
                        <IconButton
                          mx={1}
                          aria-label="Duplicate"
                          bgColor={"green.400"}
                          icon={<BsFiles />}
                          onClick={() => {
                            navigate(
                              routes.SELLER_VOUCHER_DUPLICATE(voucher.id)
                            );
                          }}
                        />
                      </Tooltip>

                      {isUpcoming(voucher.start_date, voucher.expiry_date) ? (
                        <Tooltip
                          hasArrow
                          label="Delete"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Delete"
                            bgColor={"red"}
                            icon={<BsTrash />}
                            onClick={() => handleShowModal(voucher.id)}
                          />
                        </Tooltip>
                      ) : null}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex pt={"5"} justifyContent={"space-between"}>
        <Text>Total {vouchers?.total}</Text>
        <Flex alignItems={"center"}>
          <Button
            isDisabled={vouchers?.current_page === 1}
            fontWeight={"normal"}
            onClick={() => {
              handlePrevPage();
            }}
          >
            Prev
          </Button>
          <Text px={3}>
            {vouchers?.current_page} of {vouchers?.total_page}
          </Text>
          <Button
            isDisabled={
              (vouchers?.current_page ?? 0) >= (vouchers?.total_page ?? 0)
            }
            fontWeight={"normal"}
            onClick={() => {
              handleNextPage();
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>

      <DeleteModal
        isLoading={false}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={() => handleDeleteVocher(id)}
      />
    </>
  );
}

export default VoucherTable;
