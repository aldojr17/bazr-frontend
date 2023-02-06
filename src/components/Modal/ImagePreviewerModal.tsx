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
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { IImagePreviewerModalProps } from "../../interfaces/Components/PDP";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import "../Image/style-image-previewer.css";

function ImagePreviewerModal(props: IImagePreviewerModalProps) {
  const { data, isOpen, onClose, selectedDefaultId } = props;

  const [swiperMain, setSwiperMain] = useState<any>(null);
  const [selectedId, setSelectedId] = useState(selectedDefaultId);

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

  useEffect(() => {
    if (isOpen) {
      slideTo(selectedDefaultId);
      setSelectedId(selectedDefaultId);
    }
  }, [swiperMain, selectedDefaultId]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={"transparent"} boxShadow="none">
          <ModalHeader></ModalHeader>
          <ModalCloseButton color={"white"} size={"xl"} />
          <ModalBody>
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
              {data.map((productPhoto, index) => (
                <SwiperSlide key={index} id={index.toString()}>
                  <AspectRatio ratio={1} backgroundColor={"white"}>
                    <Image
                      loading="lazy"
                      src={productPhoto.url}
                      __css={{
                        objectFit: "scale-down !important",
                      }}
                    />
                  </AspectRatio>
                </SwiperSlide>
              ))}
            </Swiper>

            <XScrollableWrapper showScrollbar={data.length > 3}>
              {data.map((productPhoto, index) => (
                <AspectRatio
                  key={index}
                  ratio={1}
                  minW="25%"
                  onClick={handleSetSelectedImage}
                  filter="auto"
                  brightness={`${index === selectedId ? "85%" : "100%"}`}
                  borderRadius="xl"
                  boxShadow="default"
                  backgroundColor={"white"}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImagePreviewerModal;
