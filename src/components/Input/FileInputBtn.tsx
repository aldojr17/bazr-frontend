import { Box, Text, VStack, Input } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useToast from "../../hooks/useToast";
import { IFileInputBtnProps } from "../../interfaces/Shop";
import "./style.css";

function FileInputBtn(props: IFileInputBtnProps) {
  const { errorToast } = useToast();

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) {
      return;
    }

    const file = event.currentTarget.files[0];

    if (props.imgList.length > 8) {
      errorToast("Maximum 9 photos upload");
      return;
    }

    if (file.size > 500000) {
      errorToast("Maximum file size is 500kB");
      return;
    }

    let newList = [...props.imgList, file];

    props.setImgList(newList);
  };

  return (
    <Box
      overflow={"hidden"}
      position={"relative"}
      className="fileUploadBtn"
      p={3}
      display={props.imgList?.length > 8 ? "none" : "display"}
    >
      <VStack>
        <Icon.Plus />
        <Text>Add Image</Text>
        <Text>{"(" + props.imgList?.length + "/9)"}</Text>
      </VStack>
      <Input
        className="inputFile"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleOnChange}
      />
    </Box>
  );
}

export default FileInputBtn;
