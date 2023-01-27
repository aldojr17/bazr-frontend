import {
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { BsEye, BsFiles, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useShopPromotion from "../../../hooks/useShopPromotion";
import routes from "../../../routes/Routes";

function PromotionTable(props: { status: string }) {
  const navigate = useNavigate();
  const { shopPromotions, isLoading, fetchAllShopPromotions } =
    useShopPromotion();

  const handleNextPage = () => {
    const page = (shopPromotions?.current_page ?? 0) + 1;
    fetchAllShopPromotions(props.status, page, 10);
  };

  const handlePrevPage = () => {
    const page = (shopPromotions?.current_page ?? 0) - 1;
    fetchAllShopPromotions(props.status, page, 10);
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
    fetchAllShopPromotions(props.status, 1, 10);
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            ) : null}

            {!isLoading && shopPromotions?.data.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  Empty Data
                </Td>
              </Tr>
            ) : null}

            {!isLoading &&
              shopPromotions?.data.map((promotion, index) => {
                return (
                  <Tr key={index}>
                    <Td>{promotion.name}</Td>
                    <Td>
                      {dayjs(promotion.start_date).format("YYYY-MM-DD hh:mmA")}
                    </Td>
                    <Td>
                      {dayjs(promotion.expiry_date).format("YYYY-MM-DD hh:mmA")}
                    </Td>
                    <Td textAlign={"center"}>
                      {isEnded(promotion.start_date, promotion.expiry_date) ? (
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
                                routes.SELLER_PROMOTION_DETAIL(promotion.id)
                              );
                            }}
                          />
                        </Tooltip>
                      ) : null}

                      {isOngoing(promotion.start_date, promotion.expiry_date) ||
                      isUpcoming(
                        promotion.start_date,
                        promotion.expiry_date
                      ) ? (
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
                              navigate(
                                routes.SELLER_PROMOTION_EDIT(promotion.id)
                              );
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
                              routes.SELLER_PROMOTION_DUPLICATE(promotion.id)
                            );
                          }}
                        />
                      </Tooltip>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex pt={"5"} justifyContent={"space-between"}>
        <Text>Total {shopPromotions?.total}</Text>
        <Flex alignItems={"center"}>
          <Button
            isDisabled={(shopPromotions?.current_page ?? 0) <= 1}
            fontWeight={"normal"}
            onClick={() => {
              handlePrevPage();
            }}
          >
            Prev
          </Button>
          <Text px={3}>
            {shopPromotions?.current_page} of {shopPromotions?.total_page}
          </Text>
          <Button
            isDisabled={
              (shopPromotions?.current_page ?? 0) >=
              (shopPromotions?.total_page ?? 0)
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
    </>
  );
}

export default PromotionTable;
