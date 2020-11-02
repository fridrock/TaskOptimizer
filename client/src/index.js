import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import {
  addPlanCreator,
  loggedInCreator,
  addColumnCreator,
  addCheckBoxCreator,
  updateCheckBoxCreator,
} from "./redux/actionCreator";

function renderTree() {
  const history = createBrowserHistory();

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter history={history}>
        <App
          state={store.getState()}
          dispatch={store.dispatch}
          addPlanCreator={addPlanCreator}
          loggedInCreator={loggedInCreator}
          addColumnCreator={addColumnCreator}
          addCheckBoxCreator={addCheckBoxCreator}
          updateCheckBoxCreator={updateCheckBoxCreator}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
console.log(store.getState());
renderTree();
store.subscribe(renderTree);
export default renderTree;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
