import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import categoryService from "../../api/service/category";
import Icon from "../../assets/icons";
import { IPrimaryCategoryPayload } from "../../interfaces/Category";

const Search = () => {
  const [search] = useSearchParams();
  const [categories, setCategories] = useState<IPrimaryCategoryPayload[]>([]);

  const fetchCategories = async () => {
    const response = await categoryService.fetchAllCategory();
    if (response.is_success) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  //   console.log(search.get("name"));
  return <div>Search</div>;
};

export default Search;
