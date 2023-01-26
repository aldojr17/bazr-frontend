import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IVoucherCardProps } from "../../interfaces/Components";
import { formatCurrency } from "../../util/util";

const VoucherCard = (props: IVoucherCardProps) => {
  const handleSelectVoucher = () => {
    if (props.isDisabled) {
      return;
    }

    props.setVoucher(props.voucher!);
    props.onClose();
  };

  const handleSelectShopVoucher = () => {
    if (props.isDisabled) {
      return;
    }

    props.selectShopVoucher(
      props.shopVoucher?.shop_id!,
      props.shopVoucher?.id!
    );
    props.onClose();
  };

  return (
    <Card
      border="2px"
      borderColor={"light"}
      borderRadius={"lg"}
      width={"100%"}
      onClick={props.voucher ? handleSelectVoucher : handleSelectShopVoucher}
      opacity={props.isDisabled ? 0.5 : 1}
      cursor={props.isDisabled ? "default" : "pointer"}
    >
      <CardHeader
        bg={"lightLighten"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        fontSize={"md"}
        py={3}
      >
        {props.voucher ? props.voucher.code : props.shopVoucher?.code}
      </CardHeader>
      <CardBody>
        <VStack width={"100%"} alignItems={"start"}>
          <HStack width={"100%"} justifyContent={"space-between"}>
            <Text fontWeight={"semibold"}>
              Disc.{" "}
              <Text as="span" fontSize={"xl"}>
                {props.voucher
                  ? props.voucher.benefit !== 0
                    ? `Rp${formatCurrency(props.voucher.benefit)}`
                    : `${props.voucher.benefit_percentage}%`
                  : props.shopVoucher?.benefit !== 0
                  ? `Rp${formatCurrency(props.shopVoucher?.benefit!)}`
                  : `${props.shopVoucher.benefit_percentage}%`}
              </Text>
            </Text>
            <Text color={"primaryDarken"} fontWeight={"bold"} fontSize={"lg"}>
              {props.voucher ? props.voucher.code : props.shopVoucher?.code}
            </Text>
          </HStack>
          <Text fontSize={"xs"} fontWeight={"semibold"} color={"darkLighten"}>
            {props.voucher
              ? props.voucher.min_purchase !== 0
                ? `Min. Purchase: Rp${formatCurrency(
                    props.voucher.min_purchase
                  )}`
                : "No Min. Purchase"
              : props.shopVoucher?.min_purchase !== 0
              ? `Min. Purchase: Rp${formatCurrency(
                  props.shopVoucher?.min_purchase!
                )}`
              : "No Min. Purchase"}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default VoucherCard;
