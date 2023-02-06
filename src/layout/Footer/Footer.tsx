import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";

const Footer = () => {
  return (
    <Box bg={"lightLighten"} borderTop={"2px solid"} borderColor={"primary"}>
      <Container maxW={"container.xl"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={5}
          my={10}
        >
          <GridItem w="100%">
            <Link href={"#"} className={`nav-link`} mb={5}>
              <Image loading="lazy" src="/logo.svg" width={"8em"} />
            </Link>
          </GridItem>
          <GridItem w="100%">
            <Text variant={"footerItem"}>About us</Text>
            <Text variant={"footerItem"}>Privacy Policy</Text>
            <Text variant={"footerItem"}>Careers</Text>
            <Text variant={"footerItem"}>Blog</Text>
            <Text variant={"footerItem"}>FAQ</Text>
          </GridItem>
          <GridItem w="100%">
            <Text variant={"footerItem"}>Address</Text>
            <Text variant={"footerItem"} fontWeight={"normal"}>
              Jalan Mega Kuningan Barat III Lot 10.1-6
            </Text>
            <Text variant={"footerItem"} fontWeight={"normal"}>
              Kuningan Timur, Setiabudi
            </Text>
            <Text variant={"footerItem"} fontWeight={"normal"}>
              DKI Jakarta 12950
            </Text>
          </GridItem>
          <GridItem w="100%">
            <Text variant={"footerItem"}>Connect with us</Text>
            <Flex direction="row" justifyContent={"start"} gap={10} my={5}>
              <Icon.Facebook fill={"darkLighten"} />
              <Icon.Twitter fill={"darkLighten"} />
              <Icon.Instagram fill={"darkLighten"} />
              <Icon.Linkedin fill={"darkLighten"} />
              <Icon.Whatsapp fill={"darkLighten"} />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
