import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/Routes";

function AuthTemplate({ ...props }: any) {
  const navigate = useNavigate();

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
            <Image loading="lazy" src="/logo.svg" />
          </Center>
          <Image loading="lazy" src={"./auth-asset.svg"} />
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
              <Flex direction="column">
                <Box marginBottom={8}>
                  <Button
                    variant="primaryLink"
                    onClick={() => navigate(routes.HOME)}
                    size="sm"
                  >
                    {"<"} Back To Home
                  </Button>
                </Box>
                {props.children}
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthTemplate;
