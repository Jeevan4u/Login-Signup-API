import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./features/store";

import Mycontext from "./Context/Mycontext";
import ContextData from "./Context/ContextData";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <Mycontext.Provider value={{ ram: "sdfs" }}> */}
    <ContextData>
      <App />
    </ContextData>
    {/* </Mycontext.Provider> */}
  </Provider>
  // </React.StrictMode>,
);
