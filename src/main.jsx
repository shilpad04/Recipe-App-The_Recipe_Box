import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import FavouritesProvider from "./context/FavouritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavouritesProvider>
      <App />
    </FavouritesProvider>
  </BrowserRouter>
);

export default ReactDOM;
