import { StarIcon } from "@chakra-ui/icons";
import { Heading, HStack } from "@chakra-ui/react";

interface IProductDetailRatingProps {
  rating: number;
  review: number;
}

function ProductDetailRating(props: IProductDetailRatingProps) {
  const { rating, review } = props;
  return (
    <HStack>
      <StarIcon color="purple.600" boxSize={5} />
      <Heading variant={"productRating"}>{rating}</Heading>
      <Heading variant={"productRating"}>({review})</Heading>
    </HStack>
  );
}

export default ProductDetailRating;
