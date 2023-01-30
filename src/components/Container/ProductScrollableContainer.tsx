import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons";
import { IProductScrollableContainerProps } from "../../interfaces/Components";
import { XScrollableWrapper } from "../../styled/StyledXScrollableWrapper";
import ProductCard from "../Card/ProductCard";

function ProductScrollableContainer(props: IProductScrollableContainerProps) {
  const { label, products, isLoading, onError, link } = props;

  return (
    <Flex direction={{ base: "column", lg: "column" }} my={10}>
      <Flex justifyContent={"space-between"}>
        <Heading
          variant={"sectionHeading"}
          fontSize={{ base: "md", sm: "xl", md: "2xl" }}
        >
          {label}
        </Heading>
        <HStack alignItems={"center"}>
          <Text as={Link} to={link} variant={"link"}>
            see more
            <Icon.ChevronRight width={4} pb={"2px"} />
          </Text>
        </HStack>
      </Flex>
      {onError ? (
        <Box bgColor={"lightLighten"} py={28} borderRadius={"lg"}>
          <Center>
            <VStack>
              <Text>Something has occurred..</Text>
              <Text
                as={Link}
                to={"#"}
                variant={"link"}
                alignItems={"center"}
                fontSize={"lg"}
              >
                <Icon.Refresh width={4} pb={"2px"} me={2} />
                Refresh
              </Text>
            </VStack>
          </Center>
        </Box>
      ) : (
        <Skeleton isLoaded={!isLoading} borderRadius={"lg"}>
          <XScrollableWrapper showScrollbar={products.length > 6}>
            {products.length !== 0
              ? products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              : ""}
          </XScrollableWrapper>
        </Skeleton>
      )}
    </Flex>
  );
}

export default ProductScrollableContainer;
