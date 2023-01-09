import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import { IProductPayload } from "../../interfaces/Product";
import { formatCurrency, handleImageOnError } from "../../util/util";

const ProductCard = ({ ...props }: IProductPayload) => {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      onClick={() =>
        navigate(
          `/pdp/${props.id}/${props.name
            .replace(/[^\w]+/gm, " ")
            .split(" ")
            .join("-")}`
        )
      }
      flexShrink={0}
      w={{
        base: "49%",
        sm: "49%",
        md: "24%",
        lg: "16%",
      }}
      border={"2px solid"}
      borderColor={"light"}
      borderRadius={"lg"}
      boxShadow={"default"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <AspectRatio ratio={1} objectFit={"cover"} borderRadius={"lg"}>
        <Image
          src={props.product_photo?.url}
          borderRadius={"lg"}
          onError={handleImageOnError}
        />
      </AspectRatio>
      <Flex p={3} direction={"column"}>
        <Text variant={"productCardTitle"} noOfLines={1}>
          {props.name}
        </Text>
        <Text
          variant={"productCardPrice"}
          __css={{
            marginTop: 0,
          }}
        >
          Rp {formatCurrency(props.lowest_price)}
        </Text>
        <Flex gap={2} alignItems={"center"} wrap={"nowrap"}>
          <Icon.Shop fill={"secondary"} width={3.5} />
          <Text variant={"productCardRating"} noOfLines={1}>
            {props.shop.shop_name}
          </Text>
          <Center height="15px">
            <Divider orientation="vertical" />
          </Center>
          <Icon.Location fill={"secondary"} width={3.5} />
          <Text variant={"productCardRating"} noOfLines={1}>
            {props.shop.shop_location}
          </Text>
        </Flex>
        <Flex gap={2} alignItems={"center"} mt={5}>
          <Icon.Star fill={"yellow.300"} width={4} />
          {props.rating > 0 ? (
            <>
              <Text variant={"productCardRating"}>{props.rating}</Text>
              <Text variant={"productCardReview"}>({props.total_review})</Text>
            </>
          ) : (
            <Text variant={"productCardRating"}>-</Text>
          )}
          {props.unit_sold > 0 && (
            <>
              <Center height="15px">
                <Divider orientation="vertical" />
              </Center>
              <Text variant={"productCardReview"}>{props.unit_sold} sold</Text>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductCard;
