import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components/macro";
import { Provider } from "react-redux";
import App from "./App";
import store from "./configureStore";

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

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
