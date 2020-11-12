import React, { Component } from "react";
import "./Registration.css";
import { withRouter } from "react-router-dom";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValueFields = this.checkValueFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.registrateUser = this.registrateUser.bind(this);
    this.state = {
      name_value: "",
      surname_value: "",
      login_value: "",
      password_value: "",
      repeat_password_value: "",
      error: false,
    };
  }
  async registrateUser() {
    const user = {
      name: this.state.name_value,
      surname: this.state.surname_value,
      login: this.state.login_value,
      password: this.state.password_value,
    };

    const resolve = await fetch("/api/users/registrate", {
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
    console.log(resolve.status);
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
        await this.registrateUser();
        this.props.history.push("/home");
      } catch (e) {
        this.setState({
          ...this.state,
          login_value: "",
          error: "Уже есть пользователь с таким логином",
        });
      }
    } else {
      this.setState({
        ...this.state,
        error: "Вы не заполнили все поля",
      });
    }
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
    if (this.state.password_value != this.state.repeat_password_value) {
      return false;
    }
    return bol;
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
      <div className="reg_container">
        <form className="reg_form" onSubmit={this.handleSubmit}>
          <label className="name_label">
            Имя
            <input
              type="text"
              value={this.state.name_value}
              name="name_value"
              onChange={this.handleChange.bind(this)}
            ></input>
          </label>
          <label className="surname_label">
            Фамилия
            <input
              type="text"
              value={this.state.surname_value}
              name="surname_value"
              onChange={this.handleChange.bind(this)}
            ></input>
          </label>
          <label className="login_label">
            Логин
            <input
              type="text"
              value={this.state.login_value}
              name="login_value"
              onChange={this.handleChange.bind(this)}
            ></input>
          </label>
          <label className="password_label">
            Пароль
            <input
              type="text"
              value={this.state.password_value}
              name="password_value"
              onChange={this.handleChange.bind(this)}
            ></input>
          </label>
          <label className="password_label">
            Повторите пароль
            <input
              type="text"
              value={this.state.repeat_password_value}
              name="repeat_password_value"
              onChange={this.handleChange.bind(this)}
            ></input>
          </label>
          <input type="submit" value="Отправить" className="submit_auth" />
          <p className="error">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(Registration);
