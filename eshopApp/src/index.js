import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"
import HttpService from "./services/HttpService";
import UserService from "./services/UserService";
import Navbar from "./commons/Navbar"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

UserService.initKeycloak(root);
HttpService.configure();
