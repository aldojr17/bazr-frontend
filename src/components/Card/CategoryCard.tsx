import { AspectRatio, Flex, Image, Text } from "@chakra-ui/react";
import { ICategoryCardProps } from "../../interfaces/Category";
import { handleImageOnError } from "../../util/util";

const CategoryCard = ({ ...props }: ICategoryCardProps) => {
  return (
    <Flex
      role="button"
      onClick={props.onClick}
      direction={{ base: "row", lg: "column" }}
      flexShrink={0}
      w={{
        base: "200px",
        lg: "125px",
      }}
      h={{
        base: "50px",
        lg: "auto",
      }}
      border={"2px solid"}
      borderColor={"light"}
      borderRadius={"lg"}
      boxShadow={"default"}
    >
      <AspectRatio
        ratio={1}
        flexShrink={0}
        width={{ base: "25%", lg: "100%" }}
        height={{ base: "100%", lg: "auto" }}
        borderRadius={"lg"}
      >
        <Image
          src={props.icon}
          borderRadius={"lg"}
          onError={handleImageOnError}
        />
      </AspectRatio>
      <Text
        align={"center"}
        variant={"productCardTitle"}
        mx={2}
        my={3}
        noOfLines={{ base: 1, lg: 2 }}
      >
        {props.name}
      </Text>
    </Flex>
  );
};

export default CategoryCard;
