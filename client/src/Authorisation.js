import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Authorisation.css";
class Authorisation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    //fetch("#", {
    //method: "post",
    //body: data,
    //});
    //sending info about account to redux to have PersonalCabinet
    // redirect to home
    debugger;
    this.props.history.push("/home");
  }
  render() {
    return (
      <div className="auth_container">
        <form className="auth_form" onSubmit={this.handleSubmit}>
          <label className="login_label">
            Login
            <input type="text"></input>
          </label>
          <label className="password_label">
            Password
            <input type="text"></input>
          </label>
          <input type="submit" value="Send" className="submit_auth" />
        </form>
      </div>
    );
  }
}

export default withRouter(Authorisation);
