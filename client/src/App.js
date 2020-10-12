import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import MainGreating from "./MainGreating";
import Registration from "./Registration";
import Authorisation from "./Authorisation";
import HomeFragment from "./HomeFragment";
class App extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route
            history={history}
            path="/maingreating"
            component={MainGreating}
          />
          <Route
            history={history}
            path="/registration"
            component={Registration}
          />
          <Route history={history} path="/auth" component={Authorisation} />
          <Route history={history} path="/home" component={HomeFragment} />
          <Redirect from="/" to="/home" />
          <Redirect from="" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
