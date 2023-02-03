import { Card, CardBody, Flex, ListIcon, Text } from "@chakra-ui/react";
import { BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

interface IOrderTrackingProps {
  status: "process" | "complete";
  text: string;
}

function OrderTracking(props: IOrderTrackingProps) {
  return (
    <>
      <Flex flexDirection={"row"} alignItems={"center"}>
        <ListIcon
          as={
            props.status === "complete" ? BsFillCheckCircleFill : BsCircleFill
          }
          boxSize={"30px"}
          color={props.status === "complete" ? "green.500" : "gray"}
          mr={5}
        />
        <Card
          variant={"outline"}
          borderColor={props.status === "complete" ? "green.500" : "gray.300"}
        >
          <CardBody>
            <Text
              textColor={props.status === "complete" ? "green.500" : "gray"}
            >
              {props.text}
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}

export default OrderTracking;
