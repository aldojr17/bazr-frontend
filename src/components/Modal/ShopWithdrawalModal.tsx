import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useShop from "../../hooks/useShop";
import useToast from "../../hooks/useToast";
import { IShopWithdrawalModalProps } from "../../interfaces/Components";
import { ICreateShopTransferPayload } from "../../interfaces/Shop";
import { formatCurrency } from "../../util/util";

function ShopWithdrawalModal(props: IShopWithdrawalModalProps) {
  const { transferShopBalance } = useShop();
  const { errorToast, successToast } = useToast();
  const [input, setInput] = useState("");
  const selectionInput = [
    10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
  ];

  const transferAmount = async (input: number) => {
    const payload: ICreateShopTransferPayload = { amount: input };

    const response = await transferShopBalance(payload);

    if (response.is_success) {
      successToast("Balance transfer success");
      props.updateWithdrawal();
      props.onClose();
    } else {
      errorToast("Balance transfer failed", response.message);
      props.onClose();
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      size={{ base: "fill", lg: "4xl" }}
    >
      <ModalOverlay />
      <ModalContent maxH={{ base: "100vh" }}>
        <ModalHeader>Transfer Funds</ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <Grid templateColumns={"repeat(3, 1fr)"} gap={3}>
            {selectionInput.map((val, idx) => {
              return (
                <GridItem bgColor={"gray.100"} key={idx}>
                  <Button
                    value={val}
                    onClick={(e) => setInput(e.currentTarget.value)}
                    width="100%"
                    height={"15vh"}
                    fontSize={{ lg: "3vh", base: "10px", md: "2vh" }}
                    variant="outline"
                  >
                    {"Rp" + formatCurrency(val)}
                  </Button>
                </GridItem>
              );
            })}
          </Grid>
          <Flex
            direction={{ lg: "row", base: "column" }}
            width="100%"
            my={5}
            justifyContent="space-between"
            alignItems={"center"}
            gap={2}
          >
            <Text
              width="50%"
              textAlign={"center"}
              fontWeight={"semibold"}
              fontSize={{ lg: "xl", base: "sm", md: "lg" }}
            >
              Enter a custom amount:
            </Text>
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              fontSize={{ lg: "xl", base: "sm", md: "lg" }}
              border={"2px"}
              borderColor={"gray.400"}
              placeholder="Input"
            />
          </Flex>
          <Center>
            <Button
              colorScheme="blue"
              onClick={() => transferAmount(Number(input))}
              my={3}
              width="50%"
            >
              Withdraw
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ShopWithdrawalModal;
