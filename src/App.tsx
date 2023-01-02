import { Center, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import "./App.css";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";
import RouteList from "./routes";

function App() {
  return (
    <Suspense
      fallback={
        <Center width={"100vw"} height={"100vh"}>
          <Spinner speed="0.65s" size="xl" />
        </Center>
      }
    >
      <RouteList />
    </Suspense>
  );
}

export default App;
