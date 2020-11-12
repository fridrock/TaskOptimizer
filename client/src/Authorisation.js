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
      error: false,
    };
  }
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
  async authUser() {
    const user = {
      login: this.state.login_value,
      password: this.state.password_value,
    };

    const resolve = await fetch("/api/users/auth", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(user),
    });

    if (resolve.status == 200) {
      const json = await resolve.json();
      const userProfile = JSON.parse(json);
      const saveUserProfile = this.props.loggedInCreator(userProfile);
      this.props.dispatch(saveUserProfile);
      return new Promise((res, rej) => {
        res();
      });
    } else if (resolve.status == 400) {
      return new Promise((res, rej) => {
        rej();
      });
    }
  }
  async handleSubmit(e) {
    e.preventDefault();
    let hasEmptyStrings = this.checkValueFields();
    if (hasEmptyStrings) {
      try {
        await this.authUser();
        this.props.history.push("/home");
      } catch (e) {
        this.setState({
          ...this.state,
          login_value: "",
          password_value: "",
          error: "Неправильный логин или пароль",
        });
      }
    } else {
      this.setState({
        ...this.state,
        error: "Вы не заполнили все поля",
      });
    }
  }

  handleChange(e) {
    const target = e.target;
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
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
