import { AspectRatio, Box, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { IImagePreviewerProps } from "../../interfaces/Components/PDP";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import ImagePreviewerModal from "../Modal/ImagePreviewerModal";

function ImagePreviewer(props: IImagePreviewerProps) {
  const { data } = props;

  const [selectedImage, setSelectedImage] = useState(data[0]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSetSelectedImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    let image = data.find(
      (img) => img.id === parseInt(e.currentTarget.children[0].id)
    );

    setSelectedImage(image ?? data[0]);
  };

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
            src={selectedImage.url}
            __css={{
              objectFit: "scale-down !important",
            }}
          />
        </AspectRatio>

        <XScrollableWrapper showScrollbar={data.length > 3}>
          {data.map((productPhoto) => (
            <AspectRatio
              key={productPhoto.id}
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
      </Box>

      <ImagePreviewerModal
        data={data}
        isOpen={isOpen}
        onClose={onClose}
        selectedId={selectedImage.id}
      />
    </>
  );
}

export default ImagePreviewer;
