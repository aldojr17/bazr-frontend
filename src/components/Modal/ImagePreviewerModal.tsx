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
import { useState } from "react";
import { IImagePreviewerModalProps } from "../../interfaces/Components/PDP";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";

function ImagePreviewerModal(props: IImagePreviewerModalProps) {
  const { data, isOpen, onClose } = props;
  const [selectedImage, setSelectedImage] = useState(data[0]?.url);

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
                src={selectedImage}
                __css={{
                  objectFit: "scale-down !important",
                }}
              />
            </AspectRatio>
            <XScrollableWrapper>
              {data.map((productPhoto, index) => (
                <AspectRatio
                  key={index}
                  ratio={1}
                  minW="25%"
                  onClick={(e) =>
                    setSelectedImage(
                      (e.currentTarget.children[0] as HTMLImageElement).src
                    )
                  }
                  filter="auto"
                  brightness={`${
                    productPhoto.url === selectedImage ? "85%" : "100%"
                  }`}
                  borderRadius="xl"
                  boxShadow="default"
                >
                  <Image
                    src={productPhoto.url}
                    borderRadius="xl"
                    border={`${
                      productPhoto.url === selectedImage ? "4px" : "none"
                    }`}
                    borderColor={`teal.300`}
                  />
                </AspectRatio>
              ))}
            </XScrollableWrapper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImagePreviewerModal;
