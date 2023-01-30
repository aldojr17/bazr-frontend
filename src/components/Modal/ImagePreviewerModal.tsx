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
import { useEffect, useState } from "react";
import { IImagePreviewerModalProps } from "../../interfaces/Components/PDP";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";

function ImagePreviewerModal(props: IImagePreviewerModalProps) {
  const { data, isOpen, onClose, selectedId } = props;

  const [selectedImage, setSelectedImage] = useState(data[0]);

  const handleSetSelectedImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    let image = data.find(
      (img) => img.id === parseInt(e.currentTarget.children[0].id)
    );

    setSelectedImage(image ?? data[0]);
  };

  useEffect(() => {
    const image = data.find((img) => img.id === selectedId);

    setSelectedImage(image ?? data[0]);
  }, [selectedId]);

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
                src={selectedImage.url}
                __css={{
                  objectFit: "scale-down !important",
                }}
              />
            </AspectRatio>
            <XScrollableWrapper showScrollbar={data.length > 3}>
              {data.map((productPhoto, index) => (
                <AspectRatio
                  key={index}
                  ratio={1}
                  minW="25%"
                  onClick={handleSetSelectedImage}
                  filter="auto"
                  brightness={`${
                    productPhoto.id === selectedImage.id ? "85%" : "100%"
                  }`}
                  borderRadius="xl"
                  boxShadow="default"
                  backgroundColor={"white"}
                >
                  <Image
                    id={productPhoto.id.toString()}
                    src={productPhoto.url}
                    borderRadius="xl"
                    border={`${
                      productPhoto.id === selectedImage.id ? "4px" : "none"
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
