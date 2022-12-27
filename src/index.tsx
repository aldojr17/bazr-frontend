import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { customTheme } from "./theme/theme";
import { store } from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ChakraProvider theme={customTheme}>
    <GoogleOAuthProvider clientId="193045182620-6i9jf7k31ghtl4dkvqbvsni03r0dm7mm.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
