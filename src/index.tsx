import { createGlobalStyle } from "styled-components/macro";
import { Provider } from "react-redux";
import App from "./App";
import store from "./configureStore";
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #faeee7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`;

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
