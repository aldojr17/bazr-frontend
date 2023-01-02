import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ImagePreviewer from "../../components/Image/ImagePreviewer";
import useCart from "../../hooks/useCart";
import useProduct from "../../hooks/useProduct";
import useTitle from "../../hooks/useTitle";
import { ICartAddUpdateRequestPayload } from "../../interfaces/Cart";
import { IProductPayload } from "../../interfaces/Product";
import { IVariantTypePayload } from "../../interfaces/Variant";
import ProductDetailPricing from "./ProductDetailPricing";
import ProductDetailQuantity from "./ProductDetailQuantity";
import ProductDetailRating from "./ProductDetailRating";
import ProductDetailVariant from "./ProductDetailVariant";

function ProductDetail() {
  const { id } = useParams();

  const { fetchProduct } = useProduct();
  const { updateCart, getCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<IProductPayload | null>(null);
  const [selectedVariantType, setSelectedVariantType] =
    useState<IVariantTypePayload>({
      id: 0,
      name: "",
      price: 0,
      stock: 0,
      variant_group_id: 0,
    });
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useTitle(`${product?.name ? `${product.name} | BAZR` : "BAZR"}`);

  const handleSetSelectedVariantType = (variantType: IVariantTypePayload) => {
    setSelectedVariantType(variantType);
  };

  const handleSetQuantity = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const cartPayload: ICartAddUpdateRequestPayload = {
      shop_id: product?.shop_id!,
      variant_type_id: selectedVariantType.id,
      quantity: selectedQuantity,
    };

    setIsLoading(true);
    updateCart(cartPayload)
      .then(() => getCart())
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProduct(parseInt(id!))
      .then((response) => setProduct(response))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container maxW="container.lg">
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          <BreadCrumb categories={product?.category!} />
          <Flex direction={{ base: "column", lg: "row" }}>
            <Box w={{ base: "100%", lg: "50%" }}>
              {/* <ImagePreviewer data={product?.product_photos ?? []} /> */}
              <ImagePreviewer data={photoDummyData} />
            </Box>
            <Box w={{ base: "100%", lg: "50%" }} px={{ base: 0, lg: 3 }}>
              <ProductDetailRating rating={4.5} review={23} />
              <Heading variant={"productTitle"} mt={2} mb={1}>
                {product?.name}
              </Heading>
              <ProductDetailPricing
                normalPrice={selectedVariantType.price!}
                // discountedPrice={7000}
              />
              <Divider
                variant={"solidPrimary"}
                orientation="horizontal"
                my={10}
                display={{ base: "block", lg: "none" }}
              />
              <ProductDetailVariant
                variantGroup={
                  product?.variant_group! && product.variant_group[0]!
                }
                onVariantChange={handleSetSelectedVariantType}
              />
              <ProductDetailQuantity
                stock={selectedVariantType.stock}
                // minQty={5}
                // maxQty={10}
                onQuantityChange={handleSetQuantity}
              />
              <Flex mt={10} gap={1} direction={{ base: "column", lg: "row" }}>
                <Button
                  w={{ base: "100%", lg: "50%" }}
                  variant="primaryOutline"
                  onClick={(e) => handleAddToCart(e)}
                >
                  Add to Cart
                </Button>
                <Button w={{ base: "100%", lg: "50%" }} variant="primary">
                  Buy Now
                </Button>
              </Flex>
            </Box>
          </Flex>
          <Flex
            background={"blackAlpha.300"}
            my={10}
            px={10}
            py={8}
            borderRadius={"lg"}
            direction={"row"}
            alignItems={"center"}
            gap={5}
          >
            <Avatar size={"lg"} />
            <Heading variant={"productShopName"}>Shop Name</Heading>
          </Flex>
        </>
      )}
    </Container>
  );
}

export default ProductDetail;

const photoDummyData = [
  "https://res.cloudinary.com/dcdexrr4n/image/upload/v1670317984/mppsna4mqr567gep3ec6.png",
  "https://res.cloudinary.com/dk3xvbob3/image/upload/v1668756696/cld-sample-2.jpg",
  "https://res.cloudinary.com/dk3xvbob3/image/upload/v1672059462/download_1_fvwacp.png",
  "https://res.cloudinary.com/dk3xvbob3/image/upload/v1668756672/samples/animals/cat.jpg",
];
