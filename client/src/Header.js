import React, { Component } from "react";
import PersonalCabinet from "./PersonalCabinet";
import "./Header.css";
import navIcon from "./img/nav_icon.png";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header_container">
        <div className="left_side">
          <img
            src={navIcon}
            className="nav_icon"
            onClick={() => {
              this.props.changeOpened(false);
            }}
          ></img>
          <div
            id="navigation_block"
            className={` ${this.props.opened ? "opened " : "closed"}`}
          >
            <Link to="/home">Главная</Link>
            <Link to="/friends">Друзья</Link>
          </div>
          <div className="logo_brand">
            <img src={logo}></img>
            <p className="p_brand">TaskOptimizer</p>
          </div>
        </div>

        <PersonalCabinet
          dispatch={this.props.dispatch}
          logoutCreator={this.props.logoutCreator}
          isRegistrated={this.props.LoggedIn}
          userProfile={this.props.userProfile}
          history={this.props.history}
        ></PersonalCabinet>
      </div>
    );
  }
}

export default Header;
