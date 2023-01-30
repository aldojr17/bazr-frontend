import { Box, Container, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ImagePreviewer from "../../components/Image/ImagePreviewer";
import useProduct from "../../hooks/useProduct";
import useTitle from "../../hooks/useTitle";
import { IProductPayload } from "../../interfaces/Product";
import { IVariantTypePayload } from "../../interfaces/Variant";
import { formatTitle } from "../../util/util";
import Detail from "./Detail";
import ItemSummary from "./ItemSummary";
import Review from "./Review";
import SimilarProductList from "./SimilarProductList";
import StoreProductList from "./StoreProductList";

function ProductDetail() {
  const { id } = useParams();

  const { fetchProduct } = useProduct();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<IProductPayload | null>(null);
  const [selectedVariantType, setSelectedVariantType] =
    useState<IVariantTypePayload>({
      id: 0,
      name: "",
      price: 0,
      stock: 0,
    });

  useTitle(formatTitle(product?.name!));

  const handleSetSelectedVariantType = (variantType: IVariantTypePayload) => {
    setSelectedVariantType(variantType);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProduct(parseInt(id!))
      .then((response) => setProduct(response))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <Container maxW="container.xl">
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          <BreadCrumb categories={product?.category_detail!} />
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={8}
            position={"relative"}
            mb={20}
          >
            <Flex w={{ base: "100%", lg: "75%" }} direction={"column"}>
              <Flex
                w={"100%"}
                direction={{ base: "column", lg: "row" }}
                gap={5}
                justifyContent={"space-between"}
                position={"relative"}
              >
                <Box
                  w={{ base: "100%", lg: "40%" }}
                  height={"fit-content"}
                  position={{ base: "static", lg: "sticky" }}
                  top={{ base: 0, lg: 32 }}
                >
                  <ImagePreviewer data={product?.product_photos ?? []} />
                </Box>
                <Box w={{ base: "100%", lg: "60%" }} px={{ base: 0, lg: 3 }}>
                  <Detail
                    productName={product?.name!}
                    productMinPrice={product?.lowest_price!}
                    productMaxPrice={product?.highest_price!}
                    productRating={product?.rating!}
                    productReview={product?.total_review!}
                    productView={product?.view_count!}
                    productSoldCount={product?.unit_sold!}
                    productDescription={product?.description!}
                    shopId={product?.shop?.id!}
                    selectedVariant={selectedVariantType}
                  />
                </Box>
              </Flex>
              <Review
                productId={product?.id!}
                productRating={product?.rating!}
              />
            </Flex>
            <Box
              w={{ base: "100%", lg: "25%" }}
              height={"fit-content"}
              position={"sticky"}
              top={32}
            >
              <ItemSummary
                productId={product?.id!}
                productName={product?.name!}
                productIsFavorite={product?.is_favorite!}
                productFavoriteCount={product?.favorite_count!}
                variantGroup={product?.variant_group!}
                onVariantChange={handleSetSelectedVariantType}
                selectedVariant={selectedVariantType}
                shopId={product?.shop?.id!}
                shopName={product?.shop?.name!}
                minQty={product?.min_buy_qty!}
                maxQty={product?.max_buy_qty!}
              />
            </Box>
          </Flex>
          <StoreProductList
            shopId={product?.shop?.id!}
            shopName={product?.shop?.name!}
            shopUsername={product?.shop?.username!}
          />
          <SimilarProductList
            productCategoryId={product?.category_detail?.primary_category?.id!}
            productCategoryLevel={1}
          />
        </>
      )}
    </Container>
  );
}

export default ProductDetail;
