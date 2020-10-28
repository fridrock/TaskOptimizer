import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import MainGreating from "./MainGreating";
import Registration from "./Registration";
import Authorisation from "./Authorisation";
import HomeFragment from "./HomeFragment";
import { addCheckBoxCreator } from "./redux/actionCreator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.props.history.listen((location, action) => {
      this.changeOpened(true);
      console.log("route changed");
    });
    this.changeOpened = this.changeOpened.bind(this);
  }

  changeOpened = function (close) {
    let anotherValue = !this.state.opened;
    if (this.props.state.LoggedIn) {
      if (close) {
        this.setState({
          opened: false,
        });
      } else {
        this.setState({
          opened: anotherValue,
        });
      }
    }
  };

  render() {
    const { history } = this.props;

    return (
      <div className="App">
        <Header
          opened={this.state.opened}
          LoggedIn={this.props.state.LoggedIn}
          changeOpened={this.changeOpened}
          userProfile={this.props.state.userProfile}
        ></Header>
        <Switch>
          <Route
            history={history}
            path="/maingreating"
            component={MainGreating}
          />
          <Route
            history={history}
            path="/registration"
            render={(props) => (
              <Registration
                dispatch={this.props.dispatch}
                loggedInCreator={this.props.loggedInCreator}
              ></Registration>
            )}
          />
          <Route
            history={history}
            path="/auth"
            render={(props) => (
              <Authorisation
                dispatch={this.props.dispatch}
                loggedInCreator={this.props.loggedInCreator}
              ></Authorisation>
            )}
          ></Route>

          <Route
            history={history}
            path="/home"
            render={(props) => (
              <HomeFragment
                {...props}
                plans={this.props.state.plans}
                dispatch={this.props.dispatch}
                lastPlanId={this.props.state.lastPlanId}
                addPlanCreator={this.props.addPlanCreator}
                addColumnCreator={this.props.addColumnCreator}
                addCheckBoxCreator={this.props.addCheckBoxCreator}
              />
            )}
          />
          <Redirect from="/" to="/maingreating" />
          <Redirect from="" to="/maingreating" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
