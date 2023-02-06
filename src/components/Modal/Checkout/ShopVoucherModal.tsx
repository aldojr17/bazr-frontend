import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IShopVoucherModalProps } from "../../../interfaces/Components/Checkout";
import VoucherCard from "../../Card/VoucherCard";

function ShopVoucherModal(props: IShopVoucherModalProps) {
  const {
    isOpen,
    onClose,
    isLoading,
    vouchers,
    checkoutData,
    onSelectVoucher,
    onSelectShopVoucher,
  } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform={"uppercase"}>Select Voucher</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width={"100%"} gap={3}>
            {isLoading ? (
              <>loading</>
            ) : (
              <>
                {vouchers?.data?.filter(
                  (val) =>
                    checkoutData.cart.find(
                      (value) => val.shop_id === value.shop_id
                    )?.subtotal! > val.min_purchase
                ).length! > 0 && (
                  <VStack width={"100%"}>
                    <Text
                      textAlign={"start"}
                      fontWeight={"bold"}
                      fontSize={"sm"}
                      textTransform={"uppercase"}
                      width="100%"
                    >
                      Available Vouchers
                    </Text>
                    <Divider borderColor={"light"} />
                  </VStack>
                )}

                {vouchers?.data
                  ?.filter(
                    (val) =>
                      checkoutData.cart.find(
                        (value) => val.shop_id === value.shop_id
                      )?.subtotal! > val.min_purchase
                  )
                  .map((voucher) => (
                    <VoucherCard
                      key={voucher.id}
                      shopVoucher={voucher}
                      onSetVoucher={(voucher) => {
                        onSelectVoucher(voucher);
                        onClose();
                      }}
                      onSetShopVoucher={(shopId, voucherId) => {
                        onSelectShopVoucher(shopId, voucherId);
                        onClose();
                      }}
                      isDisabled={false}
                    />
                  ))}

                {vouchers?.data?.filter(
                  (val) =>
                    checkoutData.cart.find(
                      (value) => val.shop_id === value.shop_id
                    )?.subtotal! < val.min_purchase
                ).length! > 0 && (
                  <VStack width={"100%"}>
                    <Text
                      textAlign={"start"}
                      fontWeight={"bold"}
                      fontSize={"sm"}
                      textTransform={"uppercase"}
                      width="100%"
                    >
                      Unavailable Vouchers
                    </Text>
                    <Divider borderColor={"light"} />
                  </VStack>
                )}

                {vouchers?.data
                  ?.filter(
                    (val) =>
                      checkoutData.cart.find(
                        (value) => val.shop_id === value.shop_id
                      )?.subtotal! < val.min_purchase
                  )
                  .map((voucher) => (
                    <VoucherCard
                      key={voucher.id}
                      shopVoucher={voucher}
                      onSetVoucher={(voucher) => {
                        onSelectVoucher(voucher);
                        onClose();
                      }}
                      onSetShopVoucher={(shopId, voucherId) => {
                        onSelectShopVoucher(shopId, voucherId);
                        onClose();
                      }}
                      isDisabled={true}
                    />
                  ))}
              </>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ShopVoucherModal;
