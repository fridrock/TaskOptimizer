import React, { Component } from "react";
import "./PersonalCabinet.css";
import { Link } from "react-router-dom";
import VanillaHoverButton from "./VanillaHoverButton";
import userPhoto from "./img/default_user.png";
class PersonalCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_opened: false,
    };
    this.changeMenuOpened = this.changeMenuOpened.bind(this);
    this.logout = this.logout.bind(this);
  }
  changeMenuOpened() {
    this.setState({
      menu_opened: !this.state.menu_opened,
    });
  }
  logout() {
    let action = this.props.logoutCreator();
    this.props.dispatch(action);
    this.setState({
      menu_opened: false,
    });
  }
  render() {
    //TODO:rename isRegistrated on loggedIn
    if (this.props.isRegistrated) {
      return (
        <div className="profile_container">
          <img className="default_user_photo" src={userPhoto}></img>
          <p>{this.props.userProfile.login}</p>
          <button
            className="profile_button"
            onClick={this.changeMenuOpened}
          ></button>
          <div
            className={`${this.state.menu_opened ? "opened" : "closed"}`}
            id="profile_menu"
          >
            <Link to="/profile">Профиль</Link>
            <button className="logout_button" onClick={this.logout}>
              Выйти
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="registration_block">
          <VanillaHoverButton
            link={
              <Link className="link" to="/registration">
                Регистрация
              </Link>
            }
          ></VanillaHoverButton>
          <VanillaHoverButton
            link={<Link to="/auth">Авторизация</Link>}
          ></VanillaHoverButton>
        </div>
      );
    }
  }
}

export default PersonalCabinet;
