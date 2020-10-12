import React, { Component } from "react";
import "./Registration.css";
import { withRouter } from "react-router-dom";
class Registration extends Component {
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

    this.props.history.push("/home");
  }
  render() {
    return (
      <div className="reg_container">
        <form className="reg_form" onSubmit={this.handleSubmit}>
          <label className="name_label">
            Name
            <input type="text"></input>
          </label>
          <label className="surname_label">
            Surname
            <input type="text"></input>
          </label>
          <label className="login_label">
            Login
            <input type="text"></input>
          </label>
          <label className="password_label">
            Password
            <input type="text"></input>
          </label>
          <label className="password_label">
            Repeat Password
            <input type="text"></input>
          </label>
          <input type="submit" value="Send" className="submit_auth" />
        </form>
      </div>
    );
  }
}

export default withRouter(Registration);
