import { AspectRatio, Image } from "@chakra-ui/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMainCarouselProps } from "../../interfaces/Components";
import "./style.css";

function MainCarousel(props: IMainCarouselProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {content.map((url, index) => (
        <SwiperSlide key={index}>
          <AspectRatio
            ratio={21 / 7}
            borderRadius={{ base: "10px", md: "20px", lg: "30px" }}
            boxShadow="default"
          >
            <Image
              src={url}
              borderRadius={{ base: "10px", md: "20px", lg: "30px" }}
              borderColor={`teal.300`}
            />
          </AspectRatio>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainCarousel;

const content = [
  "https://res.cloudinary.com/dezwzyr2v/image/upload/w_0.5/valentine_yuskda.jpg",
  "https://res.cloudinary.com/dezwzyr2v/image/upload/w_0.5/gratis-ongkir_onrwnu.jpg",
  "https://res.cloudinary.com/dezwzyr2v/image/upload/w_0.5/bank_gz6tqh.png",
];
