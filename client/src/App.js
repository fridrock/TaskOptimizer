import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import MainGreating from "./MainGreating";
import Registration from "./Registration";
import Authorisation from "./Authorisation";
import HomeFragment from "./HomeFragment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.props.history.listen((location, action) => {
      this.changeOpened(true);
     
    });
    this.changeOpened = this.changeOpened.bind(this);
    this.browseAllData = this.browseAllData.bind(this);
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
  async browseAllData(){
    const userData = {
      userId:this.props.state.userProfile.userId,
    };

    const resolve = await fetch("/api/plans/userdata", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(userData),
    });
    console.log(resolve.status);
    if (resolve.status == 200) {
      const json = await resolve.json();
      const userData = JSON.parse(json);
      const saveUserData = this.props.saveUserDataCreator(userData);
      this.props.dispatch(saveUserData);
      console.log(userData);
    }
  }
  
  render() {
    const { history } = this.props;

    return (
      <div className="App">
        <Header
          dispatch={this.props.dispatch}
          opened={this.state.opened}
          logoutCreator={this.props.logoutCreator}
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
                browseAllData={this.browseAllData}
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
                userId={this.props.state.userProfile.userId}
                dispatch={this.props.dispatch}
                lastPlanId={this.props.state.lastPlanId}
                addPlanCreator={this.props.addPlanCreator}
                addColumnCreator={this.props.addColumnCreator}
                addCheckBoxCreator={this.props.addCheckBoxCreator}
                updateCheckBoxCreator={this.props.updateCheckBoxCreator}
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
