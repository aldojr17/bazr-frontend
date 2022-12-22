import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import Icon from "../../assets/icons";
import CategoryCard from "../../components/Card/CategoryCard";
import ProductCard from "../../components/Card/ProductCard";
import { CarouselItemIndex, CategoryWrapper } from "./style";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <Box position={"relative"}>
        <Image
          src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1671437229/Screenshot_from_2022-12-19_15-06-59_febmvz.png"
          width={"100%"}
        />
        <Center className="d-flex d-lg-none">
          <HStack position={"absolute"} bottom={3}>
            <Button
              size={"xs"}
              variant={activeIndex === 1 ? "carousel" : "secondary"}
              onClick={() => setActiveIndex(1)}
            />
            <Button
              size={"xs"}
              variant={activeIndex === 2 ? "carousel" : "secondary"}
              onClick={() => setActiveIndex(2)}
            />
            <Button
              size={"xs"}
              variant={activeIndex === 3 ? "carousel" : "secondary"}
              onClick={() => setActiveIndex(3)}
            />
            <Button
              size={"xs"}
              variant={activeIndex === 4 ? "carousel" : "secondary"}
              onClick={() => setActiveIndex(4)}
            />
          </HStack>
        </Center>
      </Box>

      <SimpleGrid columns={2} spacing={10} className="d-none d-lg-grid">
        <Box
          height="120px"
          className="d-flex justify-content-between align-items-center px-5"
        >
          <HStack justifyContent={"space-between"} width={"100%"}>
            <Box>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setActiveIndex((index) => (index - 1 > 0 ? index - 1 : 4))
                }
              >
                <Icon.Arrow left size={24} />
              </Button>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setActiveIndex((index) => (index + 1 < 5 ? index + 1 : 1))
                }
              >
                <Icon.Arrow left={false} size={24} />
              </Button>
            </Box>
            <HStack spacing={5}>
              <Text>01</Text>
              <CarouselItemIndex
                className="rounded"
                active={activeIndex === 1}
              />
              <CarouselItemIndex
                className="rounded"
                active={activeIndex === 2}
              />
              <CarouselItemIndex
                className="rounded"
                active={activeIndex === 3}
              />
              <CarouselItemIndex
                className="rounded"
                active={activeIndex === 4}
              />
              <Text>04</Text>
            </HStack>
          </HStack>
        </Box>
        <Box bg="secondary">
          <HStack>
            <Box height={"120px"}>
              <Image
                src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1671437229/Screenshot_from_2022-12-19_15-06-59_febmvz.png"
                height={"100%"}
                padding={0}
              />
            </Box>
            <VStack align={"start"} paddingLeft={10}>
              <Text>Next</Text>
              <Text color={"white"} fontSize={24}>
                Interior Design
              </Text>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      <Box className="p-4 pb-5 p-lg-5">
        <Heading
          fontWeight={"medium"}
          size={{ sm: "sm", md: "md", lg: "lg" }}
          className="pb-4"
        >
          Category
        </Heading>
        <CategoryWrapper>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </CategoryWrapper>
      </Box>

      <Box className="px-4 px-lg-5">
        <Heading
          fontWeight={"medium"}
          className="pb-4"
          size={{ sm: "sm", md: "md", lg: "lg" }}
        >
          Recommended
        </Heading>
        <Wrap spacing={10} justify={{ base: "center", lg: "start" }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Wrap>
        <Center className="py-5">
          <Button borderRadius={"base"}>See All Products</Button>
        </Center>
      </Box>
    </>
  );
};

export default Home;
