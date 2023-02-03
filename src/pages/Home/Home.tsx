import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import MainCarousel from "../../components/Carousel/MainCarousel";
import CategoryScrollableContainer from "../../components/Container/CategoryScrollableContainer";
import useCategory from "../../hooks/useCategory";
import useTitle from "../../hooks/useTitle";
import useUser from "../../hooks/useUser";
import ProductShowcase from "./ProductShowcase";

const Home = () => {
  useTitle("Home | BAZR");
  const { categories } = useCategory();
  const { fetchProfile } = useUser();

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Container maxW="container.xl">
      <MainCarousel />
      <CategoryScrollableContainer
        categories={categories}
        categoryLevel={"primary"}
      />
      <ProductShowcase />
    </Container>
  );
};

export default Home;
