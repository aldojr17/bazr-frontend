import { Box, Container } from "@chakra-ui/react";
import Search from "./Search";

function SearchPage() {
  return (
    <Container maxW={{ base: "container.sm", lg: "container.xl" }}>
      <Box my={10}>
        <Search />
      </Box>
    </Container>
  );
}

export default SearchPage;
