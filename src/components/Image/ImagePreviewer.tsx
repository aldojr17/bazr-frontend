import { AspectRatio, Box, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { IImagePreviewerProps } from "../../interfaces/Components/PDP";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import ImagePreviewerModal from "../Modal/ImagePreviewerModal";

function ImagePreviewer(props: IImagePreviewerProps) {
  const { data } = props;
  const [selectedImage, setSelectedImage] = useState(data[0]?.url);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <AspectRatio
          ratio={1}
          borderRadius="xl"
          border={"2px solid"}
          borderColor={"lightLighten"}
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
      </Box>

      <ImagePreviewerModal data={data} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ImagePreviewer;
