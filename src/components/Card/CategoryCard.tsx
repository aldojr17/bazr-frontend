import { Box, Image, Text } from "@chakra-ui/react";
import { ICategoryCardProps } from "../../interfaces/Category";

const CategoryCard = ({ ...props }: ICategoryCardProps) => {
  return (
    <Box>
      <Image src={props.icon} height={"200px"} minWidth={"150px"} />
      <Text align={"center"} marginTop={5} marginBottom={3} noOfLines={2}>
        {props.name}
      </Text>
    </Box>
  );
};

export default CategoryCard;
