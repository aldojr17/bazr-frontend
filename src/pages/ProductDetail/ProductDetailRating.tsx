import { Center, Divider, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { IProductDetailRatingProps } from "../../interfaces/Components/PDP";

function ProductDetailRating(props: IProductDetailRatingProps) {
  const { rating, review, soldCount } = props;
  return (
    <HStack alignItems={"center"} gap={3}>
      <HStack alignItems={"center"}>
        {rating === 0 ? (
          <Text fontSize={"md"} fontWeight={"semibold"} color={"darkLighten"}>
            No ratings yet
          </Text>
        ) : (
          <>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={"dark"}
              borderBottom={"2px solid"}
              borderColor={"secondary"}
            >
              {rating}
            </Text>
            <Flex direction={"row"} pb={1} gap={0.5} alignItems={"center"}>
              {[...Array(Math.round(rating))].map((_, index) => (
                <Icon.Star key={`starFilled-${index}`} fill={"yellow.200"} />
              ))}
              {[...Array(5 - Math.round(rating))].map((_, index) => (
                <Icon.Star key={`star-${index}`} fill={"light"} />
              ))}
            </Flex>
          </>
        )}
      </HStack>

      <Center display={{ base: "none", lg: "block" }} height="25px">
        <Divider
          orientation="vertical"
          borderWidth={"1px"}
          borderColor={"light"}
          bgColor={"light"}
        />
      </Center>

      <HStack alignItems={"center"}>
        {review === 0 ? (
          <Text fontSize={"md"} fontWeight={"semibold"} color={"darkLighten"}>
            No reviews yet
          </Text>
        ) : (
          <>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={"dark"}
              borderBottom={"2px solid"}
              borderColor={"secondary"}
            >
              {review}
            </Text>
            <Text fontSize={"md"} fontWeight={"semibold"} color={"darkLighten"}>
              {review > 1 ? "reviews" : "review"}
            </Text>
          </>
        )}
      </HStack>

      {soldCount > 0 && (
        <>
          <Center display={{ base: "none", lg: "block" }} height="20px">
            <Divider
              orientation="vertical"
              borderWidth={"1px"}
              borderColor={"light"}
              bgColor={"light"}
            />
          </Center>

          <HStack alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={"dark"}
              borderBottom={"2px solid"}
              borderColor={"secondary"}
            >
              {soldCount}
            </Text>
            <Text fontSize={"md"} fontWeight={"semibold"} color={"darkLighten"}>
              sold
            </Text>
          </HStack>
        </>
      )}
    </HStack>
  );
}

export default ProductDetailRating;
