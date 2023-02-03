import {
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Image,
} from "@chakra-ui/react";

function AuthTemplate({ ...props }: any) {
  return (
    <Flex height={"auto"} width="full" align="center" justifyContent="center">
      <Container maxW={"container.xl"} position={"relative"}>
        <Flex
          position={"absolute"}
          right={{ base: "0", md: "auto" }}
          transform={{
            base: "translate(0%, 0%)",
          }}
          width={{ base: "100%", md: "750px" }}
          height={{ base: "100vh" }}
          direction={"column"}
          justifyContent={"center"}
          opacity={"0.5"}
          gap={10}
          px={{ base: 5, sm: 10 }}
        >
          <Center>
            <Image src="/logo.svg" />
          </Center>
          <Image src={"./auth-asset.svg"} />
        </Flex>
        <Flex
          position={"absolute"}
          right={{ base: "0", sm: "50%", md: "350px" }}
          transform={{
            base: "translate(0%, 0%)",
            sm: "translate(50%, 0%)",
          }}
          width={{ base: "100%", sm: "450px" }}
          marginStart={{ base: "none", xl: "auto" }}
          height={{ base: "100vh" }}
          direction={"column"}
          justifyContent={{ base: "space-between", sm: "center" }}
        >
          <Card
            align={"center"}
            backgroundColor={"white"}
            border={{ base: "none", sm: "2px solid" }}
            borderColor={{ sm: "lightLighten" }}
            borderRadius={{ base: "none", sm: "xl" }}
            boxShadow={"default"}
            p={{ base: 2, lg: 4 }}
            opacity={"0.9"}
            height={{ base: "100%", sm: "auto" }}
          >
            <CardBody
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              {props.children}
            </CardBody>
          </Card>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthTemplate;
