import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IPaginationProps } from "../../interfaces/Pagination";

const Pagination = ({ ...props }: IPaginationProps) => {
  const [pagination, setPagination] = useState<String[]>([]);

  const handleClick = (page: number) => {
    props.setPage(page);
  };

  const handlePagination = (totalPage: number, currentPage: number) => {
    let element: string[] = [];
    const actualPage = currentPage + 1;

    if (totalPage <= 10) {
      element = Array.from(Array(props.data.total_page).keys(), (index) => String(index + 1));
    } else {
      if (actualPage <= 4) {
        element = ["1", "2", "3", "...", String(totalPage)];
      } else if (actualPage < 6) {
        element = [
          "1",
          "...",
          String(actualPage - 2),
          String(actualPage - 1),
          String(actualPage),
          "...",
          String(totalPage),
        ];
      } else if (actualPage < totalPage && actualPage > 4) {
        element = [
          "1",
          "...",
          String(actualPage - 3),
          String(actualPage - 2),
          String(actualPage - 1),
          "...",
          String(totalPage),
        ];
      } else if (actualPage > totalPage - 4) {
        element = ["1", "...", String(totalPage - 2), String(totalPage - 1), String(totalPage)];
      } else {
        element = [
          "1",
          "...",
          String(actualPage - 1),
          String(actualPage),
          String(actualPage + 1),
          "...",
          String(totalPage),
        ];
      }
    }

    setPagination(element);
  };

  useEffect(() => {
    handlePagination(props.data.total_page, props.data.current_page);
  }, [props.data]);

  return (
    <Flex justifyContent={"center"} gap={5} py={8}>
      <Button
        variant={"unstyled"}
        borderRadius={"none"}
        fontWeight={"normal"}
        size={{
          base: "md",
          sm: "lg",
          md: "lg",
          lg: "lg",
          xl: "lg",
        }}
        onClick={() => {
          if (props.data.current_page - 1 > 0) {
            handleClick(props.data.current_page - 1);
          }
        }}
      >
        Prev
      </Button>
      {pagination.map((item, index) => (
        <Button
          key={index}
          variant={"unstyled"}
          borderRadius={"none"}
          fontWeight={props.data.current_page === Number(item) ? "bold" : "normal"}
          borderBottom={props.data.current_page === Number(item) ? "1px" : ""}
          borderColor={"primary"}
          size={{
            md: "lg",
            lg: "lg",
            xl: "lg",
          }}
          display={{
            base: "none",
            sm: "none",
            md: "inline",
            lg: "inline",
            xl: "inline",
          }}
          onClick={() => {
            if (item !== "...") {
              handleClick(Number(item));
            }
          }}
        >
          {item}
        </Button>
      ))}
      <Button
        variant={"unstyled"}
        borderRadius={"none"}
        fontWeight={"normal"}
        size={{
          base: "md",
          sm: "lg",
          md: "lg",
          lg: "lg",
          xl: "lg",
        }}
        onClick={() => {
          if (props.data.current_page + 1 <= props.data.total_page) {
            handleClick(props.data.current_page + 1);
          }
        }}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
