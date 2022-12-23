import { Suspense } from "react";
import "./App.css";
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
      <RouteList />
    </Suspense>
  );
}

export default App;
