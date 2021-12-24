import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "fluxible-js";
import { ThemeProvider } from "@material-ui/core";
import {createFluxibleHook} from 'react-fluxible';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

export const globalStore = createStore({
  initialStore: {
    authUser: null,
    loading: false
  },
  persist: {
    syncStorage: window.localStorage,
    restore({ authUser }) {
      return { authUser };
    },
  },
  
});

export const useGlobalStore = createFluxibleHook(globalStore);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
