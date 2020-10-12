import React, { Component } from "react";
import PersonalCabinet from "./PersonalCabinet";
import "./Header.css";
import navIcon from "./img/nav_icon.png";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);

    this.changeOpened = this.changeOpened.bind(this);
  }
  state = {
    navigationCondition: "navigation_block closed",
    opened: false,
  };
  changeOpened = function () {
   // debugger;
    if (!this.state.opened) {
      this.setState({
        navigationCondition: "navigation_block opened",
        opened: true,
      });
    } else {
      this.setState({
        navigationCondition: "navigation_block closed",
        opened: false,
      });
    }
  };
  render() {
    return (
      <div className="header_container">
        <div className="left_side">
          <img
            src={navIcon}
            className="nav_icon"
            onClick={this.changeOpened}
          ></img>
          <div className={this.state.navigationCondition}>
            <Link to="/home">Home</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/other">Other</Link>
            <Link to="/">Other</Link>
          </div>
          <div className="logo_brand">
            <img src={logo}></img>
            <p className="p_brand">Ladno</p>
          </div>
        </div>

        <PersonalCabinet isRegistrated={false}></PersonalCabinet>
      </div>
    );
  }
}

export default Header;
