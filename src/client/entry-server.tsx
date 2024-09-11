import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import "./index.css";
import Home from "./pages/Home";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Home />
      </StaticRouter>
    </React.StrictMode>,
  );
}
