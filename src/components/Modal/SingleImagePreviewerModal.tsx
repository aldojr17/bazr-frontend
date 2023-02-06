import {
  AspectRatio,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ISingleImagePreviewerModalProps } from "../../interfaces/Components/PDP";
import { handleImageOnError } from "../../util/util";

function SingleImagePreviewerModal(props: ISingleImagePreviewerModalProps) {
  const { imageURL, isOpen, onClose } = props;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} boxShadow="none">
          <ModalHeader></ModalHeader>
          <ModalCloseButton color={"white"} size={"xl"} />
          <ModalBody>
            <AspectRatio
              ratio={1}
              borderRadius="xl"
              mb={5}
              boxShadow="default"
              backgroundColor={"white"}
            >
              <Image
                loading="lazy"
                src={imageURL}
                __css={{
                  objectFit: "scale-down !important",
                }}
                borderRadius="xl"
                onError={handleImageOnError}
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SingleImagePreviewerModal;
