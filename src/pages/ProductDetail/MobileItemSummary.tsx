import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Heading,
  HStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useOrder from "../../hooks/useOrder";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import { ICartAddUpdateRequestPayload } from "../../interfaces/Cart";
import { IMobileItemSummaryProps } from "../../interfaces/Components/PDP";
import routes from "../../routes/Routes";
import { formatCurrency } from "../../util/util";
import ProductDetailQuantity from "./ProductDetailQuantity";
import ProductDetailVariant from "./ProductDetailVariant";

function MobileItemSummary(props: IMobileItemSummaryProps) {
  const {
    productName,
    productPhoto,
    variantGroup,
    onVariantChange,
    selectedVariant,
    shopId,
    minQty,
    maxQty,
  } = props;

  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getCart, updateCart, setCheckoutCartIds, setCheckoutData } =
    useCart();
  const { createCheckout } = useOrder();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isOwnedProduct, setIsOwnedProduct] = useState<boolean>(false);

  const handleSetQuantity = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (selectedVariant.id === 0) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    } else if (selectedVariant.stock === 0) {
      errorToast("Failed to add item to cart.", "Product is out of stock.");
    } else {
      const cartPayload: ICartAddUpdateRequestPayload = {
        shop_id: shopId,
        variant_type_id: selectedVariant.id,
        quantity: selectedQuantity,
      };

      setIsLoading(true);
      updateCart(cartPayload)
        .then(() => {
          getCart();
          successToast("Item added to cart!");
        })
        .catch((err) => {
          if (err === "Invalid credential") {
            navigate(routes.LOGIN, { state: window.location.pathname });
          } else {
            errorToast("Failed to add item to cart", err);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleBuyNow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (selectedVariant.id === 0) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    } else {
      const cartPayload: ICartAddUpdateRequestPayload = {
        shop_id: shopId,
        variant_type_id: selectedVariant.id,
        quantity: selectedQuantity,
      };

      setIsLoading(true);

      updateCart(cartPayload)
        .then((response) => {
          getCart();
          createCheckout({
            orders: [
              {
                shop_id: shopId,
                order_details: [
                  {
                    cart_id: response?.cart_item_id!,
                  },
                ],
              },
            ],
          }).then((resp) => {
            if (resp.is_success) {
              setCheckoutData(resp.data);
              setCheckoutCartIds([response?.cart_item_id!]);
              navigate(routes.CART_SHIPMENT, { replace: true });
            }
          });
        })
        .catch((err) => {
          if (err === "Invalid credential") {
            navigate(routes.LOGIN, { state: window.location.pathname });
          } else {
            errorToast("Failed to buy now", err);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      onVariantChange({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (user?.is_seller && user.shop_id === shopId) {
      setIsOwnedProduct(true);
    }
  }, []);

  return (
    <>
      {!isOwnedProduct ? (
        <Box
          background={"white"}
          position={"fixed"}
          right={0}
          bottom={0}
          left={0}
          p={3}
          borderTop="2px"
          borderColor={"primary"}
        >
          <HStack width={"100%"} justifyContent={"space-between"}>
            <Button
              w={{ base: "100%", lg: "100%" }}
              variant="primaryOutline"
              my={1}
              onClick={onOpen}
            >
              Add to cart
            </Button>
            <Button
              w={{ base: "100%", lg: "100%" }}
              variant="primary"
              onClick={onOpen}
              my={1}
            >
              Buy now
            </Button>
          </HStack>
        </Box>
      ) : (
        ""
      )}

      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius={"xl"}>
          <DrawerBody px={3} pt={3}>
            <HStack align={"start"} px={3}>
              <AspectRatio
                ratio={1}
                minW={"20%"}
                borderRadius="xl"
                border={"2px solid"}
                borderColor={"lightLighten"}
                backgroundColor={"white"}
              >
                <Image
                  src={productPhoto}
                  fallbackSrc={"./image-fallback.png"}
                  borderRadius="xl"
                />
              </AspectRatio>
              <Box>
                <Heading fontSize={"md"} mb={{ base: 0, lg: 3 }}>
                  {productName}
                </Heading>
                {selectedVariant.discounted_price! ? (
                  <HStack>
                    <Heading variant={"productOriginalPrice"}>
                      Rp {formatCurrency(selectedVariant.price!)}
                    </Heading>
                    <Heading variant={"productDiscountedPrice"}>
                      Rp {formatCurrency(selectedVariant.discounted_price!)}
                    </Heading>
                  </HStack>
                ) : (
                  <Heading
                    fontSize={{ base: "xl", lg: "3xl" }}
                    fontWeight={"bold"}
                    color={"primary"}
                    textTransform={"none"}
                  >
                    Rp{" "}
                    {selectedVariant.price! > 0
                      ? formatCurrency(selectedVariant.price!)
                      : "-"}
                  </Heading>
                )}
              </Box>
            </HStack>
            <Divider variant={"solidLight"} my={3} />
            <ProductDetailVariant
              variantGroup={variantGroup}
              onVariantChange={onVariantChange}
              error={isError}
            />
            <ProductDetailQuantity
              stock={selectedVariant.id !== 0 ? selectedVariant.stock : null}
              minQty={minQty}
              maxQty={maxQty}
              isVariantSelected={selectedVariant.id !== 0}
              onQuantityChange={handleSetQuantity}
            />
          </DrawerBody>
          <DrawerFooter borderTopWidth={"1px"} p={3}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
              fontWeight={"semibold"}
            >
              <Button
                w={{ base: "100%", lg: "100%" }}
                variant="primaryOutline"
                my={1}
                onClick={(e) => handleAddToCart(e)}
                disabled={selectedVariant.stock === 0}
              >
                Add to cart
              </Button>
              <Button
                w={{ base: "100%", lg: "100%" }}
                variant="primary"
                onClick={(e) => handleBuyNow(e)}
                my={1}
                isLoading={isLoading}
                disabled={selectedVariant.stock === 0}
              >
                Buy now
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileItemSummary;
