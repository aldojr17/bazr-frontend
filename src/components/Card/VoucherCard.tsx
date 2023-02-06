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
  const { voucher, shopVoucher, onSetVoucher, onSetShopVoucher, isDisabled } =
    props;

  const handleSelectVoucher = () => {
    if (!isDisabled) {
      onSetVoucher(voucher!);
    }
  };

  const handleSelectShopVoucher = () => {
    if (!isDisabled) {
      onSetShopVoucher(shopVoucher?.shop_id!, shopVoucher?.id!);
    }
  };

  return (
    <Card
      border="2px"
      borderColor={"light"}
      borderRadius={"lg"}
      width={"100%"}
      onClick={voucher ? handleSelectVoucher : handleSelectShopVoucher}
      opacity={isDisabled ? 0.5 : 1}
      cursor={isDisabled ? "default" : "pointer"}
    >
      <CardHeader
        bg={"lightLighten"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        fontSize={"md"}
        py={3}
      >
        {voucher ? voucher.code : shopVoucher?.code}
      </CardHeader>
      <CardBody>
        <VStack width={"100%"} alignItems={"start"}>
          <HStack width={"100%"} justifyContent={"space-between"}>
            <Text fontWeight={"semibold"}>
              Disc.{" "}
              <Text as="span" fontSize={"xl"}>
                {voucher
                  ? voucher.benefit !== 0
                    ? `Rp${formatCurrency(voucher.benefit)}`
                    : `${voucher.benefit_percentage}%`
                  : shopVoucher?.benefit !== 0
                  ? `Rp${formatCurrency(shopVoucher?.benefit!)}`
                  : `${shopVoucher.benefit_percentage}%`}
              </Text>
            </Text>
            <Text color={"primaryDarken"} fontWeight={"bold"} fontSize={"lg"}>
              {voucher ? voucher.code : shopVoucher?.code}
            </Text>
          </HStack>
          <Text fontSize={"xs"} fontWeight={"semibold"} color={"darkLighten"}>
            {voucher
              ? voucher.min_purchase !== 0
                ? `Min. Purchase: Rp${formatCurrency(voucher.min_purchase)}`
                : "No Min. Purchase"
              : shopVoucher?.min_purchase !== 0
              ? `Min. Purchase: Rp${formatCurrency(shopVoucher?.min_purchase!)}`
              : "No Min. Purchase"}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default VoucherCard;
