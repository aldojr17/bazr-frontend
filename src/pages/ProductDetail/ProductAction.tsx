import {
  Button,
  Center,
  Divider,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons";
import ProductShareModal from "../../components/Modal/ProductShareModal";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import { IProductActionProps } from "../../interfaces/Components/PDP";
import routes from "../../routes/Routes";

function ProductAction(props: IProductActionProps) {
  const { productId, isFavorite, favoriteCount } = props;
  const navigate = useNavigate();
  const { errorToast } = useToast();
  const { setUserFavoriteProduct } = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [favCount, setFavCount] = useState(favoriteCount);
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  const handleFavoriteProduct = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFavorited) {
      setFavCount(favCount - 1);
    } else {
      setFavCount(favCount + 1);
    }
    setIsFavorited(!isFavorited);

    setUserFavoriteProduct({ product_id: productId }).catch((err) => {
      if (err === "Invalid credential") {
        navigate(routes.LOGIN, { state: window.location.pathname });
      } else {
        errorToast("Failed to favorite item", err);

        if (isFavorite) {
          setFavCount(favCount - 1);
        } else {
          setFavCount(favCount + 1);
        }
        setIsFavorited(!isFavorited);
      }
    });
  };

  return (
    <>
      <HStack
        justifyContent={{ base: "end", lg: "space-between" }}
        alignItems={"center"}
        width={{ base: "fit-content", lg: "100%" }}
        gap={{ base: 1, lg: 0 }}
      >
        <Button
          display={{ base: "none", lg: "flex" }}
          leftIcon={
            isFavorited ? (
              <Icon.HeartFilled fill={"secondary"} />
            ) : (
              <Icon.Heart fill={"secondary"} />
            )
          }
          variant="primaryGhost"
          size={"sm"}
          py={5}
          onClick={handleFavoriteProduct}
          flexDirection={"row"}
          alignItems={"center"}
        >
          Favorite
          <Text color={"darkLighten"} ms={1}>
            ({favCount})
          </Text>
        </Button>
        <IconButton
          display={{ base: "block", lg: "none" }}
          variant={"unstyled"}
          aria-label="fav"
          icon={
            isFavorited ? (
              <Icon.HeartFilled fill={"secondary"} boxSize={7} />
            ) : (
              <Icon.Heart fill={"secondary"} boxSize={7} />
            )
          }
          onClick={handleFavoriteProduct}
          __css={{
            marginInlineStart: 0,
          }}
        />
        <Center display={{ base: "none", lg: "block" }} height="25px">
          <Divider
            orientation="vertical"
            borderWidth={"1px"}
            borderColor={"light"}
            bgColor={"light"}
          />
        </Center>
        <Button
          display={{ base: "none", lg: "flex" }}
          leftIcon={<Icon.Share fill={"primary"} />}
          variant="primaryGhost"
          size={"sm"}
          py={5}
          onClick={onOpen}
        >
          Share
        </Button>
        <IconButton
          display={{ base: "block", lg: "none" }}
          variant={"unstyled"}
          aria-label="share"
          icon={<Icon.Share fill={"primary"} boxSize={7} />}
          onClick={onOpen}
          __css={{
            marginInlineStart: 0,
          }}
        />
      </HStack>

      <ProductShareModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ProductAction;
