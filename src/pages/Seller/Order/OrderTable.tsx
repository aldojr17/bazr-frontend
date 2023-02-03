import {
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BsCheckCircle,
  BsEye,
  BsPrinter,
  BsTruck,
  BsXCircle,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useShopOrder from "../../../hooks/useShopOrder";
import useUser from "../../../hooks/useUser";
import {
  IShopOrderDetailPayload,
  IShopOrderStatusPayload,
} from "../../../interfaces/Order";
import routes from "../../../routes/Routes";
import { orderStatusses } from "../../../util/constant";
import { formatCurrency } from "../../../util/util";
import OrderEditModal from "./OrderEditModal";

function OrderTable(props: { status: string }) {
  const { shopOrders, isLoading, fetchAllShopOrders, updateShopOrder } =
    useShopOrder();
  const { user } = useUser();
  const navigate = useNavigate();
  const proccessModal = useDisclosure();
  const cancelModal = useDisclosure();
  const deliveryModal = useDisclosure();
  const [orderId, setOrderId] = useState(0);

  const handleTagStatus = (orderStatus: IShopOrderStatusPayload) => {
    switch (orderStatus.status) {
      case orderStatusses.WAITING_FOR_SELLER:
        return (
          <Tag variant={"solid"} colorScheme={"gray"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.CANCELLED:
        return (
          <Tag variant={"solid"} colorScheme={"purple"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.PROCESSED:
        return (
          <Tag variant={"solid"} colorScheme={"pink"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.ON_DELIVERY:
        return (
          <Tag variant={"solid"} colorScheme={"red"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.DELIVERED:
        return (
          <Tag variant={"solid"} colorScheme={"teal"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.RECEIVED:
        return (
          <Tag variant={"solid"} colorScheme={"messenger"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.REFUNDED:
        return (
          <Tag variant={"solid"} colorScheme={"cyan"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.COMPLETED:
        return (
          <Tag variant={"solid"} colorScheme={"green"}>
            {orderStatus.status}
          </Tag>
        );
      case orderStatusses.REFUND_IN_PROGRESS:
        return (
          <Tag variant={"solid"} colorScheme={"orange"}>
            {orderStatus.status}
          </Tag>
        );

      default:
        return <Tag>-</Tag>;
    }
  };

  const textMoreProduct = (ordersDetail: IShopOrderDetailPayload[]): string => {
    const product = ordersDetail
      .map((order) => {
        const variantName =
          order.variant_type_name === "DEFAULT"
            ? ""
            : `(${order.variant_type_name})`;

        return `${order.product_name ?? ""} ${variantName} `;
      })
      .slice(1)
      .join(", ");

    return product;
  };

  const handleNextPage = () => {
    const page = (shopOrders?.current_page ?? 0) + 1;
    fetchAllShopOrders(user?.shop_id ?? 0, props.status, page, 10);
  };

  const handlePrevPage = () => {
    const page = (shopOrders?.current_page ?? 0) - 1;
    fetchAllShopOrders(user?.shop_id ?? 0, props.status, page, 10);
  };

  useEffect(() => {
    fetchAllShopOrders(user?.shop_id ?? 0, props.status, 1, 10);
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant={"striped"}>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Total</Th>
              <Th>Status</Th>
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

            {!isLoading && shopOrders?.data.length === 0 ? (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  Empty Data
                </Td>
              </Tr>
            ) : null}

            {!isLoading &&
              shopOrders?.data.map((order, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Tag m={1} variant={"solid"} colorScheme={"teal"}>
                        {order.order_details[0]?.product_name ?? ""}{" "}
                        {order.order_details[0]?.variant_type_name !== "DEFAULT"
                          ? `(${order.order_details[0]?.variant_type_name})`
                          : ""}
                      </Tag>
                      {order.order_details.length > 1 ? (
                        <Tooltip
                          hasArrow
                          label={textMoreProduct(order.order_details)}
                          bg="gray.300"
                          color="black"
                        >
                          <Tag m={1} variant={"solid"} colorScheme={"gray"}>
                            {order.order_details.length - 1} more product
                          </Tag>
                        </Tooltip>
                      ) : null}
                    </Td>
                    <Td>Rp{formatCurrency(order.total ?? 0)}</Td>
                    <Td>{handleTagStatus(order.order_status)}</Td>
                    <Td textAlign={"center"}>
                      {order.order_status.status === "Waiting for Seller" ? (
                        <Tooltip
                          hasArrow
                          label="Cancel Order"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Cancel Order"
                            bgColor={"red.500"}
                            icon={<BsXCircle />}
                            onClick={() => {
                              setOrderId(order.id);
                              cancelModal.onOpen();
                            }}
                          />
                        </Tooltip>
                      ) : null}

                      {order.order_status.status === "Waiting for Seller" ? (
                        <Tooltip
                          hasArrow
                          label="Procced Order"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Process Order"
                            bgColor={"green.400"}
                            icon={<BsCheckCircle />}
                            onClick={() => {
                              setOrderId(order.id);
                              proccessModal.onOpen();
                            }}
                          />
                        </Tooltip>
                      ) : null}

                      {order.order_status.status === "Processed" ? (
                        <Tooltip
                          hasArrow
                          label="Delivery Order"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Delivery Order"
                            bgColor={"orange"}
                            icon={<BsTruck />}
                            onClick={() => {
                              setOrderId(order.id);
                              deliveryModal.onOpen();
                            }}
                          />
                        </Tooltip>
                      ) : null}

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
                            navigate(routes.SELLER_ORDER_DETAIL(order.id));
                          }}
                        />
                      </Tooltip>

                      {order.order_status.status === "Processed" ? (
                        <Tooltip
                          hasArrow
                          label="Print Delivery Label"
                          bg="gray.300"
                          color="black"
                        >
                          <IconButton
                            mx={1}
                            aria-label="Print Delivery Label"
                            bgColor={"blackAlpha.500"}
                            icon={<BsPrinter />}
                            onClick={() => {
                              navigate(routes.SELLER_ORDER_LABEL(order.id));
                            }}
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
        <Text>Total {shopOrders?.total}</Text>
        <Flex alignItems={"center"}>
          <Button
            isDisabled={shopOrders?.current_page === 1}
            fontWeight={"normal"}
            onClick={() => {
              handlePrevPage();
            }}
          >
            Prev
          </Button>
          <Text px={3}>
            {shopOrders?.current_page} of {shopOrders?.total_page}
          </Text>
          <Button
            isDisabled={
              (shopOrders?.current_page ?? 0) >= (shopOrders?.total_page ?? 0)
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

      <OrderEditModal
        content={
          <Text>
            Are you sure <Tag colorScheme={"green"}>PROCESS</Tag> this order?
          </Text>
        }
        isOpen={proccessModal.isOpen}
        isLoading={isLoading}
        onClose={() => proccessModal.onClose()}
        onConfirm={() => {
          updateShopOrder(user?.shop_id ?? 0, orderId, { status_id: 4 }).then(
            () => {
              fetchAllShopOrders(user?.shop_id ?? 0, props.status, 1, 10);
              proccessModal.onClose();
            }
          );
        }}
      />

      <OrderEditModal
        content={
          <Text>
            Are you sure <Tag colorScheme={"red"}>CANCEL</Tag> this order?
          </Text>
        }
        isOpen={cancelModal.isOpen}
        isLoading={isLoading}
        onClose={() => cancelModal.onClose()}
        onConfirm={() => {
          updateShopOrder(user?.shop_id ?? 0, orderId, { status_id: 3 }).then(
            () => {
              fetchAllShopOrders(user?.shop_id ?? 0, props.status, 1, 10);
              cancelModal.onClose();
            }
          );
        }}
      />

      <OrderEditModal
        content={
          <Text>
            Are you sure change status to{" "}
            <Tag colorScheme={"orange"}>ON DELIVERY</Tag>?
          </Text>
        }
        isOpen={deliveryModal.isOpen}
        isLoading={isLoading}
        onClose={() => deliveryModal.onClose()}
        onConfirm={() => {
          updateShopOrder(user?.shop_id ?? 0, orderId, { status_id: 5 }).then(
            () => {
              fetchAllShopOrders(user?.shop_id ?? 0, props.status, 1, 10);
              deliveryModal.onClose();
            }
          );
        }}
      />
    </>
  );
}

export default OrderTable;
