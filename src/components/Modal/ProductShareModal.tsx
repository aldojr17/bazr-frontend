import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Icon from "../../assets/icons";
import useToast from "../../hooks/useToast";
import { IProductShareModalProps } from "../../interfaces/Components";

function ProductShareModal(props: IProductShareModalProps) {
  const { isOpen, onClose } = props;

  const { successToast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(window.location.href);
    successToast("Copied link to clipboard!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={"xl"}>
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          <Flex direction={"column"}>
            <Flex direction={"row"} justifyContent={"space-around"} mb={5}>
              <EmailShareButton
                url={window.location.href}
                subject={"BaZR - Check this out!"}
                body={`Hi! Check out this product: ${window.location.href}`}
              >
                <EmailIcon
                  round
                  bgStyle={{ fill: "#E2E8F0" }}
                  iconFillColor={"#4FD1C5"}
                />
                <Text fontWeight={"semibold"} my={2}>
                  Email
                </Text>
              </EmailShareButton>
              <FacebookShareButton
                url={window.location.href}
                quote={"Hi! Checkout this produt:"}
              >
                <FacebookIcon
                  round
                  bgStyle={{ fill: "#E2E8F0" }}
                  iconFillColor={"#4FD1C5"}
                />
                <Text fontWeight={"semibold"} my={2}>
                  Facebook
                </Text>
              </FacebookShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={"Hi! Check this out:"}
              >
                <TwitterIcon
                  round
                  bgStyle={{ fill: "#E2E8F0" }}
                  iconFillColor={"#4FD1C5"}
                />
                <Text fontWeight={"semibold"} my={2}>
                  Twitter
                </Text>
              </TwitterShareButton>
            </Flex>
            <Heading fontSize={"md"} mb={3}>
              Product Link
            </Heading>
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              backgroundColor={"lightLighten"}
              borderRadius={"xl"}
              p={3}
            >
              <Text color={"darkLighten"} fontSize={"sm"} noOfLines={1}>
                {window.location.href}
              </Text>
              <Button onClick={handleCopyCode} variant={"unstyled"}>
                <Icon.Copy />
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProductShareModal;
