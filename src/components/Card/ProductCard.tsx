import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import { IProductPayload } from "../../interfaces/Product";
import routes from "../../routes/Routes";
import { formatCurrency, handleImageOnError } from "../../util/util";

const ProductCard = ({ ...props }: IProductPayload) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(routes.PDP(props.id, props.name))}
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
    >
      <AspectRatio ratio={1} objectFit={"cover"} borderRadius={"lg"}>
        <Image
          src={props.product_photo?.url}
          borderRadius={"lg"}
          onError={handleImageOnError}
        />
      </AspectRatio>
      <Flex p={3} direction={"column"}>
        <Text
          fontSize={"xl"}
          fontWeight={"semibold"}
          textTransform={"uppercase"}
          noOfLines={1}
        >
          {props.name}
        </Text>
        <Text variant={"productCardPrice"} mb={1}>
          Rp {formatCurrency(props.lowest_price!)}
        </Text>
        <Flex gap={2} alignItems={"center"} wrap={"nowrap"} mb={1}>
          <Icon.Shop fill={"primaryDarken"} width={3.5} />
          <Text
            fontSize={"xs"}
            fontWeight={"semibold"}
            color={"dark"}
            noOfLines={1}
          >
            {props.shop?.name}
          </Text>
        </Flex>
        <Flex gap={2} alignItems={"center"} wrap={"nowrap"} mb={1}>
          <Icon.Location fill={"primaryDarken"} width={3.5} />
          <Text
            fontSize={"xs"}
            fontWeight={"semibold"}
            color={"dark"}
            noOfLines={1}
          >
            {props.shop?.location}
          </Text>
        </Flex>
        <Flex gap={2} alignItems={"center"} mt={5}>
          <Icon.Star fill={"yellow.200"} width={4} />
          {props.rating! > 0 ? (
            <>
              <Text variant={"productCardRating"}>{props.rating}</Text>
              <Text variant={"productCardReview"}>({props.total_review})</Text>
            </>
          ) : (
            <Text variant={"productCardRating"}>-</Text>
          )}
          {props.unit_sold! > 0 && (
            <>
              <Center height="15px">
                <Divider orientation="vertical" />
              </Center>
              <Text variant={"productCardReview"} noOfLines={1}>
                {props.unit_sold} sold
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductCard;
