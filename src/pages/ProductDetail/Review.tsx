import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import Icon from "../../assets/icons";
import NoContentContainer from "../../components/Default/NoContentContainer";
import Pagination from "../../components/Pagination/Pagination";
import useProduct from "../../hooks/useProduct";
import { IReviewProps } from "../../interfaces/Components/PDP";
import { IReviewsParamsPayload } from "../../interfaces/Filter";
import { IProductReviewPayload } from "../../interfaces/Product";
import ReviewItem from "./ReviewItem";

function Review(props: IReviewProps) {
  const { productId, productRating } = props;
  const { fetchProductReviews } = useProduct();

  const [reviews, setReviews] = useState<IProductReviewPayload[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
  });
  const [params, setParams] = useState<IReviewsParamsPayload>({
    limit: 6,
    sortBy: "newest",
    page: 1,
    rating: "",
    type: "",
  });

  const handleChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
    let ratings = params.rating?.length! > 0 ? params.rating?.split(",") : [];

    if (event.currentTarget.checked) {
      ratings?.push(event.currentTarget.value);
    } else {
      ratings = ratings?.filter((rate) => rate !== event.currentTarget.value);
    }

    setParams({ ...params, rating: ratings?.toString() });
  };

  const handleChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    let type = params.type;

    if (event.currentTarget.checked) {
      type = type?.length! > 0 ? "all" : event.currentTarget.value;
    } else {
      type =
        type === "all"
          ? event.currentTarget.value === "images"
            ? "comments"
            : "images"
          : "";
    }

    setParams({ ...params, type: type });
  };

  const handleChangePageNumber = (pageNumber: number) => {
    setParams({ ...params, page: pageNumber });
  };

  useEffect(() => {
    fetchProductReviews(productId, params).then((data) => {
      setReviews(data?.data!);
      setPagination({
        currentPage: data?.current_page!,
        totalPage: data?.total_page!,
      });
    });
  }, [params]);

  return (
    <Box>
      <Heading
        variant={"sectionHeading"}
        fontSize={{ base: "md", sm: "xl", md: "2xl" }}
      >
        Reviews
      </Heading>
      <Flex
        w={"100%"}
        direction={{ base: "column", lg: "row" }}
        gap={5}
        justifyContent={"space-between"}
      >
        <Box w={{ base: "100%", lg: "30%" }}>
          <Heading fontSize={"md"} mb={3}>
            Overall Rating
          </Heading>
          {productRating > 0 ? (
            <Flex direction={"column"} alignItems={"center"} my={4}>
              <Flex direction={"row"} alignItems={"baseline"} gap={2}>
                <Heading>{productRating}</Heading>
                <Heading fontSize={"xl"}>out of</Heading>
                <Heading>5</Heading>
              </Flex>
              <Flex direction={"row"} my={4} gap={1}>
                {[...Array(Math.round(productRating))].map((_, index) => (
                  <Icon.Star key={`starFilled-${index}`} fill={"yellow.200"} />
                ))}
                {[...Array(5 - Math.round(productRating))].map((_, index) => (
                  <Icon.Star key={`star-${index}`} fill={"light"} />
                ))}
              </Flex>
            </Flex>
          ) : (
            <NoContentContainer message="No ratings yet." />
          )}
          <Divider variant={"solidLight"} my={5} />
          <Box>
            <Heading fontSize={"md"} mb={3}>
              Filter
            </Heading>
            <Accordion
              allowMultiple
              borderRadius={"lg"}
              borderWidth={"1px"}
              borderColor={"light"}
              boxShadow={"default"}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Rating
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack alignItems={"start"}>
                    <Checkbox
                      value={5}
                      colorScheme={"default"}
                      onChange={handleChangeRating}
                    >
                      <Icon.Star
                        mt={"-.3em"}
                        fill={"orange"}
                        width={"1em"}
                        marginEnd={2}
                      />
                      <Text as={"span"}>5</Text>
                    </Checkbox>
                    <Checkbox
                      value={4}
                      colorScheme={"default"}
                      onChange={handleChangeRating}
                    >
                      <Icon.Star
                        mt={"-.3em"}
                        fill={"orange"}
                        width={"1em"}
                        marginEnd={2}
                      />
                      <Text as={"span"}>4</Text>
                    </Checkbox>
                    <Checkbox
                      value={3}
                      colorScheme={"default"}
                      onChange={handleChangeRating}
                    >
                      <Icon.Star
                        mt={"-.3em"}
                        fill={"orange"}
                        width={"1em"}
                        marginEnd={2}
                      />
                      <Text as={"span"}>3</Text>
                    </Checkbox>
                    <Checkbox
                      value={2}
                      colorScheme={"default"}
                      onChange={handleChangeRating}
                    >
                      <Icon.Star
                        mt={"-.3em"}
                        fill={"orange"}
                        width={"1em"}
                        marginEnd={2}
                      />
                      <Text as={"span"}>2</Text>
                    </Checkbox>
                    <Checkbox
                      value={1}
                      colorScheme={"default"}
                      onChange={handleChangeRating}
                    >
                      <Icon.Star
                        mt={"-.3em"}
                        fill={"orange"}
                        width={"1em"}
                        marginEnd={2}
                      />
                      <Text as={"span"}>1</Text>
                    </Checkbox>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Comment
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Checkbox
                    value={"comments"}
                    colorScheme={"default"}
                    onChange={handleChangeType}
                  >
                    <Text as={"span"} fontWeight={"normal"}>
                      With comments
                    </Text>
                  </Checkbox>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Media
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Checkbox
                    value={"images"}
                    colorScheme={"default"}
                    onChange={handleChangeType}
                  >
                    <Text as={"span"} fontWeight={"normal"}>
                      With photo
                    </Text>
                  </Checkbox>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box w={{ base: "100%", lg: "70%" }}>
          <Heading fontSize={"md"} mb={3}>
            Top Reviews
          </Heading>
          <Box>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))
            ) : (
              <NoContentContainer message="No reviews yet." innerPadding={28} />
            )}
          </Box>
          {reviews.length > 0 && (
            <Pagination
              data={{
                current_page: pagination.currentPage,
                total_page: pagination.totalPage,
              }}
              setPage={handleChangePageNumber}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Review;
