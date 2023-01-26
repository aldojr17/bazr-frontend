import { AspectRatio, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { IProductListItemProps } from "../../interfaces/Components";
import { formatCurrency } from "../../util/util";

const ProductListItem = (props: IProductListItemProps) => {
  return (
    <HStack alignItems={"start"} gap={3} width={"100%"}>
      <AspectRatio
        ratio={1}
        width={{
          base: "2em",
          sm: "2em",
          md: "3em",
          lg: "3em",
          xl: "4em",
        }}
        borderRadius={"lg"}
      >
        <Image
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
          borderRadius={"lg"}
        />
      </AspectRatio>
      <VStack alignItems={"flex-start"} width="40%" spacing={1}>
        <Text
          textTransform={"uppercase"}
          fontWeight={"bold"}
          onClick={props.onClick}
        >
          {props.name}
        </Text>
        <Text fontWeight={"semibold"} fontSize={"xs"} color={"gray.500"}>
          {props.variant_name} - {props.qty} item(s)
        </Text>
        <Text color={"darkDarken"} fontSize={"sm"} fontWeight={"bold"}>
          Rp
          {formatCurrency(props.total)}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ProductListItem;
