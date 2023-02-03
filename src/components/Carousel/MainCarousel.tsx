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
  "https://res.cloudinary.com/dk3xvbob3/image/upload/v1672978311/BAZR/DB/Carousel/Blog_Banner-Tokopedia-Fair_ofk48c.jpg",
  "https://res.cloudinary.com/dk3xvbob3/image/upload/v1672978322/BAZR/DB/Carousel/06df6f5e-6477-4f0f-a194-21569793e17d_jn6c8q.png",
  "https://res.cloudinary.com/dk3xvbob3/image/upload/v1672973337/BAZR/DB/Carousel/f09b50a8-da23-45de-a931-f2a433e8276a.jpg_aca4iy.jpg",
];
