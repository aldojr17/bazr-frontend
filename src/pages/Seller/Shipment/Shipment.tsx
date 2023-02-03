import {
  Card,
  CardBody,
  CardHeader,
  Container,
  HStack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import useShipping from "../../../hooks/useShipping";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";

const Shipment = () => {
  const [couriers, setCouriers] = useState<number[]>([]);
  const { fetchCourierList, updateCourierList } = useShipping();
  const { successToast, errorToast } = useToast();
  const { user } = useUser();

  const handleSelectCourier = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    let newCouriers: number[] = [];

    if (e.currentTarget.checked) {
      newCouriers = [...couriers, id];
    } else {
      newCouriers = couriers.filter((val) => val !== id);
    }

    updateCourierList(newCouriers.join(","))
      .then((resp) => {
        if (resp.is_success) {
          setCouriers(newCouriers);
          successToast("Courier setting updated");
        } else {
          errorToast("Failed to update courier", "Select at least 1 courier");
        }
      })
      .catch((err) => errorToast("Failed to update courier", err.message));
  };

  useEffect(() => {
    fetchCourierList(user?.shop_id!).then((resp) => {
      if (resp.is_success) {
        setCouriers(resp.data[0].couriers.map((val) => val.id));
      }
    });
  }, []);

  return (
    <Container maxW={"container.md"}>
      <Card variant={"outline"} rounded={"xl"} p={5} bgColor={"white"}>
        <CardHeader>
          <Text fontSize={"2xl"} fontWeight="bold">
            Shipping Option Setting
          </Text>
          <Text fontSize={"sm"} fontWeight="semibold" color={"darkLighten"}>
            Select your preferred method(s) to ship your goods.
          </Text>
        </CardHeader>
        <CardBody>
          <VStack alignItems={"start"} width={"100%"} spacing={0}>
            <HStack
              justifyContent={"space-between"}
              width={"100%"}
              border={"2px solid"}
              borderColor={"lightLighten"}
              borderTopLeftRadius={"lg"}
              borderTopRightRadius={"lg"}
              p={3}
              py={5}
            >
              <Text fontWeight={"semibold"} fontSize={"md"}>
                JNE
              </Text>
              <Switch
                colorScheme="default"
                size="lg"
                onChange={(e) => handleSelectCourier(e, 1)}
                isChecked={couriers.includes(1)}
              />
            </HStack>
            <HStack
              justifyContent={"space-between"}
              width={"100%"}
              borderLeft={"2px solid"}
              borderRight={"2px solid"}
              borderColor={"lightLighten"}
              p={3}
              py={5}
            >
              <Text fontWeight={"semibold"} fontSize={"md"}>
                TIKI
              </Text>
              <Switch
                colorScheme="default"
                size="lg"
                onChange={(e) => handleSelectCourier(e, 2)}
                isChecked={couriers.includes(2)}
              />
            </HStack>
            <HStack
              justifyContent={"space-between"}
              width={"100%"}
              border={"2px solid"}
              borderColor={"lightLighten"}
              borderBottomLeftRadius={"lg"}
              borderBottomRightRadius={"lg"}
              p={3}
              py={5}
            >
              <Text fontWeight={"semibold"} fontSize={"md"}>
                POS INDONESIA
              </Text>
              <Switch
                colorScheme="default"
                size="lg"
                onChange={(e) => handleSelectCourier(e, 3)}
                isChecked={couriers.includes(3)}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Shipment;
