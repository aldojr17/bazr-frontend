import {
  Button,
  Center,
  Divider,
  HStack,
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

  const [isFavorited, setIsFavorited] = useState(isFavorite);

  const handleFavoriteProduct = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUserFavoriteProduct({ product_id: productId }).catch((err) => {
      if (err === "Invalid credential") {
        navigate(routes.LOGIN, { state: window.location.pathname });
      } else {
        errorToast("Failed to add item to favorite", err);
      }
    });
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Button
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
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          Favorite
          <Text color={"darkLighten"} ms={1}>
            ({favoriteCount})
          </Text>
        </Button>
        <Center display={{ base: "none", lg: "block" }} height="25px">
          <Divider
            orientation="vertical"
            borderWidth={"1px"}
            borderColor={"light"}
            bgColor={"light"}
          />
        </Center>
        <Button
          leftIcon={<Icon.Share fill={"primary"} />}
          variant="primaryGhost"
          size={"sm"}
          py={5}
          onClick={onOpen}
        >
          Share
        </Button>
      </HStack>
      <ProductShareModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default ProductAction;
