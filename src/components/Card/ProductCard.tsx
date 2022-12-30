import { AspectRatio, Box, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import { IProductPayload } from "../../interfaces/Product";
import { formatCurrency } from "../../util/util";

const ProductCard = ({ ...props }: IProductPayload) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/pdp/${props.id}`)}
      maxW={{
        base: "250px",
        sm: "200px",
        md: "100%",
        lg: "100%",
        xl: "100%",
      }}
    >
      <AspectRatio
        ratio={1}
        width={{
          base: "250px",
          sm: "200px",
          md: "100%",
          lg: "100%",
          xl: "100%",
        }}
      >
        <Image src="https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png" />
      </AspectRatio>
      <Stack gap={1}>
        <Text marginTop={5} marginBottom={1} noOfLines={1}>
          {props.name}
        </Text>
        <Flex gap={2}>
          <Icon.Star fill={"orange"} />
          {props.total_review !== 0 ? (props.total_rating / props.total_review).toFixed(2) : 0}
        </Flex>
        <HStack justifyContent={"space-between"}>
          <Text>Rp{formatCurrency(props.lowest_price)}</Text>
          <Text>{props.unit_sold} Sold</Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ProductCard;
