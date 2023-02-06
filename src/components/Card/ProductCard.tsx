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
      border={"2px solid"}
      borderColor={"light"}
      borderRadius={"lg"}
      boxShadow={"default"}
    >
      <AspectRatio ratio={1} objectFit={"cover"} borderRadius={"lg"}>
        <Image
          loading="lazy"
          src={props.product_photo?.url}
          borderRadius={"lg"}
          onError={handleImageOnError}
        />
      </AspectRatio>
      <Flex p={3} direction={"column"}>
        <Text
          fontSize={{ base: "md", lg: "lg" }}
          fontWeight={"semibold"}
          textTransform={"uppercase"}
          noOfLines={1}
        >
          {props.name}
        </Text>
        <Text
          fontSize={{ base: "lg", lg: "xl" }}
          fontWeight={"bold"}
          color={"primary"}
          mb={1}
          noOfLines={1}
          wordBreak={"break-all"}
        >
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
          <Icon.Star fill={"yellow.200"} boxSize={{ base: 3, lg: 4 }} />
          {props.rating! > 0 ? (
            <Text
              fontSize={{ base: "xs", lg: "sm" }}
              fontWeight={"semibold"}
              color={"dark"}
            >
              {props.rating}
            </Text>
          ) : (
            <Text
              fontSize={{ base: "xs", lg: "sm" }}
              fontWeight={"semibold"}
              color={"dark"}
            >
              -
            </Text>
          )}
          {props.unit_sold! > 0 && (
            <>
              <Center height={{ base: "10px", lg: "12px" }}>
                <Divider
                  orientation="vertical"
                  borderWidth={1}
                  borderColor={"lightDarken"}
                />
              </Center>
              <Text
                fontSize={{ base: "xs", lg: "sm" }}
                fontWeight={"semibold"}
                color={"darkLighten"}
                noOfLines={1}
              >
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
