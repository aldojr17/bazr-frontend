import {
  AspectRatio,
  Avatar,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Icon from "../../assets/icons";
import SingleImagePreviewerModal from "../../components/Modal/SingleImagePreviewerModal";
import { IReviewItemProps } from "../../interfaces/Components/PDP";
import { handleImageOnError } from "../../util/util";

function ReviewItem(props: IReviewItemProps) {
  const { review } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        direction={"row"}
        gap={3}
        pb={5}
        mb={5}
        borderBottom={"1px"}
        borderColor={"light"}
      >
        <Avatar size={"sm"} />
        <Flex direction={"column"} pt={1} flex={1}>
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"semibold"}>{review.username}</Text>
            <Text fontSize={"xs"}>
              {dayjs(review.review_date).format("DD MMMM YYYY")}
            </Text>
          </Flex>
          <Flex direction={"row"} gap={1} my={2}>
            {[...Array(review.rating_score)].map((_, index) => (
              <Icon.Star key={`starFilled-${index}`} fill={"yellow.200"} />
            ))}
            {[...Array(5 - review.rating_score)].map((_, index) => (
              <Icon.Star key={`star-${index}`} fill={"light"} />
            ))}
          </Flex>
          {review.feedback.length != 0 && (
            <Text as={"i"} my={2}>
              {review.feedback}
            </Text>
          )}
          {review.picture.length > 0 && (
            <AspectRatio
              ratio={1}
              width={"50px"}
              onClick={onOpen}
              filter="auto"
              borderRadius="xl"
              boxShadow="default"
            >
              <Image
                src={review.picture}
                borderRadius="xl"
                border={"1px solid"}
                borderColor={"light"}
                onError={handleImageOnError}
              />
            </AspectRatio>
          )}
        </Flex>
      </Flex>
      <SingleImagePreviewerModal
        imageURL={review.picture}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default ReviewItem;
