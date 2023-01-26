import { Box, Button, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import {
  ICartAddUpdateRequestPayload,
  ICartPayload,
} from "../../interfaces/Cart";
import { IItemSummaryProps } from "../../interfaces/Components/PDP";
import routes from "../../routes/Routes";
import ProductAction from "./ProductAction";
import ProductDetailQuantity from "./ProductDetailQuantity";
import ProductDetailVariant from "./ProductDetailVariant";

function ItemSummary(props: IItemSummaryProps) {
  const {
    productId,
    productName,
    productIsFavorite,
    productFavoriteCount,
    variantGroup,
    onVariantChange,
    selectedVariant,
    shopId,
    shopName,
    minQty,
    maxQty,
  } = props;

  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const { getCart, setCheckoutCart, updateCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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
    } else {
      const cartPayload: ICartAddUpdateRequestPayload = {
        shop_id: shopId,
        variant_type_id: selectedVariant.id,
        quantity: selectedQuantity,
      };

      setIsLoading(true);
      updateCart(cartPayload)
        .then(() => getCart())
        .catch((err) => {
          if (err === "Invalid credential") {
            navigate(routes.LOGIN, { state: window.location.pathname });
          } else {
            errorToast("Failed to add item to cart", err);
          }
        })
        .finally(() => {
          setIsLoading(false);
          successToast("Item added to cart!");
        });
    }
  };

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

          const cartItem: ICartPayload = {
            product_id: productId,
            product_name: productName,
            variant_type_id: selectedVariant.id,
            variant_type_name: selectedVariant.name,
            variant_type_price: selectedVariant.price,
            quantity: selectedQuantity,
            shop_name: shopName,
            shop_id: shopId,
            cart_id: response?.cart_item_id!,
          };

          setCheckoutCart([cartItem]);
          navigate(routes.CART_SHIPMENT);
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

  return (
    <Box
      border={"2px solid"}
      borderColor={"lightLighten"}
      boxShadow={"default"}
      borderRadius={"xl"}
      p={3}
    >
      <ProductDetailVariant
        variantGroup={variantGroup}
        onVariantChange={onVariantChange}
        error={isError}
      />
      <ProductDetailQuantity
        stock={selectedVariant.id !== 0 ? selectedVariant.stock : null}
        minQty={minQty}
        maxQty={maxQty}
        onQuantityChange={handleSetQuantity}
      />
      <Button
        w={{ base: "100%", lg: "100%" }}
        variant="primaryOutline"
        onClick={(e) => handleAddToCart(e)}
        my={1}
        isLoading={isLoading}
      >
        Add to Cart
      </Button>
      <Button
        w={{ base: "100%", lg: "100%" }}
        variant="primary"
        my={1}
        onClick={(e) => handleBuyNow(e)}
      >
        Buy Now
      </Button>
      <Divider variant={"solidLight"} my={5} />
      <ProductAction
        productId={productId}
        isFavorite={productIsFavorite}
        favoriteCount={productFavoriteCount}
      />
    </Box>
  );
}

export default ItemSummary;
