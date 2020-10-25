import React, { Component } from "react";
import "./PersonalCabinet.css";
import { Link } from "react-router-dom";
import VanillaHoverButton from "./VanillaHoverButton";
import userPhoto from "./img/default_user.png";
class PersonalCabinet extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isRegistrated) {
      return (
        <div className="profile_container">
          <img className="default_user_photo" src={userPhoto}></img>
          <p>{this.props.userProfile.login}</p>
        </div>
      );
    } else {
      return (
        <div className="registration_block">
          <VanillaHoverButton
            link={<Link to="/registration">Регистрация</Link>}
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
