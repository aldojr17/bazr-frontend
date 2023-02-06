import { AspectRatio, Box, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { IImagePreviewerProps } from "../../interfaces/Components/PDP";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import { handleImageOnError } from "../../util/util";
import ImagePreviewerModal from "../Modal/ImagePreviewerModal";
import "./style-image-previewer.css";

function ImagePreviewer(props: IImagePreviewerProps) {
  const { data } = props;

  const [swiperMain, setSwiperMain] = useState<any>(null);
  const [selectedId, setSelectedId] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSetSelectedImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    slideTo(parseInt(e.currentTarget.children[0].id));
    setSelectedId(parseInt(e.currentTarget.children[0].id));
  };

  const slideTo = (index: number) => {
    if (swiperMain) {
      swiperMain.slideTo(index);
    }
  };

  return (
    <>
      <Box>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => setSelectedId(swiper.realIndex)}
          onSwiper={(swiper) => setSwiperMain(swiper)}
          className={"swiper-image-preview"}
        >
          {data.length > 0 ? (
            data.map((productPhoto, index) => (
              <SwiperSlide key={index} id={index.toString()}>
                <AspectRatio ratio={1} onClick={onOpen} cursor={"pointer"}>
                  <Image
                    loading="lazy"
                    borderRadius="30px"
                    src={productPhoto.url}
                    __css={{
                      objectFit: "scale-down !important",
                    }}
                  />
                </AspectRatio>
              </SwiperSlide>
            ))
          ) : (
            <AspectRatio ratio={1}>
              <Image
                loading="lazy"
                borderRadius="30px"
                src={"./image-fallback.png"}
                onError={handleImageOnError}
                __css={{
                  objectFit: "scale-down !important",
                }}
              />
            </AspectRatio>
          )}
        </Swiper>

        <Box display={{ base: "none", lg: "block" }}>
          <XScrollableWrapper showScrollbar={data.length > 3}>
            {data.length > 0 &&
              data.map((productPhoto, index) => (
                <AspectRatio
                  key={productPhoto.id}
                  ratio={1}
                  minW={"25%"}
                  onClick={handleSetSelectedImage}
                  filter="auto"
                  brightness={`${index === selectedId ? "85%" : "100%"}`}
                  borderRadius="xl"
                  boxShadow="default"
                  backgroundColor={"white"}
                  cursor={"pointer"}
                >
                  <Image
                    loading="lazy"
                    id={index.toString()}
                    src={productPhoto.url}
                    borderRadius="xl"
                    border={`${index === selectedId ? "4px" : "none"}`}
                    borderColor={`teal.300`}
                  />
                </AspectRatio>
              ))}
          </XScrollableWrapper>
        </Box>
      </Box>

      <ImagePreviewerModal
        data={data}
        isOpen={isOpen}
        onClose={onClose}
        selectedDefaultId={selectedId}
      />
    </>
  );
}

export default ImagePreviewer;
