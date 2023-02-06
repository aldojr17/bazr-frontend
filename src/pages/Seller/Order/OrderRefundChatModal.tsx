import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Chatbox from "../../../components/Chatbox/Chatbox";
import { IChatModalProps } from "../../../interfaces/Components";

function OrderRefundChatModal(props: IChatModalProps) {
  const {
    config,
    refundId,
    buyerId,
    buyerName,
    sellerId,
    sellerName,
    chats,
    lastUpdated,
    isOpen,
    onClose,
    isLoading,
  } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent rounded={"lg"}>
          <ModalHeader>Chat with Buyer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            {isLoading ? (
              <>Loading</>
            ) : (
              <Chatbox
                hostId={config === "seller" ? sellerId : buyerId}
                visitorName={config === "seller" ? buyerName : sellerName}
                chats={chats}
                refundId={refundId}
                lastUpdated={lastUpdated}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderRefundChatModal;
