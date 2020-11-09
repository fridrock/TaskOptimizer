import React, { Component } from "react";
import "./Registration.css";
import { withRouter } from "react-router-dom";
class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValueFields = this.checkValueFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name_value: "",
      surname_value: "",
      login_value: "",
      password_value: "",
      repeat_password_value: "",
      error: false,
    };
  }
  async sendPostQuery() {
    try {
      const data = {
        name: this.state.name_value,
        surname: this.state.surname_value,
        login: this.state.login,
        password: this.state.password_value,
      };
      let resolve = await fetch("api/users/registration", {
        method: "post",
        body: JSON.stringify(data),
      });
      let json = await resolve.text();
      let result = json;
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    debugger;
  }
  handleSubmit(e) {
    e.preventDefault();
    let hasEmptyStrings = this.checkValueFields();
    if (hasEmptyStrings) {
      this.sendPostQuery();
      //sending info about account to redux to have PersonalCabinet

      this.props.history.push("/home");
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
