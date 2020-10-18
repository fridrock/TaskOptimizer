import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";

function renderTree() {
  const history = createBrowserHistory();
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
renderTree();
export default renderTree;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
