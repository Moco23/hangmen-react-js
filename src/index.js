import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
