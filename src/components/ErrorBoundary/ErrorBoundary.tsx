import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  isErrorNetwork: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    isErrorNetwork: false,
  };

  public static getDerivedStateFromError(e: Error): State {
    console.log(e);
    return { hasError: true, isErrorNetwork: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  componentDidMount(): void {
    window.addEventListener("unhandledrejection", (e) => {
      console.log("unhan", e);
      this.setState({
        hasError: true,
      });
    });

    window.addEventListener("offline", (e) => {
      console.log(e);
      this.setState({
        hasError: true,
        isErrorNetwork: true,
      });
    });
  }

  public render() {
    if (this.state.hasError && !this.state.isErrorNetwork) {
      return (
        <Flex
          justifyContent="center"
          alignItems="center"
          w="100vw"
          h="100vh"
          zIndex={9999}
          bg="gray.100"
        >
          <VStack alignItems={"start"} gap={6}>
            <VStack alignItems={"start"}>
              <Heading>OH NO!... Something went wrong</Heading>
              <Text fontWeight={"semibold"} color={"darkLighten"}>
                Sorry, we are working on it... please try again later
              </Text>
            </VStack>
            <Button
              colorScheme="linkedin"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </VStack>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
