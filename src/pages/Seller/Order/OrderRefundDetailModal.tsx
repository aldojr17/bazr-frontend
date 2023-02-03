import {
  AspectRatio,
  Button,
  Flex,
  Grid,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import ImagePreviewerModal from "../../../components/Modal/ImagePreviewerModal";
import useRefund from "../../../hooks/useRefund";
import useToast from "../../../hooks/useToast";
import { IRefundDetailModalProps } from "../../../interfaces/Components";
import { XScrollableWrapper } from "../../../styled/StyledXScrollableWrapper";
import { refundStatusses } from "../../../util/constant";
import { formatCurrency } from "../../../util/util";

function OrderRefundDetailModal(props: IRefundDetailModalProps) {
  const { config, refundDetail, isOpen, onClose, isLoading } = props;

  const { successToast, errorToast } = useToast();
  const { approveRefundSeller, rejectRefundSeller } = useRefund();

  const lightboxModal = useDisclosure();

  const [selectedId, setSelectedId] = useState(0);

  const handleSetSelectedImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    setSelectedId(parseInt(e.currentTarget.children[0].id));
    lightboxModal.onOpen();
  };

  const handleApproveRefund = () => {
    approveRefundSeller(refundDetail.id)
      .then((res) => {
        if (res.is_success) {
          successToast("Refund approved!");
        } else {
          errorToast("Failed to approve refund", res.message);
        }
      })
      .catch((err) => errorToast("Failed to approve refund", err))
      .finally(() => onClose());
  };

  const handleRejectRefund = () => {
    rejectRefundSeller(refundDetail.id)
      .then((res) => {
        if (res.is_success) {
          successToast("Refund rejected!");
        } else {
          errorToast("Failed to reject refund", res.message);
        }
      })
      .catch((err) => errorToast("Failed to reject refund", err))
      .finally(() => onClose());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent rounded={"lg"}>
          <ModalHeader>Refund Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <>Loading</>
            ) : (
              <>
                {refundDetail && (
                  <Flex direction={"column"} gap={5}>
                    <Grid templateColumns={"repeat(2, 1fr)"} gap={5}>
                      <Flex direction={"column"}>
                        <HStack>
                          <Text fontWeight={"semibold"} fontSize={"sm"}>
                            Refund ID:
                          </Text>
                          <Text fontWeight={"medium"} fontSize={"sm"}>
                            {refundDetail.id}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontWeight={"semibold"} fontSize={"sm"}>
                            Order ID:
                          </Text>
                          <Text fontWeight={"medium"} fontSize={"sm"}>
                            {refundDetail.order_id}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontWeight={"semibold"} fontSize={"sm"}>
                            Date:
                          </Text>
                          <Text fontWeight={"medium"} fontSize={"sm"}>
                            {dayjs(refundDetail.created_at).format(
                              "HH:mm [ - ] MMMM DD, YYYY"
                            )}
                          </Text>
                        </HStack>
                      </Flex>
                      <Flex direction={"column"}>
                        <HStack>
                          <Text fontWeight={"semibold"} fontSize={"sm"}>
                            Buyer ID:
                          </Text>
                          <Text fontWeight={"medium"} fontSize={"sm"}>
                            {refundDetail.buyer_id}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text
                            fontWeight={"semibold"}
                            fontSize={"sm"}
                            whiteSpace={"nowrap"}
                          >
                            Buyer Name:
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"sm"}
                            noOfLines={1}
                            wordBreak={"break-all"}
                          >
                            {refundDetail.buyer_name}
                          </Text>
                        </HStack>
                      </Flex>
                    </Grid>

                    <Flex direction={"column"}>
                      <HStack>
                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                          Total Amount:
                        </Text>
                        <Text fontWeight={"medium"} fontSize={"sm"}>
                          Rp{formatCurrency(refundDetail.amount)}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                          Payment Method ID:
                        </Text>
                        <Text fontWeight={"medium"} fontSize={"sm"}>
                          {refundDetail.payment_method_id}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                          Status:
                        </Text>
                        <Text fontWeight={"medium"} fontSize={"sm"}>
                          {refundDetail.status_name}
                        </Text>
                      </HStack>
                    </Flex>

                    <Flex direction={"column"} alignItems={"start"}>
                      <Text fontWeight={"semibold"} fontSize={"sm"}>
                        Refund Notes:
                      </Text>
                      <Text fontWeight={"medium"} fontSize={"sm"}>
                        {refundDetail.note}
                        Sample notes from buyer when doing a refund request
                      </Text>
                    </Flex>

                    <Flex direction={"column"} gap={1}>
                      <Text fontWeight={"semibold"} fontSize={"sm"}>
                        Refund Photos:
                      </Text>
                      <XScrollableWrapper showScrollbar={false}>
                        {refundDetail.photos?.length > 0 &&
                          refundDetail.photos.map((photo, index) => (
                            <AspectRatio
                              key={index}
                              ratio={1}
                              minW={"15%"}
                              onClick={handleSetSelectedImage}
                              borderRadius="xl"
                              boxShadow="default"
                              backgroundColor={"white"}
                              cursor={"pointer"}
                            >
                              <Image
                                id={index.toString()}
                                src={photo.url}
                                borderRadius="xl"
                                border={"1px solid"}
                                borderColor={`teal.300`}
                              />
                            </AspectRatio>
                          ))}
                      </XScrollableWrapper>
                    </Flex>
                  </Flex>
                )}
              </>
            )}
          </ModalBody>

          {config === "seller" &&
            refundDetail &&
            refundDetail.status_name !== refundStatusses.APPROVED && (
              <ModalFooter>
                <Flex direction={"row"} justifyContent={"end"} gap={5}>
                  <Button variant="primaryOutline" onClick={handleRejectRefund}>
                    Reject
                  </Button>
                  <Button
                    variant={"primary"}
                    mr={3}
                    onClick={handleApproveRefund}
                  >
                    Approve
                  </Button>
                </Flex>
              </ModalFooter>
            )}
        </ModalContent>
      </Modal>

      <ImagePreviewerModal
        data={refundDetail?.photos ?? []}
        isOpen={lightboxModal.isOpen}
        onClose={lightboxModal.onClose}
        selectedDefaultId={selectedId}
      />
    </>
  );
}

export default OrderRefundDetailModal;
