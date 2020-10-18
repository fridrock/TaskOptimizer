import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Authorisation.css";
class Authorisation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValueFields = this.checkValueFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      login_value: "",
      password_value: "",
      error: "",
    };
  }
  checkValueFields() {
    checkValueFields() {
      let bol = false;
      for (let key in this.state) {
        if (this.state[key] === "") {
          return false;
        } else {
          bol = true;
        }
      }
      return bol;
    }
  }
  handleChange(e) {
    const target = e.target;
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let hasEmptyStrings = this.checkValueFields();
    if (hasEmptyStrings) {
      const data = new FormData(e.target);
      //fetch("#", {
      //method: "post",
      //body: data,
      //});
      //sending info about account to redux to have PersonalCabinet
      // redirect to home

      this.props.history.push("/home");
    } else {
      this.setState({
        ...this.state,
        error: "Вы не заполнили все поля",
      });
    }
  }
  render() {
    return (
      <div className="auth_container">
        <form className="auth_form" onSubmit={this.handleSubmit}>
          <label className="login_label">
            Логин
            <input
              type="text"
              name="login_value"
              value={this.state.login_value}
              onChange={this.handleChange}
            ></input>
          </label>
          <label className="password_label">
            Пароль
            <input
              type="text"
              name="password_value"
              value={this.state.password_value}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Отправить" className="submit_auth" />
          <p className="error">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(Authorisation);
