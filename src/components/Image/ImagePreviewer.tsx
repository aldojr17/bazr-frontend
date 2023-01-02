import {
  AspectRatio,
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";

interface IImagePreviewerProps {
  data: string[];
}

function ImagePreviewer(props: IImagePreviewerProps) {
  const { data } = props;
  const [selectedImage, setSelectedImage] = useState(data[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={{base: "0", lg: "10"}}>
        <AspectRatio
          ratio={1}
          borderRadius="xl"
          mb={5}
          boxShadow="default"
          onClick={onOpen}
        >
          <Image
            src={selectedImage}
            __css={{
              objectFit: "scale-down !important",
            }}
          />
        </AspectRatio>

        <XScrollableWrapper>
          {data.map((imageURL, index) => (
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
              brightness={`${imageURL === selectedImage ? "85%" : "100%"}`}
              borderRadius="xl"
              boxShadow="default"
            >
              <Image
                src={imageURL}
                borderRadius="xl"
                border={`${imageURL === selectedImage ? "4px" : "none"}`}
                borderColor={`teal.300`}
              />
            </AspectRatio>
          ))}
        </XScrollableWrapper>
      </Box>

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
              {data.map((imageURL, index) => (
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
                  brightness={`${imageURL === selectedImage ? "85%" : "100%"}`}
                  borderRadius="xl"
                  boxShadow="default"
                >
                  <Image
                    src={imageURL}
                    borderRadius="xl"
                    border={`${imageURL === selectedImage ? "4px" : "none"}`}
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

export default ImagePreviewer;
