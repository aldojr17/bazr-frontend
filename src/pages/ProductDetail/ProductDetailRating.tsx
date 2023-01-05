import { Heading, HStack } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { IProductDetailRatingProps } from "../../interfaces/Product";

function ProductDetailRating(props: IProductDetailRatingProps) {
  const { rating, review } = props;
  return (
    <HStack>
      <Icon.Star fill="secondary" boxSize={5} />
      <Heading variant={"productRating"}>{rating}</Heading>
      <Heading variant={"productRating"}>({review})</Heading>
    </HStack>
  );
}

export default ProductDetailRating;
