import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BsPlusCircleDotted } from "react-icons/bs";
import { Link } from "react-router-dom";
import routes from "../../../routes/Routes";
import ProductTable from "./ProductTable";

function ProductDashboard() {
  return (
    <>
      <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"2xl"} fontWeight="bold">
              Product List
            </Text>
            <Button
              leftIcon={<BsPlusCircleDotted />}
              as={Link}
              to={routes.SELLER_PRODUCT_CREATE}
            >
              Add Product
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <ProductTable />
        </CardBody>
      </Card>
    </>
  );
}

export default ProductDashboard;
