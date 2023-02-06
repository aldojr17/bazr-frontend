import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Input,
  Flex,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import FileInputBtn from "../Input/FileInputBtn";
import { useState } from "react";
import {
  ICreateRefundModalProps,
  ICreateRefundPayload,
} from "../../interfaces/Refund";
import { IProductUploadPhotoPayload } from "../../interfaces/Shop";
import useShop from "../../hooks/useShop";
import useToast from "../../hooks/useToast";
import useRefund from "../../hooks/useRefund";
import useUser from "../../hooks/useUser";

function CreateRefundModal(props: ICreateRefundModalProps) {
  const [imgList, setImgList] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const { uploadProductPhoto } = useShop();
  const { errorToast, successToast } = useToast();
  const { createRefund } = useRefund();
  const { user } = useUser();

  const submitForm = async () => {
    setIsloading(true);
    if (!user?.wallet_detail.is_activated) {
      setIsloading(false);
      errorToast("Please activate your wallet");
      return;
    }

    const refund: ICreateRefundPayload = {
      order_id: Number(props.orderId),
      note: notes,
      photos: [],
    };

    const photoList: IProductUploadPhotoPayload = {
      photos: imgList,
    };

    const photoRes = await uploadProductPhoto(photoList);
    if (!photoRes.is_success) {
      setIsloading(false);
      errorToast(photoRes.message);
      return;
    }

    photoRes.data.urls.forEach((cloudUrl) => {
      refund.photos = [...refund.photos, cloudUrl];
    });

    const response = await createRefund(refund);
    if (!response.is_success) {
      setIsloading(false);
      errorToast(response.message);
      return;
    }

    successToast("Refund has been requested");

    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Raise Refund Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={5}>
            <Text width="40%">Order ID</Text>
            <Input disabled value={props.orderId} />

            <Text width="40%">Notes</Text>
            <Input
              type="text"
              placeholder="Input"
              value={notes}
              onChange={(e) => setNotes(e.currentTarget.value)}
            />

            <Text width="40%">Upload Photo</Text>
            <Flex flexDirection={"row"} width="100%">
              <Wrap width="100%">
                {imgList.map((file, index) => {
                  console.log(file);
                  return (
                    <WrapItem key={index} className="imgContainer">
                      <Image
                        loading="lazy"
                        src={URL.createObjectURL(file)}
                        width="120px"
                        height="120px"
                      />
                    </WrapItem>
                  );
                })}
                <WrapItem>
                  <FileInputBtn imgList={imgList} setImgList={setImgList} />
                </WrapItem>
              </Wrap>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={submitForm}
            isLoading={isLoading}
          >
            Submit Refund
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateRefundModal;
