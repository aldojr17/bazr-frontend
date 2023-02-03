import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
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
import ShopWithdrawalModal from "../../../components/Modal/ShopWithdrawalModal";
import useShop from "../../../hooks/useShop";
import { IShopWithdrawal } from "../../../interfaces/Shop";
import { formatCurrency } from "../../../util/util";
import dayjs from "dayjs";

function Finance() {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchShopWithdrawal } = useShop();
  const [withdrawalActivity, setWithdawalActivity] = useState<
    IShopWithdrawal[]
  >([]);
  const [bal, setBal] = useState(0);

  const updateWithdrawal = async () => {
    const response = await fetchShopWithdrawal();
    setBal(response.data.balance);
    setWithdawalActivity(response.data.withdrawal_details);
  };

  useEffect(() => {
    updateWithdrawal();
  }, []);

  return (
    <>
      <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
        <CardHeader>
          <Flex justifyContent={{ base: "center", lg: "start" }} width="100%">
            <Text
              fontSize={"2xl"}
              fontWeight="bold"
              textAlign={{ base: "center" }}
            >
              Finance Dashboard
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex justifyContent={"center"} width="100%">
            <Flex
              direction={{ base: "column", lg: "row" }}
              width={{ base: "100%", lg: "85%" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgColor={"gray.100"}
              p={{ lg: 10, base: 3 }}
              border={"2px"}
              borderRadius={"15px"}
              borderColor={"gray.300"}
              gap={8}
            >
              <Text
                fontSize={"2xl"}
                textAlign={{ base: "center" }}
                fontWeight="medium"
              >
                Shop Balance
              </Text>
              <Text fontSize={"2xl"} fontWeight="semibold">
                {"Rp" + formatCurrency(bal)}
              </Text>
              <Button onClick={onOpen}>Withdraw</Button>
            </Flex>
          </Flex>
          <Flex width="100%" my={10} direction={"column"} alignItems="start">
            <Text
              fontSize={"2xl"}
              fontWeight="bold"
              textAlign={{ base: "center" }}
            >
              Shop Withdrawal Activity
            </Text>
            <Flex width="100%" justifyContent={"center"}>
              <TableContainer
                width={{ base: "100%", lg: "85%" }}
                border={"2px"}
                borderRadius={"15px"}
                borderColor={"gray.300"}
                mt={10}
              >
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Amount</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {withdrawalActivity.map((data, idx) => {
                      return (
                        <Tr key={idx}>
                          <Td>{"Rp" + formatCurrency(data.amount)}</Td>
                          <Td>{dayjs(data.withdrawal_date).format("L")}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <ShopWithdrawalModal
        isOpen={isOpen}
        onClose={onClose}
        updateWithdrawal={updateWithdrawal}
      />
    </>
  );
}

export default Finance;
