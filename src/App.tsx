import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";
import { Home, NotFound } from "./pages";
import RouteList from "./routes";

function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{ width: "100vw", height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <RouteList authenticated={true} />
    </Suspense>
  );
}

export default App;
